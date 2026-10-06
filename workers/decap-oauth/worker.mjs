// Separate OAuth service. Never import into Astro or put this file in public/.
// Fail closed until the owner configures the OAuth App and Worker secrets.
const TTL = 600
const COOKIE = '__Host-decap-oauth'
const encoder = new TextEncoder()

const encode = (bytes) => btoa(String.fromCharCode(...new Uint8Array(bytes)))
  .replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '')
const decode = (value) => Uint8Array.from(atob(value.replaceAll('-', '+').replaceAll('_', '/')), c => c.charCodeAt(0))
const random = () => encode(crypto.getRandomValues(new Uint8Array(32)))
const clearCookie = `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`

function response(body, status = 200, extra = {}) {
  return new Response(body, { status, headers: {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store',
    'Referrer-Policy': 'no-referrer',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-Robots-Tag': 'noindex, nofollow',
    'Strict-Transport-Security': 'max-age=31536000',
    'Content-Security-Policy': "default-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'",
    ...extra,
  } })
}

function origin(value) {
  const url = new URL(value)
  if (url.protocol !== 'https:' || url.origin !== value) throw new Error('Invalid configuration')
  return url.origin
}

async function sessionKey(secret) {
  if (!/^[a-f0-9]{64}$/i.test(secret)) throw new Error('Invalid configuration')
  const bytes = Uint8Array.from(secret.match(/../g), pair => parseInt(pair, 16))
  return crypto.subtle.importKey('raw', bytes, 'AES-GCM', false, ['encrypt', 'decrypt'])
}

async function seal(session, secret) {
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, await sessionKey(secret), encoder.encode(JSON.stringify(session)))
  return `${encode(iv)}.${encode(encrypted)}`
}

async function unseal(value, secret) {
  if (!value || value.length > 2048) throw new Error('Invalid session')
  const parts = value.split('.')
  if (parts.length !== 2) throw new Error('Invalid session')
  const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: decode(parts[0]) }, await sessionKey(secret), decode(parts[1]))
  return JSON.parse(new TextDecoder().decode(decrypted))
}

function sessionCookie(request) {
  const matches = (request.headers.get('Cookie') || '').split(';')
    .map(value => value.trim()).filter(value => value.startsWith(`${COOKIE}=`))
  if (matches.length !== 1) throw new Error('Invalid session')
  return matches[0].slice(COOKIE.length + 1)
}

function parameters(url, allowed) {
  for (const key of url.searchParams.keys()) {
    if (!allowed.includes(key) || url.searchParams.getAll(key).length !== 1) throw new Error('Invalid request')
  }
  return url.searchParams
}

function popup(token, site) {
  const nonce = random()
  // Serialize twice: the Decap message is a string, not an object. Escape HTML delimiters.
  const message = JSON.stringify(`authorization:github:success:${JSON.stringify({ token, provider: 'github' })}`).replaceAll('<', '\\u003c')
  const script = `const target=${JSON.stringify(site)}; const parent=window.opener;
if(parent){ const receive=(event)=>{
  if(event.origin!==target || event.source!==parent || event.data!=='authorizing:github') return;
  window.removeEventListener('message',receive);
  parent.postMessage(${message},target); window.close();
}; window.addEventListener('message',receive); parent.postMessage('authorizing:github',target);
setTimeout(()=>{window.removeEventListener('message',receive);window.close();},60000); }`
  return response(`<!doctype html><html lang="uk"><meta charset="utf-8"><title>Вхід до CMS</title><p>Завершення входу. Це вікно можна закрити.</p><script nonce="${nonce}">${script}</script></html>`, 200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Set-Cookie': clearCookie,
    'Content-Security-Policy': `default-src 'none'; script-src 'nonce-${nonce}'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'`,
  })
}

