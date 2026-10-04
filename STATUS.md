# DONE

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
- Внешние ресурсы/аккаунты не созданы, push/deployment/OAuth не выполнялись, credentials не создавались.

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

- Нужны реальный repository/visibility, аккаунты Admin/Editor/reviewer, Cloudflare account и domain/DNS.
- CI/required checks/CODEOWNERS/branch protection ещё не настроены. Локальные browser tests находятся
  в ignored work/ и не являются готовым GitHub CI. Для Admin PR требуется другой доверенный reviewer.
- OAuth App/broker/secrets отсутствуют; production Decap сохраняет безопасные repo/auth placeholders.
- Чистая установка в Linux Pages, реальные redirect/headers/TLS/OAuth/два аккаунта/rollback не проверены.
- example.invalid, noindex/nofollow и /statut placeholder остаются до отдельного согласованного запуска.
- Локальная новость src/content/events/2026-10-03-.md и пять JPG в public/uploads/events/ не коммитились;
  сохранены без изменений. До push отдельно решить, какие материалы включать. Attachments не добавлять.
- Даты/сроки контента обновляются при build. Полный WCAG-аудит не выполнялся.

# NEXT TASK

Production deployment after repository and account details are available.
