import { getPostData, Language } from '@/lib/content'
import { notFound } from 'next/navigation'
import { Mdx } from './Mdx'

interface ContentPageProps {
  slug: string
  language: Language
}

export default async function ContentPage({
  slug,
  language,
}: ContentPageProps) {
  const postData = await getPostData(language, slug)

  if (!postData) {
    notFound()
  }

  return (
    <article className="document-driven-page">
      <Mdx source={postData.content} />
    </article>
  )
} 