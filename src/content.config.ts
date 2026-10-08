import { defineCollection, reference } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { youtubeId } from './utils/youtube'

const text = z.string().min(1)
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
const external = z.string().url().startsWith('https://')
const media = z
  .string()
  .refine(
    (v) => (v.startsWith('/') && !v.startsWith('//')) || v.startsWith('https://'),
    'Use a local path or HTTPS URL',
  )
const state = { draft: z.boolean().default(true), demo: z.boolean().default(true) }
const collection = <T extends z.ZodRawShape>(name: string, schema: z.ZodObject<T>) =>
  defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/' + name }), schema })

const pages = collection('pages', z.object({ title: text, description: text, ...state }))
const recovery = collection(
  'recovery',
  z.object({
    title: text,
    slug,
    description: text,
    category: z.enum(['Стабілізаційні вправи', 'Майндфулнес', 'Психологічні рекомендації', 'Психоедукація', 'Творче відновлення']),
    publishedDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: text,
    externalUrl: external.optional(),
    image: media.optional(),
    video: media.optional(),
    audio: media.optional(),
    ...state,
  }),
)
const stories = collection(
  'stories',
  z.object({
    title: text,
    slug,
    excerpt: text,
    image: media.optional(),
    videos: z.array(z.object({
      url: text.refine((value) => Boolean(youtubeId(value)), 'Use a valid HTTPS YouTube share/watch URL'),
    })).default([]),
    source: text.optional(),
    externalUrl: external.optional(),
    publishedDate: z.coerce.date(),
    anonymous: z.boolean().default(true),
    relatedMaterials: z.array(reference('recovery')).default([]),
    ...state,
  }),
)
const films = collection(
  'films',
  z.object({
    title: text,
    year: z.number().int().optional(),
    description: text,
    themes: z.array(text),
    studio: text.optional(),
    author: text.optional(),
    participants: text.optional(),
    videos: z.array(z.object({
      url: text.refine((value) => Boolean(youtubeId(value)), 'Use a valid HTTPS YouTube share/watch URL'),
      title: text.optional(),
      description: text.optional(),
    })).default([]),
    contentWarning: text.optional(),
    poster: media.optional(),
    externalUrl: external.optional(),
    ...state,
  }),
)
const education = collection(
  'education',
  z.object({
    title: text,
    description: text,
    category: z.enum([
      'Навчання',
      'Перекваліфікація',
      'Курси',
      'Програми для ветеранів',
      'Гранти та стипендії',
      'Працевлаштування',
      'Дистанційні професії',
    ]),
    provider: text.optional(),
    externalUrl: external.optional(),
    deadline: z.coerce.date().optional(),
    publishedDate: z.coerce.date(),
    ...state,
  }),
)
const events = collection(
  'events',
  z.object({
    title: text,
    description: text,
    date: z.coerce.date(),
    location: text.optional(),
    online: z.boolean().default(false),
    registrationUrl: external.optional(),
    image: media.optional(),
    imageAlt: text.optional(),
    ...state,
  }),
)
export const collections = { pages, recovery, stories, films, education, events }
