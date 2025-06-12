import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const pagesDirectory = path.join(process.cwd(), 'content/pages')
const mdxDirectory = path.join(process.cwd(), 'content/mdx')

export interface PostData {
  slug: string
  title: string
  bannerImage?: string
  content: string
}

export interface NavItem {
  slug: string
  title: string
  path: string
  position?: number
}

export type Language = 'de' | 'en'

export async function getPostData(language: Language, slug: string): Promise<PostData | null> {
  try {
    const fullPath = path.join(pagesDirectory, `${slug}.json`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const data = JSON.parse(fileContents)
    const langData = data[language]

    if (!langData || !langData.mdxPath) {
      return null
    }

    const mdxFilePath = path.join(mdxDirectory, langData.mdxPath)
    const mdxFileContents = fs.readFileSync(mdxFilePath, 'utf8')
    const { content: mdxContent } = matter(mdxFileContents)

    return {
      slug,
      title: langData.title,
      bannerImage: data.bannerImage,
      content: mdxContent,
    }
  } catch (error) {
    console.error(`Error reading post ${slug} in ${language}:`, error)
    return null
  }
}

export function getAllPostSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(pagesDirectory)
    
    return fileNames
      .filter(name => name.endsWith('.json'))
      .map(name => name.replace(/\.json$/, ''))
      .sort()
  } catch (error) {
    console.error(`Error reading posts:`, error)
    return []
  }
}

export function getNavigationData(language: Language): NavItem[] {
  try {
    const slugs = getAllPostSlugs()
    
    const navItems: NavItem[] = []
    
    slugs
      .forEach(slug => {
        try {
          const filePath = path.join(pagesDirectory, `${slug}.json`)
          const fileContents = fs.readFileSync(filePath, 'utf8')
          const data = JSON.parse(fileContents)
          const langData = data[language]

          if (!langData) {
            return
          }
          
          // For the index page, use the language root path with the slug
          const itemPath = slug === 'home' ? `/${language}/home` : `/${language}/${slug}`
          
          navItems.push({
            slug,
            title: langData.title || slug,
            path: itemPath,
            position: data.position,
          })
        } catch (error) {
          console.error(`Error reading navigation data for ${slug}:`, error)
        }
      })
    
    return navItems.sort((a, b) => {
      if (a.position === undefined) return 1
      if (b.position === undefined) return -1
      return a.position - b.position
    })
  } catch (error) {
    console.error(`Error reading navigation data for ${language}:`, error)
    return []
  }
} 