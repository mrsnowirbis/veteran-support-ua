# DONE

- 2026-10-07: prepared approved Ukrainian Memoria 13 story at /istorii/memoria-13/.
  Owner-supplied editorial text, excerpt, UNITED24 Media source and QG7SG5FzmTw;
  source date 9 November 2025 is separate from site publication date 7 October 2026.
  Stories gain optional ordered videos/source/externalUrl; old records keep empty
  videos. Shared parser/YouTubeVideo/ContentCard/thumbnail failure fallback reused.
  CMS story image labelled «Обкладинка»; custom image -> first video -> decorative art.
  Trusted nocookie/lazy/fullscreen/16:9 player, no autoplay/API or Markdown iframe.
  Stories routes receive only existing exact YouTube player/image host exceptions;
  homepage/template/design, other content, OAuth/permissions/CI/noindex unchanged.
  Existing homepage story feed naturally includes the new published story.
  PASS: build/lint/TypeScript/parser; smoke/approved visual/18-route browser tests;
  real local Decap source/text/cover edit/save -> build/render; future multi-video,
  cover priority/no-video/draft/demo/failure fixtures; player/card 320/390/1600 reflow.
  Temporary fixtures/media removed, loopback proxy stopped. Production playback
  verification follows protected PR/CI/Admin/Pages publication.

- 2026-10-07: all films listing cards reuse recovery's shared ContentCard/YouTube
  thumbnail utility and failure fallback: existing poster cover -> videos[0] HQ
  thumbnail -> decorative art. Future multi-video records work without code changes.
  Real first-series ID remains JWTZF3lM4PM (lowercase l); content/schema unchanged.
  Existing optional poster upload is labelled «Обкладинка» in Decap; no new fields.
  Only film img-src adds https://i.ytimg.com; player/CSP directives otherwise unchanged.
  Homepage/design/assets, other collections, OAuth/permissions/CI/noindex untouched.
  PASS: build/lint/TypeScript/parser tests; existing smoke/approved visual/17-route
  browser checks; real local Decap cover upload/save -> build -> card priority;
  future first-video/own-cover/no-video/draft/demo fixtures; 320/390/1600 no overflow,
  130px/object-fit/alt/lazy and network/placeholder fallbacks. Fixtures/media removed,
  loopback proxy stopped. Publication follows protected PR CI/Admin/Pages workflow.

- 2026-10-07: recovery listing cards reuse the existing YouTube parser for fixed
  i.ytimg.com/vi/<ID>/hqdefault.jpg thumbnails (no download/API/tracking parameters).
  Existing CMS image/«Обкладинка» has priority; absent video/cover or failed/missing HQ
  image retains the decorative fallback. Small listing-only script handles load failures.
  Existing 130px card-art area/grid preserved, cover uses object-fit: cover and alt="".
  Only recovery img-src gains https://i.ytimg.com; frame-src/other directives unchanged.
  Homepage receives no thumbnail or fallback script. Content/schemas/other collections,
  Header/Footer, OAuth, permissions, CI/CD/domain/noindex unchanged.
  PASS: build/lint/TypeScript/parser, existing smoke/approved visual/17-route browser tests;
  thumbnail 130px/cover/alt/lazy at 320/390/1600, network/placeholder/no-JS fallbacks.
  Real local Decap cover upload/save -> build/card priority PASS. Fixtures/media removed,
  loopback proxy stopped. Production thumbnail/playback checks follow PR CI/Admin/Pages.

- 2026-10-07: recovery material «Як допомогти тим, хто страждає від миттєвої реакції
  на надзвичайні ситуації та кризу?» uses owner-confirmed h2FSXhe5HEg, neutral supplied
  introduction, exact CSPC/Алекс Маляр credit and https://www.icspc.org/en source.
  No inferred techniques/biographies/medical advice. Existing recovery.video reused;
  only optional externalUrl added. Decap accepts video URL/file and source credit/URL.
  Shared YouTube parser/component renders trusted nocookie/lazy/fullscreen/16:9 iframe;
  non-YouTube media remain links. Exact host CSP exception scoped to recovery routes;
  per-page meta exception only for valid YouTube. Markdown iframe prohibition retained.
  Other collections, homepage layout/assets, OAuth, CI, permissions/domain/noindex untouched.
  PASS: build/lint/TypeScript/parser tests; existing smoke/approved visual/all-route browser
  checks; recovery 320/390/1600, 16:9/no-JS, source/warning and scoped CSP checks.
  Real local Decap edit/save -> fixture build/render PASS; fixture removed/proxy stopped.
  Production playback verification follows the protected PR/CI/Admin/Pages workflow.

