# Decap OAuth Worker

Independent service; no dependencies, database, content storage or generic proxy.
Only `GET /auth` and `GET /callback`. Until configured, both return **503**.
Astro/Pages and production Decap config remain unchanged.

Deployed, disabled: `https://veteran-support-ua-oauth.mr-snowirbis.workers.dev`.
OAuth App callback: `https://veteran-support-ua-oauth.mr-snowirbis.workers.dev/callback`.

Deploy `worker.mjs` as an ES module through the Cloudflare Worker editor.
Workers logs remain enabled; **Include Invocation logs is disabled**, traces disabled.
Keep this configuration: request URLs contain authorization codes.
The source deliberately has no logging. Do not enable Logpush/tail during real sign-in.

Worker **Text** variables:

- `GITHUB_CLIENT_ID`: owner copies from the GitHub OAuth App (not a secret).
- `SITE_ORIGIN`: `https://veteran-support-ua.pages.dev` (no trailing slash).
- `AUTH_ORIGIN`: `https://veteran-support-ua-oauth.mr-snowirbis.workers.dev` (no trailing slash).
- `OAUTH_ENABLED`: `false` until setup is reviewed; `true` only when authorized to enable login.

Worker **Secret** variables (never Pages build environment, files, Git or chat):

- `GITHUB_CLIENT_SECRET`: OAuth App secret, entered directly by the owner.
- `OAUTH_SESSION_SECRET`: 32 cryptographically random bytes encoded as 64 hex characters,
  generated privately by the owner and pasted directly into Worker Secrets.

OAuth App callback must be exactly `AUTH_ORIGIN/callback`; Homepage is `SITE_ORIGIN`.
Keep **Expire user access tokens enabled**; leave device flow and wildcard callbacks disabled.
Refresh tokens are discarded. After token expiry, the editor logs out and signs in again;
automatic refresh is outside this two-endpoint broker.
Scope is fixed to `public_repo`; this covers public repos accessible to the account, not one folder.
GitHub protections and owner review enforce upstream publishing permissions.

Security: AES-GCM session cookie, Secure/HttpOnly/SameSite=Lax, ten-minute expiry,
random state and PKCE S256; exact callback and origin; fixed GitHub exchange and identity check;
nonce CSP, no-store/no-referrer, exact popup target/source. GitHub codes are single-use;
callback clears the session. Errors never include provider response details.

Tests: `node --test workers/decap-oauth/worker.test.mjs` (mock provider only).
Actual Worker/browser OAuth, Admin/Editor and fork-PR checks still require the owner setup.
Enable Decap `base_url` only after the broker is ready, through the protected PR workflow.

Sources: [Decap GitHub](https://decapcms.org/docs/github-backend/),
[external OAuth](https://decapcms.org/docs/external-oauth-clients/),
[Decap popup protocol](https://github.com/decaporg/decap-cms/blob/main/packages/decap-cms-lib-auth/src/netlify-auth.js),
[GitHub OAuth](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps).
