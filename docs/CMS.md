# Decap CMS — пилот events

`/admin/` — отдельное статическое приложение редактора, только для публичных событий.
Decap 3.16.3 загружается с закреплённого CDN URL с SRI; npm-зависимости сайта не добавлены.
Сбой CMS/CDN/OAuth не влияет на уже опубликованный сайт. Другие коллекции не подключены.

## Данные и workflow

Единственный источник — `src/content/events/*.md`, schema — `src/content.config.ts`.
В UI доступны существующие title, description, date, location, online, registrationUrl,
image, draft, demo и тело Markdown (`body`, не дополнительное поле frontmatter).
Пустые необязательные строки удаляются перед сохранением; schema не изменена.
Дата сохраняется как ISO с часовым смещением; редактор показывает часовой пояс устройства.
Имена новых файлов генерируются; существующие файлы не переименовывать.

Production: создать/изменить → сохранить draft → Ready to Review → Admin проверяет PR
и объединяет в `main` через GitHub → Cloudflare Pages выполняет Astro build.
Статус CMS и `draft` в Markdown различаются: даже после merge `draft: true` скрывает событие.
Admin перед публикацией проверяет `draft: false`, правильность `demo`, даты, ссылок и прав на media.
Новые события по умолчанию скрыты и помечены demo. Удаление записей из UI отключено.
Markdown body сохраняется, но нынешний список событий выводит description; image также
предусмотрено schema, однако текущий UI его не выводит. Дизайн на этом этапе не меняется.

## Роли и authentication

Подготовлен GitHub backend + editorial_workflow + Open Authoring. Production login пока
заблокирован проверкой placeholder: remote, домен и OAuth ещё не настроены. Не вводите токены в код.

- **Editor:** GitHub-аккаунт без write/admin-доступа к основному репозиторию. В CMS только events
  и их media; изменения идут в собственный fork, затем PR. Самостоятельной публикации нет.
- **Admin:** владелец основного репозитория; проверка/merge, конфигурация, доступы, secrets и структура.

Это не встроенный RBAC Decap. Поля/коллекции UI не являются границей безопасности Git.
Editor может менять любые файлы своего fork и предлагать любые diff; в основной репозиторий
они попадают только после проверки Admin. Не выдавать редакторам обычный repository write.
Защитить main: обязательный PR, проверка Admin/CODEOWNERS, актуальное одобрение и успешный build;
отдельно проверять, что контентный PR меняет только events и их uploads. Состав CODEOWNERS и
правила настраиваются после выбора реальных аккаунтов. Не выполнять недоверенные PR с secrets.
Open Authoring не является системой приглашений: публичный repo может получать посторонние PR.

Текущая конфигурация рассчитана на public repo (`public_repo`). Для private нужны read-доступ,
разрешённые private forks и `auth_scope: repo`; это более широкие права OAuth, решение принимает Admin.
Если fork-модель неприемлема, нужен отдельно согласованный gateway с серверной авторизацией;
не заменять его широкими правами Editor. Git не ограничивает write-доступ одной папкой.

На Cloudflare потребуется GitHub OAuth App и отдельный проверенный OAuth broker
(Pages Functions/Worker либо внешний сервис из документации Decap). Пока ничего не развёрнуто.
Client secret — только в secrets хостинга. Проверить state/CSRF, точные callback/origin и
postMessage origin, allowlist репозитория/доступов; не логировать токены. Секреты не в frontend.

## Media и безопасность

`public/uploads/events/` → Markdown `/uploads/events/name.webp` → тот же URL после build.
Выбирать существующее изображение при повторном использовании. Для поля image UI-лимит 2 МБ; предпочтительны
JPG/PNG/WebP. Лимит/подсказка не заменяют проверку Admin: тип файла, размер, EXIF и права автора.
Не загружать HTML/SVG, документы, персональные/медицинские сведения или обращения за помощью.
Git хранит историю, удаление записи не стирает опубликованные данные из истории.

Публичная CSP сохранена. Только `/admin/*` снимает унаследованную HTTP CSP в `_headers`:
ранняя meta CSP admin разрешает точный CDN script с SRI, inline styles Decap, GitHub API,
GitHub avatars/raw images и blob/data image preview; `connect-src blob:` нужен чтению upload.
Inline scripts не разрешены.
`unsafe-eval` нужен валидатору конфигурации Decap (AJV): необходимость подтверждена
browser-проверкой; исключение действует только в admin.
Loopback connect 127.0.0.1:8081 нужен локальному proxy; код включает его только на localhost
с `?local=1`. X-Frame-Options DENY, nosniff, no-referrer остаются; admin noindex/no-store.
Проверить фактические заголовки Cloudflare после deployment: Astro dev не применяет `_headers`.

## Локальный UX-пилот (только Admin/разработчик)

Запустить сайт и из корня проекта отдельный терминал PowerShell:

```powershell
$env:BIND_HOST='127.0.0.1'
$env:ORIGIN='http://127.0.0.1:4321'
npx --yes --ignore-scripts decap-server@3.11.3
```

Открыть `http://127.0.0.1:4321/admin/?local=1`. Proxy — вспомогательный dev-tool,
не зависимость сайта; может потребоваться первоначальная загрузка npm. Остановить Ctrl+C после работы.
Он без аутентификации пишет прямо в рабочие файлы: не выставлять в LAN/интернет и не давать
редакторам как production-сервис. Editorial workflow локально не поддерживается: используется
simple save, без PR/merge. Кнопка «Опублікувати» здесь записывает локальные файлы, не публикует сайт.
Проверять только временные события с draft=true; удалить fixtures до commit.

## Deployment TODO

1. Подтвердить GitHub repo/видимость, main, аккаунты и ограничения forks; настроить защиты ветки.
2. Настроить OAuth broker и секреты; заменить repo/base_url/auth_endpoint в config.yml.
3. Подключить Pages к main: build `npm run build`, output `dist`, совместимая Node из package.json.
4. Проверить два реальных аккаунта: Editor create/edit/upload/review; Admin review/merge;
   отказ Editor в публикации/изменении основного кода. Проверить одновременное редактирование и конфликты.
5. Проверить HTTPS, CSP/redirect `/admin` → `/admin/`, popup login/logout, media URL и сборку после merge.
   Домен/SEO/noindex менять только отдельным этапом запуска. Остальные коллекции не включать.

Официальные источники: [установка](https://decapcms.org/docs/install-decap-cms/),
[GitHub](https://decapcms.org/docs/github-backend/), [Open Authoring](https://decapcms.org/docs/open-authoring/),
[workflow](https://decapcms.org/docs/editorial-workflows/), [OAuth](https://decapcms.org/docs/external-oauth-clients/),
[local proxy](https://decapcms.org/docs/decap-proxy/), [Cloudflare headers](https://developers.cloudflare.com/pages/configuration/headers/).
