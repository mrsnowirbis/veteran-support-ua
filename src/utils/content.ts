import { getCollection } from 'astro:content'
// Demo content is opt-in for static previews; production excludes it by default.
export const visibleContent = ({ data }: { data: { draft: boolean; demo: boolean } }) =>
  !data.draft && (!data.demo || import.meta.env.DEV || import.meta.env.SHOW_DEMO_CONTENT === 'true')
export const contentPath = (section: string, id: string) =>
  '/' + section + '/' + id.split('/').map(encodeURIComponent).join('/')
export const localMedia = (value?: string) =>
  !!value && /^\/(?![\\/])/.test(value) && !value.includes('\\') && [...value].every((char) => char.charCodeAt(0) > 31)
export const dateTimeLabel = (date: Date) =>
  new Intl.DateTimeFormat('uk-UA', { dateStyle: 'long', timeStyle: 'short', timeZone: 'Europe/Kyiv' }).format(date) + ' (Київ)'
export const dateLabel = (date: Date) =>
  new Intl.DateTimeFormat('uk-UA', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Kyiv' }).format(
    date,
  )
// Static output: date-based states refresh on each build.
export const splitEvents = <T extends { data: { date: Date } }>(items: T[], now = new Date()) => ({
  upcoming: items.filter((item) => item.data.date >= now).sort((a, b) => +a.data.date - +b.data.date),
  past: items.filter((item) => item.data.date < now).sort((a, b) => +b.data.date - +a.data.date),
})
export const isExpired = (deadline?: Date, now = new Date()) => !!deadline && deadline < now
export async function loadContent() {
  const [recovery, stories, films, education, events] = await Promise.all([
    getCollection('recovery', visibleContent),
    getCollection('stories', visibleContent),
    getCollection('films', visibleContent),
    getCollection('education', visibleContent),
    getCollection('events', visibleContent),
  ])
  return { recovery, stories, films, education, events }
}