- 2026-10-07: correct owner-confirmed YouTube IDs: series 1 `JWTZF3lM4PM` (lowercase l),
  series 3 `aZUTd7QV3dU` (final uppercase U); series 2 and 4 unchanged.
  Parser preserves ID bytes/case, with regression tests. Film players are now ordinary
  visible lazy youtube-nocookie iframes, responsive 16:9, named per series, fullscreen,
  no autoplay/API/key/client script/intermediate button. Direct source links retained.
  Existing scoped CSP unchanged. No homepage, other collections, OAuth, permissions,
  CI architecture, domain or indexing changes. Build, lint, TypeScript, parser tests and
  existing browser checks PASS; direct iframe/no-JS/16:9 checks PASS at 320/390/1600.
  Publication follows PR CI/Admin/Pages.

- 2026-10-07: prepared approved «Донбаський синдром» material for publication through PR/CI.
  Studio «Віател», film by Сергій Волков; full Ukrainian introduction, exact warning,
  four supplied YouTube series. No invented year, episode details or participant names.
  Existing films schema/Decap support optional credits/year/participants and ordered videos.
  Click-to-load youtube-nocookie, lazy iframe, strict URL parsing, keyboard/no-JS fallback.
  Film-route CSP exception only; homepage/design, other collections, OAuth and CI unchanged.
  Local build/lint/TypeScript, security and browser tests, real Decap edit/save → fixture
  build/render PASS; fixture removed. External playback requires production verification.
  No dependencies, credentials, local event/uploads or unrelated OAuth changes included.
  Deployment follows existing protected main workflow; noindex remains enabled.


- Stage 6 CI/CMS E2E, 2026-10-07: PR #5 added `.github/workflows/pr-ci.yml`.
  `pull_request` to main; Node 24.19.0, npm ci, build, lint and TypeScript PASS.
  Official Actions pinned to release SHAs; contents: read, no persisted credentials,
  custom secrets, cache, privileged fork trigger or Actions deployment.
  Existing browser tests require local Windows Edge/bundled Playwright in ignored work/;
  they are not portable CI. No dependencies added.
  Real Editor redaktor111 fork PR #4 passed PR CI (run 37543535011).
  Only then required Cloudflare Pages was replaced by PR CI from GitHub Actions;
  all other main protections preserved. Editor remains without upstream Write/Merge.
  Admin approved and merged PR #4 as dcb902d; Cloudflare deployment
  112345f8-21a0-484f-bb81-9f948a58d639 succeeded. Event and plain Markdown verified live.
  Cleanup PR #6 passed required CI and merged as 3fdb427; production deployment
  61851a7f-4a7d-4405-b782-6b221dd3d747 succeeded. No Git history was removed.
  Lists are clear; Pages retained the deleted detail URL in edge cache. An exact test-URL
  302 to /podii handles retention without altering security policy; remove only after
  2026-10-14 and confirmation the old asset is no longer served.
  Admin login/all five collections confirmed by owner; real Editor login/fork/PR verified.
  Design, artwork, noindex, public CSP, OAuth settings and help form were not changed.
  Unapproved local event/uploads remain outside Git.

## Historical checkpoints (superseded by the entry above)

- Stage 6, 2026-10-06: documentation PR #2 merged as `4208d32800a093d15f2e596814df62e7c9d01879`.
  Cloudflare production deployment `c1ed4b9d-4a84-427c-bd3e-a32e74d29108`: success.
  Current main policy verified in GitHub: PR required; temporarily approvals=0 (one trusted Admin);
  required `Cloudflare Pages` check from Cloudflare Workers and Pages, branch up to date;
  resolved conversations, stale approvals dismissed, no Admin bypass, no force push/deletion.
  Editor has no upstream Write/Merge rights; owner reviews and merges after checks.
  Restore approvals=1 when a second trusted Admin/reviewer is available.
  Dedicated GitHub CI and fork-PR check availability remain unverified.

