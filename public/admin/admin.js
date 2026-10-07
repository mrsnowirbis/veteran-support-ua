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
        for (const field of ['location', 'registrationUrl', 'image', 'updatedDate', 'video', 'audio', 'contentWarning', 'poster', 'externalUrl', 'provider', 'deadline', 'year', 'studio', 'author', 'participants']) {
          const value = data.get(field)
          if (value == null || (typeof value === 'string' && !value.trim())) data = data.delete(field)
        }
        if (data.has('videos')) {
          data = data.update('videos', (videos) => videos?.map((video) => {
            for (const field of ['title', 'description']) {
              const value = video.get(field)
              if (value == null || (typeof value === 'string' && !value.trim())) video = video.delete(field)
            }
            return video
          }) ?? [])
        }
        // Preserve existing public URLs. New stories/materials receive a stable ASCII URL.
        if (data.has('slug') && !data.get('slug')) {
          const letters = { а:'a', б:'b', в:'v', г:'h', ґ:'g', д:'d', е:'e', є:'ye', ж:'zh', з:'z', и:'y', і:'i', ї:'yi', й:'y', к:'k', л:'l', м:'m', н:'n', о:'o', п:'p', р:'r', с:'s', т:'t', у:'u', ф:'f', х:'kh', ц:'ts', ч:'ch', ш:'sh', щ:'shch', ь:'', ю:'yu', я:'ya' }
          const stem = [...data.get('title', '').toLowerCase()].map((letter) => letters[letter] ?? letter).join('')
            .normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 70).replace(/-+$/g, '')
          data = data.set('slug', (stem || 'material') + '-' + crypto.randomUUID().slice(0, 8))
        }
        if (data.has('relatedMaterials') && !data.get('relatedMaterials')) data = data.set('relatedMaterials', [])
        return data
      },
    })
    if (local) {
      document.title = 'Локальний редактор — зміни у робочих файлах'
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
