# DONE

- 2026-10-10: local, unpublished «Про нас» approved watercolor integration on
  codex/about-watercolor-experiment, continuing the CSS experiment afd4a13.
  pro-nas.astro replaces the pigment pseudo-elements/title stroke with the
  supplied «Корни и опора» artwork. Desktop retains the complete landscape on
  the right, with HTML copy on a milk surface at the left. Mobile places a
  right-side crop below the copy; tree, roots, sprout and sunrise remain visible.
  Local masks dissolve the artwork into the existing background. Reading
  content, headings, type, colors, navigation, Header/Footer, SEO and scripts
  are unchanged; no new dependencies, JS, animation or shared components.
  Existing Sharp resize/WebP pipeline converts the 2,588,703-byte 1983x793 PNG
  to about-roots-support.webp (1600x640, 170,868 bytes) and the mobile crop
  (780x571, 122,160 bytes), quality 82/effort 6. Originals are not copied into
  the site. Both optimized assets contain no EXIF/XMP/ICC metadata. Responsive
  picture loads exactly one variant; empty alt and aria-hidden on img exclude
  the decoration from the accessibility tree; pointer-events stay disabled.
  New page-only CSS: 1,112 bytes (436 gzip). All other 26 generated HTML files
  and every pre-existing shared asset are byte-identical to afd4a13's build.
  PASS: build, lint, TypeScript, four YouTube tests and before/after headless Edge
  visual QA at 1600/390/320: no overflow, preserved content/type/SEO/Header/Footer,
  loaded images, keyboard focus, no CSP/console errors or external requests.
  Additional 900/901 breakpoint checks pass; measured hero-copy contrast is
  at least 7.42:1 at all five widths. Screenshots/reports: ignored outputs/about-art.
  npm audit retains nine existing findings (seven high, two moderate), without
  dependency/lockfile changes. Verification used existing bundled Playwright
  and local Edge; other browser engines have not been checked. Hero is taller
  than the CSS-only experiment; mobile intentionally omits the left landscape.
  No push, PR, merge, deployment or production change; awaits visual comparison.

- 2026-10-08: owner-approved recovery material «Як працює творча майстерня»
  at /vidnovlennia/tvorcha-maisternia-ptashky/. Title shortened at the owner's request.
  Supplied title, summary and text retained without diagnoses, treatment effects,
  official therapy status, inferred qualifications, participant identities or
  unconfirmed institutions/session dates. Publication date is 2026-10-08;
  required author/source field identifies the workshop, not an inferred writer.
  New category «Творче відновлення» appended consistently to Astro enum, Decap
  select and listing/category anchors. Existing categories/order/content unchanged;
  no new schema fields or category mappings. Editor documentation updated.
  Cover: 1000007695. Inline order: personal chevron 1000003204, owner-supplied
  replacement process photograph 1000007692 (instead of absent 1000007700),
  1000007697, 1000007693, 1000007686, 1000007688. Exact requested alt descriptions;
  personal chevron caption follows its first introduction of Ірина. The chevron
  is PNG 697x906 with alpha, limited to 320px through an existing article-local
  source selector; no background added or global image styling changed.
  Six photos use existing Sharp rotate/resize/WebP pipeline, quality 82/effort 6,
  original dimensions/proportions retained. PNG is lossless and every RGBA pixel
  matches its source. All seven assets total 2,410,341 bytes: no EXIF/XMP/IPTC/ICC
  or GPS; WebP and PNG chunks verified. No face processing; originals stay ignored.
  Optional tulip photograph and absent MP4 not used; no new video architecture.
  Existing recovery CMS fields and shared custom-cover/YouTube/placeholder card
  logic reused; homepage limit stays three, with no layout/sorting/code changes.
  PASS: build, lint, TypeScript, four YouTube tests, 26-route browser regression
  (SEO/semantics/headings/local links/assets/anchors/320/390/1600/console/CSP),
  targeted detail/listing/homepage image loading/aspect ratio/alt/compact alpha
  chevron/caption/keyboard/focus/no overflow. Actual pinned Decap loads the entry
  and all editable alt fields; disposable fixture selects the new category and
  edit/save/build preserves date/slug/body/six inline images/caption/cover and
  absent video/audio. Fixture removed and loopback proxy stopped; QA artifacts
  stay in ignored work/outputs. npm audit retains nine previously documented
  findings (seven high, two moderate); dependencies and lockfile unchanged.
  No homepage/Header/Footer/other content, OAuth, CSP, CI, permissions, noindex
  or hosting changes. Release uses required PR CI, authorised merge and automatic
  Cloudflare Pages deployment, followed by live article/CMS/category/home checks.

