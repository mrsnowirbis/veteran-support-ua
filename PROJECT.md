# PROJECT

Украинский сайт волонтёрского проекта помощи раненым ветеранам.

## PRIMARY LANGUAGE

Ukrainian (uk).

## TARGET AUDIENCE

Ветераны, раненые военнослужащие, их близкие, волонтёры и специалисты.

## CORE PRINCIPLES

- Mobile-first; accessibility first; WCAG 2.2 AA where practical.
- Спокойный современный дизайн; уважительное представление ветеранов; без агрессивной милитаристской стилистики.
- Высокая производительность; минимальный client-side JavaScript.
- Privacy by design; security by default; минимизация персональных данных.

## SITE SECTIONS

Головна; Про нас; Отримати допомогу; Психологічне відновлення; Шлях відновлення;
Кінотерапія; Профорієнтація та освіта; Наші події; Стати волонтером; Як допомогти; Контакти.

## CONTENT ARCHITECTURE

Нативные Astro Content Collections там, где рационально. Пока Markdown и локальные loaders.
Сохранять контракт данных при будущем подключении CMS; frontend не связывать с конкретной CMS.
Черновики не включать в публичную сборку. Не исполнять недоверенный MDX.

## VISUAL IDENTITY

Официальный исходный логотип: public/brand/logo-original.jpg, точная копия C:/Users/mrsno/Pictures/logo-original.jpg.
Не перерисовывать, не обрезать и не менять пропорции/смысл логотипа. Использовать в Header/Footer.
Светлая спокойная основа; синий из логотипа — основной акцент, приглушённый жёлтый — вторичный.
Красный использовать умеренно, не смешивать брендовые акценты с обозначением ошибок.
Подтверждённое название: ГО «Всеукраїнська асоціація психологів травмафокусованої практики».

## SECURITY PRINCIPLES

- Никаких секретов в Git; .env и .env.* не коммитить (кроме безопасного .env.example).
- Минимальные права; dependency auditing; сохранять lockfile; обновлять только для безопасности/совместимости.
- Для будущих форм: server-side validation, rate limiting, anti-spam.
- Security headers; CSP where practical; минимум сторонних scripts.
- Не собирать медицинские документы через публичный сайт.
- Будущие заявки ветеранов хранить отдельно от публичной CMS.
- Не логировать содержимое заявок; не помещать чувствительные данные в analytics.
- Не добавлять production-секреты, trackers, аналитику, платные сервисы без отдельной задачи.

## ACCESSIBILITY

lang="uk"; корректная семантика; keyboard navigation; visible focus; skip navigation;
достаточный контраст; большие touch targets; reduced motion; screen reader compatibility;
украинские сообщения интерфейса; шрифт с украинской кириллицей.
Автоматические проверки не означают подтверждённое соответствие WCAG.

## WORKFLOW FOR FUTURE SESSIONS

READ PROJECT.md → READ STATUS.md → READ ONLY REQUIRED FILES → IMPLEMENT → TEST → UPDATE STATUS.md → STOP.
Не перечитывать весь repository без необходимости. Без незапрошенного refactoring и функций второго этапа.
Не выводить длинные логи. STATUS.md — текущее состояние, не история изменений.

## DEVELOPMENT

Основа: https://github.com/incluud/accessible-astro-starter (MIT; сохранить LICENSE).
Node >=24.19; npm >=11.17. Установка: npm ci. Скрипты установки зависимостей отключены в .npmrc.
Проверки: npm run build; npm run lint; npm audit. Отключать телеметрию Astro переменной ASTRO_TELEMETRY_DISABLED=1.
Статическая сборка; пилот Decap CMS изолирован в /admin/ и управляет только events (docs/CMS.md).
Production authentication ещё не настроен. Backend и активные формы отсутствуют.
До отдельной задачи запуска: example.invalid и noindex; не публиковать.
public/_headers — шаблон для совместимого хостинга, не активные заголовки локального preview.
При выборе хостинга перенести/проверить заголовки, HTTPS/HSTS и CSP; затем настроить реальный домен и OG-изображения.