- Stage 6 OAuth preparation: separate Worker `veteran-support-ua-oauth` deployed at
  https://veteran-support-ua-oauth.mr-snowirbis.workers.dev. Owner enabled OAuth;
  /auth returns GitHub 302 with exact callback, public_repo, PKCE S256 and Secure/HttpOnly cookie;
  invalid site/callback requests return 400, other paths 404. HTTPS/no-store/strict CSP/no wildcard CORS verified.
  Source and mock-provider security tests: workers/decap-oauth/; 5 tests and Worker ESLint PASS.
  Broker: encrypted 10-minute cookie, random state, PKCE S256, exact callback/origin/window checks,
  fixed public_repo scope, no logging of tokens/secrets. Worker logs remain enabled;
  Include Invocation logs disabled, traces disabled.
  OAuth App 3909261 created by owner; exact callback/Homepage, no wildcard/device flow,
  expiring access tokens verified. Owner added Client ID as Text and both Worker Secrets;
  only encrypted presence was inspected, never secret values. SITE_ORIGIN/AUTH_ORIGIN set;
  OAUTH_ENABLED=true verified after owner activation confirmation.
  PR #3 prepares the production Decap base_url; main still awaits that PR.
  Configuration checks: build, ESLint and TypeScript PASS; local /admin/ displays GitHub login,
  with no console warnings/errors. No login grant was performed; public UI/CSP unchanged.
  Real login, Admin/Editor E2E, fork checks and cleanup are not tested yet.

- Этап 5B: PUBLIC https://github.com/mrsnowirbis/veteran-support-ua, main опубликована.
  Первый production deployment 2026-10-05: https://veteran-support-ua.pages.dev/.
  Cloudflare Dashboard подтвердил Success; Git SHA 5c8fe36fe36429956d76672f1f3d42bcfbe217eb.
  Node 24.19.0, npm run build, dist; Astro static, без SSR/adapter/Functions.
  ASTRO_TELEMETRY_DISABLED=1, SHOW_DEMO_CONTENT=false; noindex в коде сохранён.
  GitHub App Cloudflare авторизован владельцем только для veteran-support-ua.
  Decap repo указан; auth placeholder сохраняет production login выключенным.
  Attachments и локальные Worker secret-файлы исключены через .gitignore.
  Локальная новость и пять JPG остаются вне Git; approved UI/assets не изменены.
  Current main protection is documented in the Stage 6 entry above.
  OAuth не настроен. Production verification после исправления View Transition: PASS (ниже).
- Preflight: проверены 7 commits / 153 версии Git blobs по известным secret patterns;
  совпадений не найдено. Credentials/private-data files и временные fixtures в истории не обнаружены.
  Это проверка известных шаблонов, не гарантия отсутствия любых чувствительных данных.

- Этап 5A поверх 2974dac: подготовлены docs/DEPLOYMENT.md и ссылка из docs/CMS.md.
  Изменения только документационные; сайт, CMS config, schemas, dependencies и CSP не изменены.
- Проверена статическая архитектура Astro → GitHub main → Cloudflare Pages dist.
  Adapter/SSR/Functions/новые зависимости не нужны и не добавлены.
- Зафиксированы Node 24.19.0 (.nvmrc), npm >=11.17, воспроизводимая установка с lockfile/devDependencies,
  environment, маршруты/admin/404, проверка security headers и HTTPS после deployment.
- Checklist A–N описывает repository/push/protection/Pages/domain/OAuth/два аккаунта/полный цикл/rollback.
- Минимальная auth-архитектура: отдельный будущий OAuth Worker с /auth и /callback,
  state/PKCE/origin checks; client secret и session secret только в Worker Secrets.
- GitHub main: обязательный PR, Admin/CODEOWNER review, успешные CI checks, запрет force-push/delete.
  Editor без write/admin → Open Authoring fork/PR; это не встроенный RBAC Decap.
- Rollback: предыдущий успешный Pages production deployment, затем reviewed revert/restore commit;
  история сохраняется, OAuth Worker/secrets управляются отдельно.
- На этапе 5A внешние ресурсы/аккаунты не создавались, push/deployment/OAuth не выполнялись.

# VALIDATION — 5B (перед push)

- Build, lint, TypeScript: PASS. Локальный dist не публикуется: содержит некомічену новость.
- Admin browser smoke: PASS; реальный repo/main/Open Authoring, пять коллекций,
  editorial workflow, production login по-прежнему заблокирован auth placeholder.
- Git diff check: PASS; changes только .gitignore, CMS repo и документация.

# VALIDATION — 5B (после deployment)

- Cloudflare Linux build и deployment: PASS по Dashboard; журнал подтверждает clone SHA,
  установку Node 24.19.0, npm clean-install, npm run build и Astro static output.
- Финальную npm-версию проверить: detection до установки Node показывал npm 10.9.2,
  тогда как package.json требует >=11.17. Это не подтверждение версии после установки Node.
- Live verification 5c8fe36: routes/collections/admin/artwork/headers/CSP/noindex/HTTPS/404 PASS;
  единственная ошибка console ViewTransition устранена в 062d868, merged через PR #1.
