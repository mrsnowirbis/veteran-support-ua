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

## Кінотерапія: документальні цикли

Один запис може містити кілька відео у списку «Серії / відео». Вставте HTTPS-посилання
YouTube; назву й опис серії можна залишити порожніми та доповнити пізніше. Нумерація
відповідає порядку списку. Студія, авторство, учасники та рік — необов'язкові;
публікуйте лише підтверджені відомості. Невідомий рік не заповнювати.

«Донбаський синдром» підготовлено за підтвердженими власником даними: студія «Віател»,
фільм Сергія Волкова, чотири серії. Назви/описи серій, рік та імена учасників не вигадані.
YouTube-плеєр видимий одразу, без проміжної кнопки; iframe і пряме посилання працюють без JavaScript.
Вбудовування — через `youtube-nocookie`, без autoplay, з lazy loading та responsive 16:9. Прев'ю з YouTube
не копіюються в Git. Плеєр завантажує їх безпосередньо з YouTube. URL перевіряє schema, iframe створює лише
довірений Astro-компонент; iframe у Markdown залишається забороненим.

Video ID чутливий до регістру. Підтверджені ID серій 1–4:
`JWTZF3lM4PM`, `4V2dj40tKY4`, `aZUTd7QV3dU`, `o3ISSODPPO8`.
У першому ID — мала латинська `l`, у третьому — велика `U` наприкінці.

## Відновлення: відеоматеріали

Поле «Відео / посилання YouTube» зберігає наявне `video`: оберіть URL і вставте
HTTPS-посилання з YouTube, або завантажте файл. YouTube показується тим самим
перевіреним nocookie/lazy-компонентом, інші медіа залишаються посиланнями.
«Авторство / джерело», «Сайт джерела», заголовок, короткий опис і повний текст
редагуються у CMS. Примітку про інформаційний характер залишайте у повному тексті.
Новий URL джерела необов'язковий. Довільні iframe/HTML з редактора не дозволені.

«Обкладинка» використовує наявне поле `image` і має пріоритет у картках відновлення.
Якщо обкладинки немає, але є коректний YouTube URL — картка завантажує `hqdefault.jpg`
безпосередньо з `i.ytimg.com`, без копіювання у Git. За відсутності обох або помилки
thumbnail залишається декоративний фон. Це зображення, не додатковий плеєр.
У «Кінотерапія» необов'язкова «Обкладинка» використовує наявне поле `poster`.
Без неї картка автоматично бере thumbnail першого відео (`videos[0]`), у порядку
редактора. Додаткові серії не впливають на обкладинку; без відео залишається
декоративний фон. Власна обкладинка завжди має пріоритет. Механізм спільний із
відновленням і працює для нових записів без змін коду; головна не змінюється.

## Історії: відео та джерело

«Обкладинка» — наявне поле `image`. Без неї картка використовує thumbnail першого
запису у необов'язковому списку «Відео YouTube»; без відео залишається декоративний
фон. Плеєри на сторінці використовують спільний nocookie/lazy-компонент, без autoplay.
Заголовок, короткий вступ, дата публікації, повний текст, джерело та HTTPS URL джерела
редагуються у CMS. Дату першоджерела вказуйте окремо в тексті, не замість дати публікації.
Обкладинки не копіюються з YouTube до Git; iframe з Markdown не дозволені.
«Memoria 13» містить затверджений власником редакційний текст і посилання UNITED24 Media;
це атрибуція джерела, без твердження про партнерство.

## Media

Кожна колекція: `public/uploads/<collection>/` → `/uploads/<collection>/...`.
Усі uploads публічно доступні після build, навіть коли запис ще має `draft: true`.
Обирайте вже завантажене зображення для повторного використання. Обкладинки: JPG/PNG/WebP
до 2 МБ; аудіо/відео матеріалів: до 10 МБ. Це UI-ліміти, а не серверна перевірка.
У «Освіта» schema не має обкладинки; зображення можна вставляти у повний текст.
До зображень у тексті додавайте змістовний альтернативний опис; обкладинка поруч із заголовком декоративна.
Локальні обкладинки та зображення Markdown відображаються після build; зовнішні обкладинки
відкриваються окремим посиланням, без розширення CSP. Для зображень у тексті використовуйте медіатеку.
Аудіо й відеофайли відкриваються посиланням; підтверджені YouTube share/watch URL
у `recovery.video` показують nocookie-плеєр без автозапуску.

