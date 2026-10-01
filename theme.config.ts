import { defineThemeConfig } from './src/utils/defineThemeConfig'

export default defineThemeConfig({
  name: 'Підтримка ветеранів',
  id: 'veteran-support',
  logo: null,
  seo: {
    title: 'Підтримка ветеранів',
    description: 'Волонтерський проєкт допомоги пораненим ветеранам та їхнім близьким.',
    image: null,
  },
  colors: {
    primary: '#245c50',
    secondary: '#245c50',
    neutral: '#64748b',
    outline: '#174ea6',
  },
  navigation: {
    darkmode: false,
    items: [{ type: 'link', label: 'Головна', href: '/' }],
  },
  socials: [],
})
