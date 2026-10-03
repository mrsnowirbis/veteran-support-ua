/* No public page imports this file. Never put credentials here. */
window.CMS_MANUAL_INIT = true

window.addEventListener('DOMContentLoaded', async () => {
  const status = document.getElementById('cms-status')
  const message = document.getElementById('cms-message')
  try {
    if (!window.CMS) throw new Error('Не вдалося завантажити Decap CMS. Спробуйте ще раз пізніше.')
    const response = await fetch('/admin/config.yml', { cache: 'no-store' })
    if (!response.ok) throw new Error('Не вдалося завантажити конфігурацію редактора.')
    const configText = await response.text()
    const local = ['localhost', '127.0.0.1'].includes(location.hostname) &&
      new URLSearchParams(location.search).get('local') === '1'
    if (!local && (configText.includes('REPLACE_OWNER/REPLACE_REPO') || configText.includes('https://auth.example.invalid'))) {
      message.textContent = 'Пілот підготовлено. Вхід буде доступний після налаштування GitHub та OAuth адміністратором. Локальна перевірка описана в docs/CMS.md.'
      return
    }
    // Decap emits empty optional strings; Astro expects these keys to be absent.
    window.CMS.registerEventListener({
      name: 'preSave',
      handler: ({ entry }) => {
        let data = entry.get('data')
        for (const field of ['location', 'registrationUrl', 'image']) {
          const value = data.get(field)
          if (value == null || (typeof value === 'string' && !value.trim())) data = data.delete(field)
        }
        return data
      },
    })
    if (local) {
      document.title = 'Локальні події — зміни у робочих файлах'
      window.CMS.init({ config: {
        backend: { name: 'git-gateway', open_authoring: false },
        local_backend: { url: 'http://127.0.0.1:8081/api/v1' },
        publish_mode: 'simple',
      } })
    } else {
      window.CMS.init()
    }
    status.hidden = true
  } catch (error) {
    message.textContent = error.message
  }
})
