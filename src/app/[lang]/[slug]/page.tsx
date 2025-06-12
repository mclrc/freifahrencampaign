import { getAllPostSlugs } from '@/lib/content'
import ContentPage from '@/components/ContentPage'
import { notFound } from 'next/navigation'

interface PageProps {
  params: { 
    lang: 'de' | 'en'
    slug: string 
  }
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  const languages = ['de', 'en']

  const params = languages.flatMap((lang) =>
    slugs
      .map((slug) => ({
        lang: lang,
        slug: slug,
      }))
  )
  
  return params
}

export default async function Page({ params }: PageProps) {
  const { lang, slug } = await params

  if (!['de', 'en'].includes(lang)) {
    return notFound()
  }
  
  return <ContentPage language={lang} slug={slug} />
} 