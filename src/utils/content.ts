import { getCollection } from 'astro:content'
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
    getCollection('recovery', ({ data }) => !data.draft),
    getCollection('stories', ({ data }) => !data.draft),
    getCollection('films', ({ data }) => !data.draft),
    getCollection('education', ({ data }) => !data.draft),
    getCollection('events', ({ data }) => !data.draft),
  ])
  return { recovery, stories, films, education, events }
}