- 2026-10-08: owner-approved homepage preview fix. Recovery and story feeds now
  pass their existing image/video fields to ContentCard; the shared youtubeThumbnail
  helper and failure fallback are reused. Custom cover has priority, then the
  first YouTube preview, then the original decorative artwork. No homepage iframe.
  Homepage-only compact media keeps all six preview areas at the original 130px,
  object-fit cover, unchanged card layout/radius and decorative alt model.
  Both outdated demo descriptions replaced with the owner's neutral Ukrainian text.
  Homepage enables the existing thumbnail script/meta CSP only when needed; exact
  root HTTP CSP permits i.ytimg.com images without adding player/frame permissions.
  Hero/Header/Footer, other sections, detail pages, article/media files, CMS schema,
  OAuth, permissions, CI, dependencies, noindex and domain remain unchanged.
  PASS: build, lint, TypeScript, four YouTube unit tests, existing 25-route browser
  regression suite (only the old homepage thumbnail expectations adjusted in memory),
  and homepage integration checks at 1600/390/320: all six exact covers/video IDs,
  uniform 130px media, no image-loading shift/overflow/iframe, links/focus, CSP/console,
  and shared fallback for network errors/small YouTube placeholders. Screenshots and
  targeted browser harness are ignored local artifacts. Required PR CI and automatic
  Pages deployment precede live homepage verification, as authorised by the owner.

- 2026-10-08: owner-approved event «Рушник рутенських псевдо: історія, створена
  власноруч» at /podii/rushnyk-rutenskykh-psevdo/. Supplied event date 2027-01-28
  is retained exactly and displayed as «28 січня 2027 року»; the existing listing
  places it under upcoming events. No invented time, location, identities, callsign
  list, historical dating or medical claims. Programme description is attributed
  to the project authors; ІнфоВАРТА attribution and the supplied Facebook link
  are in the editable body. Facebook facts are supplied by the owner.
  Five owner images matched by content: result/process collage as cover; general
  table scene, printing, shared work and fragment collage inline. Sharp WebP
  quality 88, 956,372 bytes combined, original proportions and embedded text/
  pixelation preserved; no EXIF/XMP/IPTC, original attachments retained locally.
  Only this event cover uses contain in the existing 192px listing image area
  to preserve the whole collage; other cards and global design remain unchanged.
  Existing events schema, cover/alt/body image editing and draft/demo reused.
  PASS: build/lint/TypeScript/parser, smoke/approved homepage and 25-route browser
  tests; desktop/320/390 cover, four inline images, Ukrainian date, headings,
  keyboard/focus/source, no broken local assets/links, overflow or CSP/JS errors.
  Real Decap events loads the entry and five images; fixture edit/upload/save/build
  retains the exact event date, alt, four inline images and source; draft/demo
  filtering and timed events unchanged. Fixtures removed and local proxy stopped.
  npm audit reports 9 existing vulnerabilities (7 high, 2 moderate); dependencies
  and lockfile unchanged. Remediation remains separate from content publication.
  No homepage/Header/Footer, other content, schema, CSP, OAuth, permissions, CI,
  Cloudflare architecture, noindex or domain changes. Publication follows required
  PR CI, owner merge and automatic Pages deployment, then live verification.

