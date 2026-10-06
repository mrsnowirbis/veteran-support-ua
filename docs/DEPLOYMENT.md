# Production deployment

## Stage 6 — current policy (2026-10-06)

Documentation PR #2 merged into `main`: `4208d32800a093d15f2e596814df62e7c9d01879`.
Cloudflare production: `c1ed4b9d-4a84-427c-bd3e-a32e74d29108`, success.
One trusted Admin: PR required, **approvals=0 temporarily**; owner reviews and merges after checks.
Required check: **Cloudflare Pages**, source **Cloudflare Workers and Pages**; branch must be up to date.
Conversation resolution, dismissal of stale approvals and no Admin bypass remain enabled;
force pushes and branch deletion remain disabled. Editor receives no upstream Write/Merge permission.
**Restore approvals=1 when a second trusted Admin/reviewer is available.**
GitHub CI is not installed; whether the Pages check runs on Editor fork PRs must be tested before E2E.
Do not weaken protection if a fork check is unavailable; configure suitable secret-free PR CI instead.

OAuth Worker enabled by owner:
`https://veteran-support-ua-oauth.mr-snowirbis.workers.dev`.
Valid `/auth`: GitHub 302, exact callback/public_repo/PKCE S256, Secure/HttpOnly cookie.
Invalid site/callback: 400; other paths: 404. No-store, strict CSP and no wildcard CORS verified.
Worker logs enabled, Include Invocation logs disabled, traces disabled.
Owner created OAuth App 3909261 and entered Client ID and both encrypted Worker Secrets;
values were not read or copied. `OAUTH_ENABLED=true` verified after owner activation confirmation.
PR #3 prepares Decap's real base_url; merge, login and Admin/Editor E2E are pending.
Source, tests and setup: [workers/decap-oauth/README.md](../workers/decap-oauth/README.md).
GitHub OAuth App fields: name `Veteran Support UA — Decap CMS`,
Homepage `https://veteran-support-ua.pages.dev`,
callback `https://veteran-support-ua-oauth.mr-snowirbis.workers.dev/callback`.
Owner configured the App, entered secrets directly in Worker Secrets and approved activation.
Keep expiring access tokens enabled; after expiry, sign out and sign in again. No refresh token is retained.

## Поточний етап 5B

Підтверджений public repository: https://github.com/mrsnowirbis/veteran-support-ua,
production branch — `main`. Git Credential Manager авторизований власником локально.
Виконано перший push лише затвердженої Git-історії та deployment-конфігурації;
локальна новина та п'ять некомічених JPG не входять до публікації.
Decap використовує реальний repo, але login залишається вимкненим через auth placeholder.
Cloudflare Pages підтвердив успішний deployment 2026-10-05:
https://veteran-support-ua.pages.dev/ — початковий SHA `5c8fe36fe36429956d76672f1f3d42bcfbe217eb`.
Поточний production після PR #1: `6fa554d9a6b35f429d25244701ba777b1ff1fadb`,
deployment `7f0c021f-2078-4049-8cb1-b5dae1970c31`, success 2026-10-05.
Node `24.19.0`, команда `npm run build`, output `dist`; noindex у коді збережений.
GitHub App має доступ лише до цього repo. Поточні правила main наведено у Stage 6 вище.
OAuth не налаштований; custom domain пізніше.
Live verification: PASS. HTTPS 200, HTTP 301 → HTTPS; desktop/mobile Home/About transitions без
console warnings/errors; overflow відсутній на 1600/390/320. CSP, security headers і noindex,nofollow
збережено; /admin/ доступний. Початкові routes/collections/404 перевірено раніше.
HTML/CSS незмінні, крім видаленого View Transition opt-in та імені CSS; logo/Hero і attribution збережено.
Live HTML відповідає URL поточного deployment. HSTS для pages.dev не повертається.
Для merge PR #1 власник дозволив тимчасово вимкнути approval; після merge вимогу 1 approval відновлено.
Лог до встановлення Node показував npm 10.9.2; перевірити фактичну версію після встановлення Node
на відповідність package.json >=11.17. Налаштування builder автоматично не змінювалися.
Секрети не додавалися. Не завантажувати локальний dist: він може містити некомічені матеріали.
Deployment має будувати тільки файли з GitHub `main`.

