import Navigation from './Navigation'
import { type NavItem, type Language } from '@/lib/content'
import Footer from './Footer'

interface LayoutProps {
  children: React.ReactNode
  language: Language
  navItems: NavItem[]
  altNavItems: NavItem[]
}

export default function Layout({ children, language, navItems, altNavItems }: LayoutProps) {
  return (
    <div className="min-h-screen">
      <Navigation currentLanguage={language} navItems={navItems} altNavItems={altNavItems} />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  )
} 