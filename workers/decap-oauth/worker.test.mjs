import test from 'node:test'
import assert from 'node:assert/strict'
import { runInNewContext } from 'node:vm'
import worker from './worker.mjs'

// Ephemeral, synthetic credentials: no real provider requests in these tests.
const env = {
  OAUTH_ENABLED: 'true', GITHUB_CLIENT_ID: 'test-client', GITHUB_CLIENT_SECRET: 'test-only',
  OAUTH_SESSION_SECRET: 'ab'.repeat(32),
  SITE_ORIGIN: 'https://site.example', AUTH_ORIGIN: 'https://auth.example',
}
const start = '/auth?provider=github&site_id=site.example&scope=public_repo'
const request = (path, options) => new Request(`${env.AUTH_ORIGIN}${path}`, options)
async function session() {
  const result = await worker.fetch(request(start), env)
  return { result, authorize: new URL(result.headers.get('location')), cookie: result.headers.get('set-cookie').split(';')[0] }
}

test('fail closed, routes, method and HTTPS', async () => {
  assert.equal((await worker.fetch(request(start), {})).status, 503)
  assert.equal((await worker.fetch(request('/'), env)).status, 404)
  assert.equal((await worker.fetch(request('/auth', { method: 'POST' }), env)).status, 405)
  assert.equal((await worker.fetch(new Request('http://auth.example/auth'), env)).status, 400)
  assert.equal((await worker.fetch(request(start), { ...env, OAUTH_ENABLED: 'false' })).status, 503)
})

test('authorization fixes scope, callback and PKCE; cookie is encrypted', async () => {
  const { result, authorize, cookie } = await session()
  assert.equal(result.status, 302)
  assert.equal(authorize.origin + authorize.pathname, 'https://github.com/login/oauth/authorize')
  assert.equal(authorize.searchParams.get('scope'), 'public_repo')
  assert.equal(authorize.searchParams.get('redirect_uri'), `${env.AUTH_ORIGIN}/callback`)
  assert.equal(authorize.searchParams.get('code_challenge_method'), 'S256')
  assert.equal(authorize.searchParams.get('code_challenge').length, 43)
  assert.match(result.headers.get('set-cookie'), /HttpOnly; Secure; SameSite=Lax; Max-Age=600/)
  assert.ok(!cookie.includes(authorize.searchParams.get('state')))
  assert.equal(result.headers.get('cache-control'), 'no-store')
  assert.equal(result.headers.get('access-control-allow-origin'), null)
  assert.equal((await worker.fetch(request(start + '&redirect_uri=https://evil.example'), env)).status, 400)
  assert.equal((await worker.fetch(request(start + '&provider=github'), env)).status, 400)
  assert.equal((await worker.fetch(request(start.replace('public_repo', 'repo')), env)).status, 400)
  assert.equal((await worker.fetch(request(start.replace('site.example', 'evil.example')), env)).status, 400)
  assert.equal((await worker.fetch(request(start, { headers: { Origin: 'https://evil.example' } }), env)).status, 400)
  assert.equal((await worker.fetch(request(start), { ...env, AUTH_ORIGIN: 'https://other.example' })).status, 400)
})

test('invalid, tampered, expired and mismatched callbacks never exchange a code', async (t) => {
  let calls = 0
  t.mock.method(globalThis, 'fetch', async () => { calls++; throw new Error('Unexpected network') })
  const { authorize, cookie } = await session()
  const callback = `/callback?code=test-code&state=${authorize.searchParams.get('state')}`
  for (const [path, headers, settings] of [
    [callback, {}, env],
    [callback + '&state=duplicate', { Cookie: cookie }, env],
    [callback.replace('state=', 'state=x'), { Cookie: cookie }, env],
    [callback, { Cookie: cookie + 'tampered' }, env],
    [callback, { Cookie: cookie + '; ' + cookie }, env],
    [callback, { Cookie: cookie }, { ...env, SITE_ORIGIN: 'https://other.example' }],
    [callback + '&error=access_denied', { Cookie: cookie }, env],
  ]) {
    const result = await worker.fetch(request(path, { headers }), settings)
    assert.equal(result.status, 400)
    assert.match(result.headers.get('set-cookie'), /Max-Age=0/)
  }
  const now = Date.now()
  t.mock.method(Date, 'now', () => now + 601000)
  assert.equal((await worker.fetch(request(callback, { headers: { Cookie: cookie } }), env)).status, 400)
  assert.equal(calls, 0)
})

test('exchange and popup only deliver to the exact originating site/window', async (t) => {
  const { authorize, cookie } = await session()
  let calls = 0
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    calls++
    if (calls === 1) {
      assert.equal(url, 'https://github.com/login/oauth/access_token')
      assert.equal(options.method, 'POST')
      assert.equal(options.redirect, 'error')
      assert.equal(options.body.get('redirect_uri'), env.AUTH_ORIGIN + '/callback')
      const digest = Buffer.from(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(options.body.get('code_verifier')))).toString('base64url')
      assert.equal(digest, authorize.searchParams.get('code_challenge'))
      return Response.json({ access_token: 'synthetic_test_token', token_type: 'bearer', scope: 'public_repo' })
    }
    assert.equal(url, 'https://api.github.com/user')
    return Response.json({ id: 123 })
  })
  const result = await worker.fetch(request(`/callback?code=test-code&state=${authorize.searchParams.get('state')}`, { headers: { Cookie: cookie } }), env)
  assert.equal(result.status, 200)
  assert.equal(calls, 2)
  assert.match(result.headers.get('set-cookie'), /Max-Age=0/)
  assert.match(result.headers.get('content-security-policy'), /script-src 'nonce-/)
  assert.ok(!result.headers.get('content-security-policy').includes('unsafe-inline'))
  const html = await result.text()
  const sent = []
  let receive
  const opener = { postMessage: (...args) => sent.push(args) }
  const window = { opener, addEventListener: (_, fn) => { receive = fn }, removeEventListener() {}, close() {} }
  runInNewContext(html.match(/<script nonce="[^"]+">([\s\S]*)<\/script>/)[1], { window, setTimeout() {} })
  assert.deepEqual(sent[0], ['authorizing:github', env.SITE_ORIGIN])
  receive({ origin: 'https://evil.example', source: opener, data: 'authorizing:github' })
  receive({ origin: env.SITE_ORIGIN, source: {}, data: 'authorizing:github' })
  assert.equal(sent.length, 1)
  receive({ origin: env.SITE_ORIGIN, source: opener, data: 'authorizing:github' })
  assert.equal(sent.length, 2)
  assert.equal(sent[1][1], env.SITE_ORIGIN)
  assert.match(sent[1][0], /^authorization:github:success:/)
  assert.ok(!html.includes(env.GITHUB_CLIENT_SECRET))
})

test('upstream errors are generic and clear the session', async (t) => {
  const { authorize, cookie } = await session()
  t.mock.method(globalThis, 'fetch', async () => { throw new Error('PRIVATE_UPSTREAM_DETAILS') })
  const result = await worker.fetch(request(`/callback?code=test-code&state=${authorize.searchParams.get('state')}`, { headers: { Cookie: cookie } }), env)
  assert.equal(result.status, 400)
  assert.ok(!(await result.text()).includes('PRIVATE_UPSTREAM_DETAILS'))
  assert.match(result.headers.get('set-cookie'), /Max-Age=0/)
})