export default {
  async fetch(request, env) {
    let callback = false
    try {
      const url = new URL(request.url)
      if (url.protocol !== 'https:') return response('HTTPS required', 400)
      if (!['/auth', '/callback'].includes(url.pathname)) return response('Not found', 404)
      callback = url.pathname === '/callback'
      if (request.method !== 'GET') return response('Method not allowed', 405, { Allow: 'GET' })
      if (env.OAUTH_ENABLED !== 'true' || !env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET || !env.OAUTH_SESSION_SECRET) {
        return response('OAuth is not configured', 503)
      }
      const site = origin(env.SITE_ORIGIN)
      const auth = origin(env.AUTH_ORIGIN)
      if (url.origin !== auth) return response('Invalid origin', 400)
      const redirect = `${auth}/callback`
      if (!callback) {
        const params = parameters(url, ['provider', 'site_id', 'scope', 'login'])
        const caller = request.headers.get('Origin')
        if (params.get('provider') !== 'github' || params.get('site_id') !== new URL(site).hostname ||
            (params.has('scope') && params.get('scope') !== 'public_repo') || (caller && caller !== site)) {
          return response('Invalid request', 400)
        }
        const state = random()
        const verifier = random()
        const challenge = encode(await crypto.subtle.digest('SHA-256', encoder.encode(verifier)))
        const cookie = await seal({ state, verifier, exp: Date.now() + TTL * 1000, auth, site }, env.OAUTH_SESSION_SECRET)
        const authorize = new URL('https://github.com/login/oauth/authorize')
        authorize.search = new URLSearchParams({ client_id: env.GITHUB_CLIENT_ID, redirect_uri: redirect,
          scope: 'public_repo', state, code_challenge: challenge, code_challenge_method: 'S256' }).toString()
        return response(null, 302, { Location: authorize.href,
          'Set-Cookie': `${COOKIE}=${cookie}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${TTL}` })
      }
      const params = parameters(url, ['code', 'state', 'error', 'error_description', 'error_uri'])
      const session = await unseal(sessionCookie(request), env.OAUTH_SESSION_SECRET)
      if (!Number.isFinite(session.exp) || session.exp < Date.now() || session.exp > Date.now() + TTL * 1000 ||
          session.auth !== auth || session.site !== site || !/^[A-Za-z0-9_-]{43}$/.test(session.state) ||
          !/^[A-Za-z0-9_-]{43}$/.test(session.verifier) || params.get('state') !== session.state ||
          params.has('error') || !/^[A-Za-z0-9_-]{1,512}$/.test(params.get('code') || '')) {
        throw new Error('Invalid callback')
      }
      const exchange = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST', redirect: 'error', signal: AbortSignal.timeout(10000),
        headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ client_id: env.GITHUB_CLIENT_ID, client_secret: env.GITHUB_CLIENT_SECRET,
          code: params.get('code'), redirect_uri: redirect, code_verifier: session.verifier }),
      })
      if (!exchange.ok) throw new Error('Exchange failed')
      const result = await exchange.json()
      if (result.error || result.token_type !== 'bearer' || result.scope !== 'public_repo' ||
          typeof result.access_token !== 'string' || !/^[A-Za-z0-9_]{1,512}$/.test(result.access_token)) {
        throw new Error('Invalid token response')
      }
      // Keep GitHub's expiring-token protection. Discard refresh tokens; editors sign in again on expiry.
      // GitHub requires identity revalidation after each exchange; do not retain/log the response.
      const identity = await fetch('https://api.github.com/user', {
        redirect: 'error', signal: AbortSignal.timeout(10000),
        headers: { Authorization: `Bearer ${result.access_token}`, Accept: 'application/vnd.github+json',
          'User-Agent': 'veteran-support-ua-decap-oauth', 'X-GitHub-Api-Version': '2022-11-28' },
      })
      if (!identity.ok || !Number.isSafeInteger((await identity.json()).id)) throw new Error('Identity check failed')
      return popup(result.access_token, site)
    } catch {
      // Never expose/log callback code, cookies, tokens, secrets or upstream error details.
      return response('Sign-in failed. Close this window and try again.', 400,
        callback ? { 'Set-Cookie': clearCookie } : {})
    }
  },
}