- 2026-10-07: owner-approved recovery material «Не стрес нами керує, а ми ним:
  практичні поради психолога Тетяни Марініної» at /vidnovlennia/ne-stres-namy-keruie/,
  category «Стабілізаційні вправи». ArmyInform original page checked: psychologist
  Tetiana Marinina, author Tetiana Holovatiuk, original date 12 August 2022.
  Publication date on this site is 7 October 2026, original date separately in body.
  Approved neutral text and four exercise summaries retained; no prevalence/diagnosis
  claims about PTSD, promises of treatment or additional physiological claims.
  Existing blockquote contains the approved information/discomfort disclaimer;
  ArmyInform attribution and original HTTPS link present, no copied source images.
  Existing recovery schema, YouTubeVideo/parser/thumbnail reused unchanged: exact
  bwiO8CDZyxU, nocookie/lazy/16:9/no autoplay/fullscreen, immediate player, HQ thumbnail,
  custom-cover priority and decorative fallback. Player uses existing detail layout.
  PASS: build/lint/TypeScript/parser, existing smoke/approved homepage/browser tests
  across 24 routes; 320/390/1600 card/player/source/disclaimer/headings/focus/no overflow.
  Real local Decap recovery loads entry; fixture edit/upload/save/build preserves
  category/date/URL and proves custom cover priority. Fixture/media removed, proxy stopped.
  npm audit reports 9 existing vulnerabilities (7 high, 2 moderate); dependencies and
  lockfile unchanged. Remediation is separate from this content-only publication.
  No homepage/design, other content, schema, CSP, OAuth, roles, CI, noindex/domain changes.
  Publication follows required PR CI, owner merge and automatic Pages deployment.

- 2026-10-07: owner-approved story «Коли глина повертає до життя: історії Руслана
  Рижка та Сергія Райляна» at /istorii/hlyna-ruslan-ryzhko-serhii-railian/.
  Supplied text/excerpt retained; source «ЕтноЧари» as text because no confirmed
  URL exists in prepared records. No guessed links, dates of injuries, identities
  of mentor, diagnoses or claims of treatment. Publication date is 7 October 2026.
  Four owner images matched by content: working-with-clay montage as custom cover;
  Ruslan portrait and pottery, Serhii pottery inline at the requested positions.
  Sharp WebP quality 88, original 1080x1280 proportions, 465,164 bytes combined,
  no EXIF/XMP/IPTC; embedded captions/text preserved and input originals retained.
  Existing stories schema/Decap cover/body/source fields unchanged. Only the new
  cover uses the existing contain pattern in listing CSS to keep face/hands/cup
  visible within the unchanged 192px card area; other covers remain unchanged.
  Homepage code/Hero/layout unchanged; its existing stories feed adds this entry.
  Existing decorative cover alt model retained, three meaningful inline alts.
  PASS: build/lint/TypeScript/parser; smoke/approved homepage/23-route browser
  checks; desktop/320/390 cover, inline proportions, headings/focus/no overflow;
  actual local Decap stories title/source/cover/three inline images load, fixture
  edit/upload/save/build retains slug/date/source/body and absent URL/video;
  draft/demo excluded. Fixtures removed and localhost proxy stopped.
  No other content, design, OAuth, roles, CI, CSP, noindex or domain changes.
  Publication follows required PR CI, owner merge and automatic Pages deployment.

- 2026-10-07: approved event «День разом: екскурсія до музею Пирогова та пікнік»
  at /podii/den-razom-muzei-pyrohova-piknik/, event date 2026-10-03 displayed as
  «3 жовтня 2026 року», with no invented time/location/identities/medical claims.
  Five unique owner photos received: wide wooden-building group cover plus four
  inline photos (gazebo preparation, forest guitar, picnic food, informal group).
  Cover identified by content, not filename order; full proportions retained.
  Sharp WebP quality 88, 1.28 MiB total, no EXIF/XMP/IPTC; input originals retained.
  Existing events/CMS fields reused except optional imageAlt needed for owner's
  exact accessible cover description. Older covers retain their decorative alt.
  All five assets replaceable through existing CMS cover/body image tools.
  Date-only labels use full Ukrainian year wording; timed events remain unchanged.
  PASS: build/lint/TypeScript/parser, smoke/approved homepage/22-route browser
  tests, 320/390/1600 images/crop/alt/proportions/keyboard/focus/no overflow;
  real Decap load/edit/upload/save fixture preserves date/alt/four inline images,
  absent optionals and draft/demo filtering. Fixtures removed, proxy stopped.
  No homepage/design, other content, OAuth/permissions/CI/CSP/noindex/domain changes.
  Publication uses required PR CI, owner merge and automatic Pages deployment.

