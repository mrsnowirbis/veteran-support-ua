# DONE

- Главная приведена к утверждённой композиции: Header поверх художественного Hero, точные тексты/CTA, четыре карточки и «Наша мета» с тремя направлениями.
- Header/Footer: официальный логотип и полное название организации; отдельная ссылка «Статут».
- Предоставленный чистый исходник сохранён без изменений в src/assets/artwork/spirit-of-victory-original.jpg.
- Hero использует public/images/hero-spirit-of-victory.webp: 1672×941, 542294 bytes, quality 88. Astro Image, eager/high priority; один запрос, оригинальный JPG не загружается браузером.
- Заголовки, меню, CTA, карточки и подпись автора — отдельные HTML/CSS-элементы. Локальный светлый gradient обеспечивает читаемость.
- Mobile: вертикальная композиция, картина целиком, подпись под изображением, доступное меню и крупные CTA.
- Responsive polish: mobile Header собран в две естественные строки без наложения элементов; логотип 56 px, полное название, «Статут» и меню сохранены. При 390 px высота Header уменьшена примерно на 33 px.
- Уплотнены только mobile-интервалы Hero: картина начинается примерно на 102 px выше, подпись помещается в первый экран 390×844. Основной текст остаётся над картиной; desktop-композиция, палитра и demo-карточки не изменены.
- Сохранены нижние блоки главной, Content Collections, существующие URL, SEO и отключённая форма.
- Общие blue/gold tokens согласованы с внутренними страницами. Новых зависимостей нет.

# VALIDATION

- Production build (23 страницы), lint и TypeScript: PASS.
- Существующие smoke и browser tests: PASS; 23 маршрута, ссылки/assets, SEO/OG, headings, официальный логотип, disabled form, no-JS navigation.
- Keyboard/skip-link/menu/Escape, focus, reflow и overflow 320–1600 px: PASS. Нет внешних запросов или CSP/JS errors.
- Desktop 1600×900 и mobile 390×844 проверены визуально; исходная художественная композиция сохранена.
- Проверен контраст золотых букв на фактическом фоне при ширинах 390, 950, 1024, 1280, 1350 и 1600: минимум 3.05:1 (крупный текст).
- Финальные screenshots: outputs/homepage-desktop.png, outputs/homepage-mobile.png, outputs/homepage-lower.png.
- После responsive polish повторно выполнены build/lint/TypeScript и все существующие browser tests: PASS; mobile screenshot проверен визуально. Размеры touch targets сохранены (минимум 44 px).

# CURRENT

Финальный responsive polish завершён; ожидается визуальное одобрение пользователя перед следующим этапом.

# IMPORTANT DECISIONS

- Точная HTML-подпись: Олена Біла — «Дух Перемоги / Spirit of Victory», 2025.
- Исходник картины не перерисовывать и не удалять.
- /statut — безопасная страница-заглушка с TODO: настоящий проверенный документ ещё необходимо подключить.
- Поиск не добавлен. CMS/backend/deployment не выполнялись.
- example.invalid + noindex сохранены; форма отключена, CSP и privacy-ограничения сохранены.

# KNOWN ISSUES

- Полный WCAG-аудит/скринридер не выполнены; автоматические проверки не подтверждают полное соответствие WCAG.
- Noto Sans TTF ~2 MB требует будущей оптимизации.

# NEXT TASK

Visual approval before CMS integration.
