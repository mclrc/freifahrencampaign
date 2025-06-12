import Layout from '@/components/Layout'
import { getNavigationData } from '@/lib/content'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return [{ lang: 'de' }, { lang: 'en' }]
}

export default async function LanguageLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: 'de' | 'en' }>
}) {
  const { lang } = await params

  if (!['de', 'en'].includes(lang)) {
    notFound()
  }

  const navItems = getNavigationData(lang)
  const altLang = lang === 'de' ? 'en' : 'de'
  const altNavItems = getNavigationData(altLang)
  
  return (
    <Layout language={lang} navItems={navItems} altNavItems={altNavItems}>
      {children}
    </Layout>
  )
} 