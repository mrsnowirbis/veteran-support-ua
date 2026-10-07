/** Accept share/watch URLs only; never use an editor-provided URL as iframe src. */
export function youtubeId(value: string): string | undefined {
  if (/[\s\\]/u.test(value)) return undefined
  try {
    const url = new URL(value)
    if (url.protocol !== 'https:' || url.username || url.password || url.port) return undefined
    let id: string | null = null
    if (url.hostname === 'youtu.be') {
      id = /^\/([A-Za-z0-9_-]{11})\/?$/.exec(url.pathname)?.[1] ?? null
    } else if (['youtube.com', 'www.youtube.com', 'm.youtube.com'].includes(url.hostname) && url.pathname === '/watch') {
      if (url.searchParams.getAll('v').length !== 1) return undefined
      id = url.searchParams.get('v')
    }
    return id && /^[A-Za-z0-9_-]{11}$/.test(id) ? id : undefined
  } catch {
    return undefined
  }
}