- 2026-10-07: approved real event «Голос ветеранів має бути почутий: Андрій
  Петрук виступив на конференції» at /podii/holos-veteraniv-petruk-konferentsiia/.
  Event date is 26 June 2026, not publication date. Existing events schema/Decap
  fields reused; owner-supplied text/description preserved, no invented time,
  conference name, organisers, roles, identities or medical details.
  Actual attachment order differs from numbered descriptions: 1000007754 is the
  wide round-table cover; 1000007755 is the outside inline portrait; 1000007763 is
  the participants inline photo. Only these owner images optimized using Sharp
  WebP quality 88 (174,282/273,002/97,748 bytes), full proportions/no AI/EXIF.
  Originals remain in local attachments; only optimized assets under uploads/events.
  Inline placement/captions/meaningful alt use existing sanitized Markdown.
  Existing decorative cover model and 192px centered listing crop retained.
  Reciprocal Markdown links use verified existing Petruk story slug and new event
  route; both remain CMS-editable. Conference facts/photos attributed to volunteer
  community; Ukrinform linked explicitly as additional biographical context only.
  Minimal formatter convention: UTC midnight represents date-only, displays no
  invented Kyiv 03:00; explicit other timestamps retain time. Documented in CMS.md.
  PASS: build/lint/TypeScript/parser; existing smoke/approved homepage/21-route
  browser checks; 320/390/1600 photos/date/source/keyboard/bidirectional links/no
  overflow or console/CSP errors. Real Decap event loads cover/2 inline photos;
  fixture cover upload/title/description/save/build preserves date-only and links;
  timed fixture still shows 15:00 Kyiv, missing optionals work, draft/demo excluded.
  Fixtures/media removed and localhost proxy stopped. No schema, homepage/layout,
  other collections, OAuth, permissions, CI, CSP, noindex or domain changes.
  Publication follows required PR CI, owner merge and automatic Pages deployment.

- 2026-10-07: approved story «Поезія, написана в полоні: історія морпіха
  Андрія Петрука» at /istorii/poeziia-v-poloni-andrii-petruk/ uses existing stories
  fields and owner-supplied editorial text/excerpt. Source: Alla Miroshnychenko,
  Ukrinform, 25 August 2026; active original link at end. Publication date is separate.
  Only the two owner-provided photographs are published: book portrait as custom
  cover; group photo after fundraising paragraph, neutral caption/alt «Після
  повернення в Україну». Full proportions, Sharp WebP quality 88 (150,832/291,946
  bytes), no EXIF, AI changes, source-photo downloads or original JPEGs in Git.
  Asset-specific contain preserves face/book in existing 192px card frame; article
  cover follows existing decorative-alt model, inline photo has meaningful alt.
  Neutral content note reuses Markdown blockquote; no new warning system/schema.
  No unconfirmed identities/details or event placeholder/link. Future published
  conference event can be linked separately. No other content/schema/CMS/security/
  OAuth/permissions/CI/noindex/domain changes; homepage template/design untouched.
  Existing story feed naturally includes new public content.
  PASS: build/lint/TypeScript/parser, existing smoke/approved homepage visual and
  20-route browser checks, 320/390/1600 cover/inline/focus/source/headings/no overflow,
  no console/CSP errors; real Decap record loads both images/body/source and fixture
  edit/upload/save/build works. Fixtures/media removed; localhost proxy stopped.
  Publication proceeds through PR, required CI, owner merge and Cloudflare Pages.

- 2026-10-07: approved story «Від орендованого гаража до власного технологічного
  центру» at /istorii/vid-orendovanoho-harazha-do-tekhnolohichnoho-tsentru/ uses
  existing stories fields, exact owner-supplied text/quote/excerpt and Andrew Prit
  Facebook source link. No inferred business/service details or extra photos.
  User screenshot cropped deterministically to photograph only (575x660), excluding
  all Facebook/phone UI and mute overlay. Sharp WebP quality 88, 36,274 bytes;
  original screenshot not published, no AI/resize/EXIF retention. Existing custom
  image priority preserved. Only this listing cover gets object-position: 50% 0%;
  article keeps full portrait with contain. Decorative alt follows current model.
  No schema/CMS/security/header/OAuth/CI/domain/noindex changes; other content intact.
  Homepage template/design unchanged; existing story feed naturally includes it.
  PASS: build/lint/TypeScript/parser and existing smoke/approved visual/19-route
  browser checks; cover/source/quote/focus/CSP/console and 320/390/1600 reflow;
  Decap real-record fields/image load plus fixture edit/upload/save/build PASS.
  Fixtures/media removed, loopback proxy stopped. PR/CI/Admin/Pages publication follows.

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
