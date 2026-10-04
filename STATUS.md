# DONE

- Этап 4B поверх 5f03557: Decap управляет events, stories, recovery, films, education.
  Существующие Astro schemas и Markdown остаются единственным источником; новых зависимостей нет.
- Украинские формы, визуальный редактор текста, media upload, выбор связанных материалов по названию.
  Optional-поля очищаются перед сохранением; новые slug историй/материалов генерируются автоматически,
  существующие URL сохраняются. Новые записи: draft=true, demo=false.
- Events: карточка/список → отдельная страница с изображением, датой/временем (Киев), местом,
  online/offline, registration URL, описанием и полным Markdown. Optional-поля обрабатываются.
- Stories/recovery используют общий безопасный вывод; films/education получили отдельные страницы.
  Обложки, даты, автор, предупреждения, связанные материалы и предусмотренные schema ссылки отображаются.
- Media разделены по public/uploads/{events,stories,recovery,films,education}; education — изображения в body,
  без добавления отсутствующего в schema поля обложки. Внешние обложки открываются ссылкой, CSP сохранена.
- Draft исключены всегда; demo — только в dev/явной preview-сборке SHOW_DEMO_CONTENT=true с маркировкой.
  Production по умолчанию исключает demo из списков, страниц и связанных материалов.
- Утверждённые Hero/Header/Footer, artwork/attribution, главные карточки, mobile layout, палитра,
  системные страницы и отключённая форма сохранены. Homepage изменён только ранее согласованной
  условной demo-пометкой события; нижние demo-тексты не редактировались.
- docs/CMS.md и PROJECT.md актуализированы. Production auth/deployment не включены.

# VALIDATION

- Реальный локальный Decap + существующий loopback proxy: создание и сохранение всех пяти коллекций,
  rich text, украинские имена файлов, автогенерация schema slug, image upload events/stories/recovery/films,
  пустые optional-поля: PASS. Сохранённые через CMS файлы прошли Astro build и public rendering.
- Дополнительные временные fixtures всех коллекций: полные/минимальные поля, изображения (включая
  education body), Markdown, internal/external links, даты, draft/demo, related filtering: PASS.
- Вредоносные HTML/scripts/event handlers/iframe/javascript URL удаляются при сборке: PASS.
- С fixtures проверены 31 маршрут, SEO/canonical/OG, ссылки/media, 320/375/768/1280, keyboard/no-JS,
  отсутствие overflow, внешних загрузок, ошибок CSP/JS: PASS. Все fixtures и их uploads удалены.
- Финальные build (16 локальных public routes), lint (включая admin.js), TypeScript: PASS.
- Существующие smoke/browser tests: PASS; preview с demo — 37 маршрутов, production — 16.
- Desktop/mobile visual check и approved-visual: PASS, точные Hero-текст/подпись, 4 карточки,
  3 направления миссии, reflow 320–1600, eager Hero. Снимки в ignored outputs/.
- /admin/ static smoke/config и local UX: PASS. Production login остаётся заблокирован placeholders.
- Schemas, package/lockfile, публичные и admin CSP, утверждённые assets не изменены; secrets не добавлены.

# SECURITY / LIMITS

- CMS только для публичного контента. Никогда не хранить обращения, медицинские или приватные данные в Git.
  Все uploads доступны публично после build, включая uploads черновиков; Git сохраняет историю.
- Markdown очищается существующим sanitize-html при build; MDX/iframe не используются.
  Изображения Markdown — из локальной медиатеки; небезопасные ссылки удаляются.
- Editor без write/admin основного repo → fork/PR; Admin проверяет весь diff и делает merge.
  Это не RBAC Decap. Нужны реальные branch protection/CODEOWNERS и двухаккаунтная проверка при deployment.
- Repo/domain/hosting/OAuth ещё не предоставлены. Public repo scope public_repo; private требует отдельного решения.
  OAuth broker/secrets/callback/origin и Cloudflare headers нужно настроить и проверить отдельно.
- Local proxy без auth пишет рабочие файлы; только 127.0.0.1, ?local=1, simple workflow без PR/review.
  Существующая среда 127.0.0.1:4321 и proxy :8081 сохранены. В Astro dev: /admin/index.html?local=1.
- Даты событий/сроки рассчитываются при build; обновлять сборку для актуального разделения по времени.
- Локальная новость src/content/events/2026-10-03-.md и пять ранее загруженных JPG сохранены;
  в commit инфраструктуры CMS не включены. Теперь локально доступны image/body новости.
- /statut placeholder, example.invalid/noindex, отключённая форма остаются. Полный WCAG-аудит не выполнялся.

# NEXT TASK

Production repository, Cloudflare Pages and GitHub/OAuth setup.