- Production main: 6fa554d9a6b35f429d25244701ba777b1ff1fadb; Cloudflare deployment
  7f0c021f-2078-4049-8cb1-b5dae1970c31, success 2026-10-05. Live HTML совпадает с deployment URL.
- Повторная проверка: HTTPS 200, HTTP 301 → HTTPS, /pro-nas/ и /admin/ 200;
  desktop 1600/mobile 390, повторные Home/About переходы без console warnings/errors;
  overflow отсутствует на 1600/390/320. CSP/security headers и noindex,nofollow сохранены.
- HTML совпадает с предыдущим deployment кроме имени CSS; CSS отличается только удалённым opt-in;
  logo/Hero побайтно неизменны, attribution сохранена. HSTS на pages.dev не возвращается.
- Required approval временно отключено с разрешения владельца для merge PR #1, затем восстановлено (1).
  Остальные правила main сохранены; OAuth/CMS/domain/backend не изменялись.
- OAuth, два аккаунта CMS E2E и rollback ещё не проверены.

# VALIDATION — 5A

- Production build локально: PASS, static output, 16 публичных страниц с локальной новостью.
- Lint (включая admin.js), TypeScript: PASS.
- Существующие browser/smoke tests: PASS, 16 маршрутов, SEO/canonical/OG, links/media,
  keyboard/no-JS, widths 320/375/768/1280, без overflow/внешних загрузок/CSP/JS errors.
- Admin static smoke: PASS, /admin/ и config загружаются, пять коллекций, GitHub/main/Open Authoring,
  editorial workflow, local_backend=false, production login заблокирован placeholders.
  OAuth запросы и CMS записи при проверке не выполнялись.
- dist содержит admin, _headers и 404.html; server Worker bundle отсутствует.
- Это локальная проверка, не проверка Linux builder/HTTP edge Cloudflare или реального OAuth.

# СОХРАНЁННЫЙ CHECKPOINT 4B

- Decap: events, stories, recovery, films, education; существующие schemas и Markdown.
- Украинские формы, rich text, media uploads, автоматические slug; новые записи draft=true/demo=false.
- Отдельные страницы полного контента, локальные media, безопасные ссылки, очистка Markdown sanitize-html.
- Draft исключены всегда; demo — только dev или явная preview-сборка SHOW_DEMO_CONTENT=true.
- Hero/Header/Footer/artwork/attribution/mobile/layout/палитра и системные страницы сохранены.
- Форма помощи отключена; CMS/Git только для публичного контента, никогда для обращений/приватных данных.
  Все uploads публичны после build, включая изображения черновиков; Git сохраняет историю.
- Локальный режим: сайт 127.0.0.1:4321, proxy 127.0.0.1:8081; /admin/index.html?local=1.
  Proxy без auth пишет рабочие файлы; не выставлять в LAN/интернет. Среда этой итерацией не менялась.

# BLOCKERS / DEPLOYMENT GATES

- Repository: mrsnowirbis/veteran-support-ua, PUBLIC; Admin — владелец mrsnowirbis.
  Cloudflare авторизован; нужны Editor/reviewer и позднее domain/DNS.
- Required PR CI от GitHub Actions включён; CI PASS на реальном fork PR #4. CODEOWNERS не настроен.
  Локальные browser tests находятся в ignored work/ и не являются готовым GitHub CI.
  Пока Admin один, approvals=0; с появлением второго доверенного Admin вернуть approvals=1.
- OAuth broker enabled by owner; Admin/Editor login и fork/PR/merge/deployment/cleanup проверены.
- Linux Pages build, live redirect/headers/TLS проверены; отдельная rollback exercise ещё не выполнялась.
- example.invalid, noindex/nofollow и /statut placeholder остаются до отдельного согласованного запуска.
- Локальная новость src/content/events/2026-10-03-.md и пять JPG в public/uploads/events/ не коммитились;
  сохранены без изменений. До push отдельно решить, какие материалы включать. Attachments не добавлять.
- Даты/сроки контента обновляются при build. Полный WCAG-аудит не выполнялся.

# NEXT TASK

Connect custom domain and perform final DNS/TLS/indexing review.
Documentation commit 035e1de is published through merged PR #2. Stage 6 updates use a separate PR.

## View transition fix verification

- Removed only the optional CSS cross-document view-transition opt-in; no design, navigation, CMS or dependency changes.
- Build, lint, TypeScript and all four existing browser checks passed.
- Desktop/mobile navigation, including repeated Home/About transitions: no console warnings/errors or horizontal overflow.
- Compiled styles match production after excluding the removed rule; visual checks passed.
- Production verification passed on main 6fa554d after PR #1 merge and automatic Cloudflare deployment.
