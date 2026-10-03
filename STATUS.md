# DONE

- Checkpoint дизайна 21ca854 сохранён: Hero, Header/Footer, mobile, тексты и нижние demo-карточки не изменены.
- Этап 4A: отдельный статический /admin/, Decap CMS 3.16.3 с закреплённым CDN URL и SRI.
- Подключена только events: существующие src/content/events/*.md, все поля schema и имеющееся тело Markdown.
- Schema, Content Collections, публичные маршруты, SEO, /statut и отключённая форма не изменены.
- Media: public/uploads/events/ → /uploads/events/. Исходник Hero и авторство сохранены.
- Подготовлен GitHub editorial workflow + Open Authoring. Production login блокируется до замены repo/OAuth placeholders.
- Локальный режим — явный ?local=1 только на localhost/127.0.0.1, официальный decap-server 3.11.3 без npm-зависимостей проекта.
- docs/CMS.md описывает редакторский процесс, настоящие ограничения ролей и deployment.

# VALIDATION

- Финальные production build (23 публичные страницы + статический admin), lint, TypeScript: PASS.
- Через настоящий Decap UI и loopback proxy: прочитаны существующие события, создан временный event,
  загружено PNG, изменён description, запись сохранена и повторно открыта: PASS.
- ISO date, boolean defaults, отсутствие пустых optional keys, Markdown body и media URL: PASS.
- Fixture, созданный CMS, прошёл Astro schema/build; draft не попал на сайт, media скопировано в dist.
- Fixture и его изображение удалены; финальная сборка без тестовых данных: PASS. Proxy остановлен.
- GitHub/editorial/Open Authoring config прошёл валидацию Decap; login UI проверен с тестовой подстановкой
  placeholders. Реальный OAuth, PR/merge, несколько аккаунтов и Cloudflare ещё не проверены.
- Существующие smoke/browser tests 23 публичных маршрутов: PASS. Admin исключён из публичного SEO-теста
  и проверен отдельно. Lint дополнительно охватил public/admin/admin.js.
- Desktop 1600×900 и mobile 390×844 проверены визуально: дизайн сохранён; keyboard/reflow/overflow PASS.
- Другие коллекции, package.json и lockfile не изменены. Секреты не добавлены.

# SECURITY / DECISIONS

- CMS только для публичного контента: никаких обращений, медицинских или персональных данных в Git.
- Editor не получает write/admin основного repo; изменения — fork/PR, merge делает Admin в GitHub.
  Это не RBAC Decap: редактор может предложить любой diff из fork; нужны review и branch protection.
- GitHub repo/видимость, аккаунты, домен, OAuth broker и secrets на хостинге ещё не предоставлены.
- Публичные security headers/CSP сохранены. Только /admin/* снимает унаследованную HTTP CSP и использует
  раннюю meta CSP; X-Frame-Options DENY сохранён. Admin-only unsafe-eval нужен AJV, inline styles — Decap,
  blob connect — upload; необходимость проверена браузером. Inline scripts запрещены.
- Статический сайт не импортирует CMS и продолжает работать при недоступности CMS/CDN/OAuth.
- /statut остаётся заглушкой; example.invalid + noindex сохранены; CMS/backend форм и deployment не выполнялись.

# KNOWN LIMITS

- В текущем публичном списке events image/body не выводятся: данные сохраняются, UI не менялся.
- Local proxy без auth пишет в рабочие файлы и не поддерживает editorial workflow; не использовать для команды/production.
- Полный WCAG-аудит/скринридер не выполнены; Noto Sans TTF ~2 MB требует будущей оптимизации.
- При deployment проверить роли реальными аккаунтами, OAuth, protections, media и фактическую CSP Cloudflare.

# NEXT TASK

Manual CMS UX approval before enabling remaining collections.
