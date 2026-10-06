# Контентний редактор Decap

`/admin/` — окремий статичний редактор публічного контенту. Доступні лише **Події,
Історії, Матеріали для відновлення, Кінотерапія, Освіта**. Джерело даних — існуючі
`src/content/{events,stories,recovery,films,education}/*.md`; schemas у `src/content.config.ts`.
Decap 3.16.3 завантажується з закріпленого CDN URL з SRI. Публічний сайт працює без CMS/OAuth.

## Робота редактора

Оберіть колекцію → створіть запис → заповніть українські поля → додайте зображення через
медіатеку та текст у візуальному редакторі → збережіть → передайте на перевірку.
Необов’язкові поля позначені; порожні значення прибираються перед збереженням.
Адреси генеруються автоматично. Наявні файли та адреси історій/матеріалів не перейменовуються.
Пов’язані матеріали історії обираються за назвою; посилання зберігають ID файлу Astro.

Нові записи мають `draft: true`, `demo: false`. Прапорець «Приховати на сайті» відрізняється
від статусу перевірки Decap: навіть після merge чернетка не з’явиться на сайті.
Admin перевіряє зміст, права на media та `draft: false` перед публікацією.
`demo: true` видно лише у dev або збірці з явним `SHOW_DEMO_CONTENT=true`;
звичайна production-збірка виключає demo і draft зі списків, сторінок та пов’язаних матеріалів.
Окремого поля `hidden` у schemas немає — приховування здійснює `draft`.

Картка веде на окрему сторінку з повним текстом. Події показують дату/час за Києвом,
місце, онлайн/офлайн і реєстрацію за наявності. Окремого URL онлайн-зустрічі немає у schema.
Минулі події залишаються в архіві; дата/термін оновлюються при наступній статичній збірці.

## Media

Кожна колекція: `public/uploads/<collection>/` → `/uploads/<collection>/...`.
Усі uploads публічно доступні після build, навіть коли запис ще має `draft: true`.
Обирайте вже завантажене зображення для повторного використання. Обкладинки: JPG/PNG/WebP
до 2 МБ; аудіо/відео матеріалів: до 10 МБ. Це UI-ліміти, а не серверна перевірка.
У «Освіта» schema не має обкладинки; зображення можна вставляти у повний текст.
До зображень у тексті додавайте змістовний альтернативний опис; обкладинка поруч із заголовком декоративна.
Локальні обкладинки та зображення Markdown відображаються після build; зовнішні обкладинки
відкриваються окремим посиланням, без розширення CSP. Для зображень у тексті використовуйте медіатеку.
Аудіо/відео відкриваються посиланням, без сторонніх iframe та автозапуску.

## Ролі та workflow

Production: **Editor → власний fork/PR → review → Admin merge → Astro build → Cloudflare Pages**.
GitHub backend, реальний repo, Open Authoring та editorial workflow підготовлені.
PR #3 підключає production base_url до окремого OAuth Worker; main ще очікує merge.
OAuth App і Worker Secrets налаштовані власником; Worker поки `OAUTH_ENABLED=false` —
[налаштування](../workers/decap-oauth/README.md). Реальний login/E2E ще не перевірено.
Жодних credentials у frontend/Git.

- **Editor:** GitHub-акаунт без write/admin основного repo; лише контентні форми в CMS.
- **Admin:** review/merge, конфігурація, доступи, secrets, структура та системні сторінки.

Це НЕ RBAC Decap: Editor може запропонувати будь-які зміни у власному fork. Admin перевіряє весь
diff: дозволено лише п’ять контентних папок та відповідні uploads. Branch protection вимагає PR
та успішний Cloudflare Pages check. Поки є один довірений Admin, approvals=0: власник сам
перевіряє та merge; Editor не має upstream Write/Merge. З появою другого довіреного Admin/reviewer
повернути approvals=1. Не виконувати PR-код із secrets.
Публічний Open Authoring допускає сторонні PR. Конфігурація передбачає public repo (`public_repo`);
private repo потребує окремого рішення щодо read-доступу, private forks та ширшого scope `repo`.

## Безпека

CMS — тільки публічний контент з дозволом на публікацію. Ніколи не завантажувати звернення
«Отримати допомогу», медичні документи, приватні контакти або інші конфіденційні дані.
Git зберігає історію. Admin перевіряє тип/розмір файлів, EXIF, авторські права та зовнішні посилання;
не приймає HTML/SVG/виконувані файли. Дозволені колекції UI не обмежують файлові права Git.

Markdown очищується під час build наявним sanitize-html: без scripts, event handlers, inline styles,
iframe та небезпечних URL. MDX не використовується. Публічні CSP/headers не змінено.
Admin-only CSP лишається як у пілоті: точний CDN script, `unsafe-eval` для AJV, inline styles,
GitHub API/avatars, blob/data media та loopback proxy. Inline scripts заборонені;
X-Frame-Options DENY/noindex/no-store збережені. Заголовки Cloudflare перевірити після deployment.

## Локальна перевірка

Запустіть `npm run dev -- --host 127.0.0.1`, а в окремому PowerShell з кореня проєкту:

```powershell
$env:BIND_HOST='127.0.0.1'
$env:ORIGIN='http://127.0.0.1:4321'
npx --yes --ignore-scripts decap-server@3.11.3
```

У Astro dev: `http://127.0.0.1:4321/admin/index.html?local=1`.
На статичному хостингу: `/admin/`. Proxy — dev-tool поза залежностями сайту;
`?local=1` працює тільки на localhost/127.0.0.1. Він без auth пише у робочі файли,
тому не відкривати LAN/інтернету. Локальна кнопка «Опублікувати» лише зберігає файл;
PR/review тут не відтворюються. Ctrl+C зупиняє proxy; тестові записи видаляти до commit.

## Deployment TODO

Послідовність GitHub → Pages → OAuth, параметри builder та rollback: [DEPLOYMENT.md](DEPLOYMENT.md).

1. Визначити repository/видимість/main, акаунти та fork policy; увімкнути protections/CODEOWNERS.
2. Налаштувати GitHub OAuth App і перевірений broker для Cloudflare (Worker/Pages Functions або
   підтримуваний зовнішній сервіс). Secret — лише у hosting secrets; перевірити state/CSRF,
   точні callback/origin/postMessage та доступ до repo; не логувати токени.
3. Замінити repo/auth placeholders; підключити Pages: `npm run build`, output `dist`, Node з package.json.
   Не задавати `SHOW_DEMO_CONTENT=true` у production. Домен/SEO/noindex — окремий етап запуску.
4. Перевірити двома акаунтами Editor create/edit/upload/PR та Admin review/merge, відмову Editor
   в прямому записі, конфлікти редагування, build після merge, media, HTTPS та фактичну CSP.

Офіційні джерела: [GitHub](https://decapcms.org/docs/github-backend/),
[Open Authoring](https://decapcms.org/docs/open-authoring/), [workflow](https://decapcms.org/docs/editorial-workflows/),
[OAuth](https://decapcms.org/docs/external-oauth-clients/), [local proxy](https://decapcms.org/docs/decap-proxy/),
[rich text Markdown](https://decapcms.org/docs/widgets/markdown/), [relations](https://decapcms.org/docs/widgets/relation/).