Стан після `2974dac`: Astro static → GitHub `main` → Cloudflare Pages `dist`.
Adapter, SSR, Functions, Wrangler у сайті та runtime CMS не потрібні. Production login
заблокований placeholders у `public/admin/config.yml`; локальний режим збережений.

## Параметри Pages

| Налаштування | Значення |
| --- | --- |
| Integration / branch | GitHub / `main`; root — каталог із `package.json` |
| Site build / output | `npm run build` / `dist` |
| Node | `24.19.0`, уже закріплено в `.nvmrc`; `NODE_VERSION=24.19.0` |
| npm | `11.17.0` або перевірена сумісна версія; не покладатися на default builder |
| Environment | `ASTRO_TELEMETRY_DISABLED=1`, `SHOW_DEMO_CONTENT=false` |
| Installation | lockfile, devDependencies потрібні для Astro; `.npmrc` з `ignore-scripts=true` зберегти |
| Secrets сайту | Не потрібні; OAuth secrets не передавати до Pages build/preview |

Для відтворюваної установки у Pages v3: `SKIP_DEPENDENCY_INSTALL=1`, повний **Build command**:

```sh
npx --yes --ignore-scripts --package=npm@11.17.0 npm ci --include=dev && npm run build
```

Це вибір npm лише у builder, без нової залежності проєкту. Перевірити Node/npm та чисту Linux-збірку
в першому build log. `package.json.engines` сам по собі не налаштовує версії Pages v3;
не покладатися на `NPM_VERSION` зі старих build images. [Build image](https://developers.cloudflare.com/pages/configuration/build-image/).

## Маршрути та заголовки

`dist/404.html` забезпечує справжню 404; SPA catch-all не додавати. `public/_redirects` зараз не потрібен:
Pages нормалізує HTML/index URLs. Перевірити `/admin`, `/admin/`, `/admin/index.html`, відсутність redirect loop
та збереження hash-навігації Decap. [Pages routing](https://developers.cloudflare.com/pages/configuration/serving-pages/).

`public/_headers` копіюється у `dist/_headers`: публічна CSP, nosniff, no-referrer, DENY, Permissions-Policy.
Лише `/admin/*` від’єднує HTTP CSP; рання admin meta CSP залишає точний CDN/SRI, AJV `unsafe-eval`,
inline styles та необхідні GitHub/media/loopback connections. Публічну CSP не розширювати.
Admin має noindex/no-store; X-Frame-Options DENY зберігається. Після hosting перевірити фактичні HTTP headers,
включно з admin/config, вкладеною сторінкою та 404: dev/локальний HTTP server не підтверджує поведінку edge.
[Правила headers](https://developers.cloudflare.com/pages/configuration/headers/).

HTTPS обов’язковий. Після підключення домену перевірити HTTP→HTTPS, сертифікат і canonical host;
налаштувати HSTS для перевіреного домену без поспішного `includeSubDomains`/preload.
Не додавати wildcard CORS/CSP, analytics, Web Analytics injection, trackers або автоматичну оптимізацію scripts.

## GitHub та review

Базова модель — public repository, GitHub backend, `open_authoring: true`,
`publish_mode: editorial_workflow`, `auth_scope: public_repo`, branch `main`.
Editor не отримує write/admin основного repo: CMS створює fork, Ready to Review відкриває PR;
Admin перевіряє та merge через GitHub. PR редактора не відображається як звичайна Admin-картка workflow.
Це не RBAC: Git дозволяє запропонувати будь-який diff. Review має дозволяти лише п’ять контентних
каталогів та відповідні uploads; код/конфігурація/системні сторінки — окремі Admin PR.
[Open Authoring](https://decapcms.org/docs/open-authoring/).

Для `main`: PR обов’язковий; тимчасово approvals=0, review/merge виконує єдиний Admin.
З появою другого довіреного Admin/reviewer повернути approvals=1. Поточний required check —
Cloudflare Pages; branch up to date, stale approvals dismissed, discussions resolved.
Force-push/delete заборонені, правила застосовуються також до Admin. Майбутній CODEOWNERS
заповнювати лише реальними довіреними акаунтами, включно із захистом самого CODEOWNERS.
Для private repo спочатку перевірити plan/protection/fork policy — не розширювати scope непомітно.
[Branch protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches).

GitHub CI ще не підключений: для окремих build/lint/TypeScript checks створити secret-free `pull_request` перевірку
build/lint/TypeScript, дочекатися її реальних status names і вибрати їх у protection. Використовувати
GitHub-hosted runner, read-only token, перевірені actions, без `pull_request_target` з checkout коду PR.
Не вимагати production deployment до merge і не вважати Pages preview гарантованим для fork PR.
Локальні browser tests наразі у ignored `work/`, не є встановленим GitHub CI.
Production deploy тільки з `main`; preview не отримує OAuth secrets або дозволу broker на login.

## Мінімальний OAuth broker — окремий Worker

Статичний браузерний Decap не може безпечно зберігати client secret для обміну GitHub code на token.
Окремий Worker на фактичному `AUTH_ORIGIN` вище незалежний від статичного Pages.
Mock-provider security tests пройдені; реальний OAuth і два акаунти ще потребують перевірки.
[OAuth clients](https://decapcms.org/docs/external-oauth-clients/).

| Endpoint | Дія |
| --- | --- |
| `GET AUTH_ORIGIN/auth` | Перевірити дозволений site origin/provider/scope; створити короткочасний state/PKCE, перенаправити до GitHub authorize |
| `GET AUTH_ORIGIN/callback` | Перевірити state/session/expiry, обміняти code на token серверним POST до GitHub; завершити Decap popup protocol |

Майбутній GitHub OAuth App: Homepage URL = `SITE_ORIGIN`, Authorization callback URL =
`AUTH_ORIGIN/callback`. Це символічні позначення, не вигадані домени. Broker має використовувати
однаковий точний redirect URI при authorize та token exchange, PKCE S256, Secure/HttpOnly/SameSite cookie,
короткий строк сесії, очищення state після callback, перевірку `event.origin`/`event.source`
та точний `postMessage` target origin, без `*`. Заборонити довільні return URLs і preview origins.
Callback: no-store, no-referrer, власна мінімальна CSP; не логувати query code, cookies або tokens.
Токен сесії Decap потрібен браузеру редактора; client secret у браузер не передається.
[GitHub OAuth flow](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps).

Secrets майбутнього Worker: `GITHUB_CLIENT_SECRET` та `OAUTH_SESSION_SECRET` для захисту state/session
(назви узгодити з обраною реалізацією). `GITHUB_CLIENT_ID`, `SITE_ORIGIN`, `AUTH_ORIGIN`, repo та scope —
несекретні environment settings. Секрети вводити як **Secret** у Cloudflare Worker Variables and Secrets,
не plaintext vars, не Pages build env, не `PUBLIC_*`, не Git/.env у repo, не чат.
PAT, GitHub password, private key чи Cloudflare API token для dashboard Git integration не потрібні.
[Worker secrets](https://developers.cloudflare.com/workers/configuration/secrets/).

Scope `public_repo` ширший за одну папку/репозиторій: broker не перетворює його на folder-level RBAC.
Адміністративні права визначає GitHub. Дані форми допомоги ніколи не належать CMS/Git;
усі uploads і історія публічного repo доступні іншим, включно із зображеннями чернеток.

## Checklist — виконувати лише після окремого дозволу на deployment

| Крок | Дія та умова переходу |
| --- | --- |
| A | Власник створює/обирає GitHub repo, visibility, реальні Admin/Editor, підтверджує права на публікацію контенту. |
| B | Перевірити tracked files/history, підключити правильний remote, push `main`. Локальні новина/JPG не в Git; окремо вирішити, що додавати. Не застосовувати `git add .` до attachments/work. |
| C | Налаштувати CI, CODEOWNERS і branch protection вище; required checks мають реально запускатися на fork PR. |
| D | Підключити Cloudflare Pages Git integration лише до обраного repo; задати параметри таблиці, production `main`. |
| E | Після дозволу виконати перший deployment, перевірити build log, `/`, контент/media, 404, `/admin/`, CSP. OAuth ще вимкнений; noindex не є контролем доступу. |
| F | Підключити domain/DNS/TLS; перевірити HTTPS. Окремим reviewed commit замінити `astro.config.mjs` site `example.invalid`, перевірити canonical/sitemap/OG і pages.dev→основний домен. Зняття noindex/nofollow — тільки при схваленні публічного запуску. |
| G | Власник створює GitHub OAuth App з точними Homepage/Callback URL вище. |
| H | Окремо перевірити та налаштувати broker Worker: endpoints, state/PKCE, origin allowlist, popup protocol, відмова при помилках. |
| I | Додати client secret/session secret через Cloudflare Worker Secrets; несекретні settings — окремо; Pages/PR їх не отримують. |
| J | Лише після H–I замінити `backend.repo` та `backend.base_url` у config.yml; `auth_endpoint: auth`, `branch: main`, Open Authoring/workflow зберегти. Це зніме поточне блокування login. Не додавати CSP origins без фактичної потреби popup/client; публічну CSP не змінювати. |
| K | Реальним Admin перевірити login/logout, repo permissions, читання CMS; merge тільки з виконаними правилами. |
| L | Реальним Editor без write перевірити fork/create/edit/upload/Ready to Review; прямий запис у main та публікація мають бути недоступними. |
| M | Узгоджений публічний матеріал: CMS → fork PR → CI → Admin review → merge → автоматичний Pages deployment; перевірити URL/media, draft/demo і роботу сайту при недоступному OAuth. |
| N | Перевірити rollback нижче й записати відомий робочий Git SHA та deployment ID. |

## Rollback без втрати історії

Admin призупиняє нові merge/auto deploy на час інциденту та записує поточний SHA/deployment ID.
У Pages Deployments обирає попередній успішний **production** deployment → Rollback to this deployment
(preview не є rollback target). Це швидко повертає артефакти, але НЕ змінює `main` чи OAuth Worker/secrets.
[Pages rollback](https://developers.cloudflare.com/pages/configuration/rollbacks/).

Для постійного виправлення — окрема гілка і PR з `git revert` помилкових commit, або новий commit,
який відновлює потрібні файли з відомого робочого SHA. Для merge commit перевірити правильний mainline;
не використовувати force-push/reset переписування історії. CI → review → merge → deployment,
після перевірки відновити auto deploy. Worker/version/config відкочуються окремо;
скомпрометовані secrets ротуються, а не повертаються до старих значень.

## Що ще не підтверджено

Repository/Pages/власник і required Pages check підтверджені; broker deployed disabled.
Domain і GitHub CI ще відсутні; OAuth App/secrets налаштовані, activation/E2E ще не виконані.
Linux build та edge redirects/headers перевірено; реальні OAuth/два акаунти/rollback потребують перевірки.
Залишаються `example.invalid`, noindex, `/statut` placeholder і локальні некомічені новина/JPG.
Це явні умови до повного запуску; стан зовнішніх етапів зазначений на початку документа.
