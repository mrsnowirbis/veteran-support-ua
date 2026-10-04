# Production deployment — підготовка, без публікації

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

Для `main`: PR обов’язковий, щонайменше одне схвалення реального Admin/CODEOWNER,
скасування застарілих approvals, вирішені discussions, актуальний успішний build/lint/TypeScript;
force-push/delete заборонені, правила застосовуються також до Admin. CODEOWNERS заповнити реальними
акаунтами, включно із захистом самого CODEOWNERS. Для PR самого Admin потрібен інший довірений reviewer.
Для private repo спочатку перевірити plan/protection/fork policy — не розширювати scope непомітно.
[Branch protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches).

GitHub CI ще не підключений: до ввімкнення required checks створити secret-free `pull_request` перевірку
build/lint/TypeScript, дочекатися її реальних status names і вибрати їх у protection. Використовувати
GitHub-hosted runner, read-only token, перевірені actions, без `pull_request_target` з checkout коду PR.
Не вимагати production deployment до merge і не вважати Pages preview гарантованим для fork PR.
Локальні browser tests наразі у ignored `work/`, не є встановленим GitHub CI.
Production deploy тільки з `main`; preview не отримує OAuth secrets або дозволу broker на login.

## Мінімальний OAuth broker — майбутній окремий Worker

Статичний браузерний Decap не може безпечно зберігати client secret для обміну GitHub code на token.
Пропонується окремий невеликий Worker на `AUTH_ORIGIN` (майбутній HTTPS auth-піддомен), незалежний від
статичного Pages. Реалізацію треба вибрати/перевірити окремо; список Decap — не гарантія її безпеки.
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

Немає production repo/account/domain, CI protections, broker або OAuth App. Чистий build у Linux Pages,
edge redirects/headers, реальні OAuth/два акаунти/rollback потребують deployment-перевірки.
Залишаються `example.invalid`, noindex, `/statut` placeholder і локальні некомічені новина/JPG.
Це явні умови до публічного запуску; поточний етап нічого не публікує.