## Ролі та workflow

Production: **Editor → власний fork/PR → review → Admin merge → Astro build → Cloudflare Pages**.
GitHub backend, реальний repo, Open Authoring та editorial workflow працюють у production.
PR #3 підключив production base_url до окремого OAuth Worker.
OAuth App і Worker Secrets налаштовані власником; Worker увімкнено (`OAUTH_ENABLED=true`) —
[налаштування](../workers/decap-oauth/README.md). Admin підтвердив login і всі п’ять колекцій.
Editor `redaktor111` створив TEMP event через CMS/fork/PR #4; CI PASS → Admin approval/merge →
успішний Cloudflare deployment → запис і Markdown видно на сайті. Cleanup — Git PR #6,
обов’язковий CI → merge → повторний deployment. Це перевірка текстового запису без media.
Жодних credentials у frontend/Git.

- **Editor:** GitHub-акаунт без write/admin основного repo; лише контентні форми в CMS.
- **Admin:** review/merge, конфігурація, доступи, secrets, структура та системні сторінки.

Це НЕ RBAC Decap: Editor може запропонувати будь-які зміни у власному fork. Admin перевіряє весь
diff: дозволено лише п’ять контентних папок та відповідні uploads. Branch protection вимагає PR
та успішний `PR CI` від GitHub Actions. Поки є один довірений Admin, approvals=0: власник сам
перевіряє та merge; Editor не має upstream Write/Merge. З появою другого довіреного Admin/reviewer
повернути approvals=1. Не виконувати PR-код із secrets.
CI: Node 24.19.0, npm ci, build/lint/TypeScript; лише contents: read, без secrets/deployment.
Перший fork workflow може вимагати разового Admin approval після перевірки diff.
Cloudflare не збирає fork previews; production deployment автоматично виконується після merge.
Публічний Open Authoring допускає сторонні PR. Конфігурація передбачає public repo (`public_repo`);
private repo потребує окремого рішення щодо read-доступу, private forks та ширшого scope `repo`.

## Безпека

CMS — тільки публічний контент з дозволом на публікацію. Ніколи не завантажувати звернення
«Отримати допомогу», медичні документи, приватні контакти або інші конфіденційні дані.
Git зберігає історію. Admin перевіряє тип/розмір файлів, EXIF, авторські права та зовнішні посилання;
не приймає HTML/SVG/виконувані файли. Дозволені колекції UI не обмежують файлові права Git.

Markdown очищується під час build наявним sanitize-html: без scripts, event handlers, inline styles,
iframe та небезпечних URL. MDX не використовується. Лише `/kinoterapiia/*` отримує
`frame-src https://www.youtube-nocookie.com`; meta CSP дозволяє цей host лише матеріалам
із відео. Решта публічної CSP та admin CSP збережені. iframe передає тільки origin через
`strict-origin-when-cross-origin`, як вимагає [YouTube](https://developers.google.com/youtube/terms/required-minimum-functionality#api-client-identity-and-credentials).
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

1. Підключити custom domain; DNS/TLS/SEO/noindex змінювати окремим погодженим етапом.
2. З появою другого довіреного Admin/reviewer повернути approvals=1.
3. За потреби окремо перевірити production media/складне форматування та конфлікти редагування;
   цей E2E тест використовував простий Markdown без зображень. Не задавати SHOW_DEMO_CONTENT=true.

Офіційні джерела: [GitHub](https://decapcms.org/docs/github-backend/),
[Open Authoring](https://decapcms.org/docs/open-authoring/), [workflow](https://decapcms.org/docs/editorial-workflows/),
[OAuth](https://decapcms.org/docs/external-oauth-clients/), [local proxy](https://decapcms.org/docs/decap-proxy/),
[rich text Markdown](https://decapcms.org/docs/widgets/markdown/), [relations](https://decapcms.org/docs/widgets/relation/).
