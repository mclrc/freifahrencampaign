'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { type NavItem, Language } from '@/lib/content'
import styles from './Navigation.module.css'
import Branding from './Branding'
import { IoNavigate } from 'react-icons/io5'

interface NavigationProps {
  currentLanguage: Language
  navItems: NavItem[]
  altNavItems: NavItem[]
}

export default function Navigation({ currentLanguage, navItems, altNavItems }: NavigationProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 5)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Close menu on route change
  useEffect(() => {
    setCollapsed(true)
    window.scrollTo(0, 0)
  }, [pathname])
  
  const getAlternateLanguage = () => {
    return currentLanguage === 'de' ? 'en' : 'de'
  }
  
  const getAlternatePath = () => {
    const altLang = getAlternateLanguage()
    const currentSlug = navItems.find(item => isActivePath(item.path))?.slug
    
    if (currentSlug) {
      const altItem = altNavItems.find(item => item.slug === currentSlug)
      if (altItem) {
        return altItem.path
      }
    }

    // Fallback for home or if slug not found
    return `/${altLang}`
  }

  const getCurrentPageTitle = () => {
    const normalizedPathname = pathname.replace(/\/$/, '') || '/'
    const currentItem = navItems.find(item => {
      const normalizedItemPath = item.path.replace(/\/$/, '') || '/'
      return normalizedItemPath === normalizedPathname
    })
    return currentItem?.title || ''
  }

  const isActivePath = (itemPath: string) => {
    const normalizedPathname = pathname.replace(/\/$/, '') || '/'
    const normalizedItemPath = itemPath.replace(/\/$/, '') || '/'
    return normalizedItemPath === normalizedPathname
  }

  const getLanguageDisplay = () => {
    const altLang = getAlternateLanguage()
    const flag = altLang === 'de' ? '🇩🇪' : '🇬🇧'
    const text = altLang === 'de' ? 'Deutsch' : 'English'
    
    return (
      <>
        {flag} <span className={styles.languageText}>{text}</span>
      </>
    )
  }

  const navbarClasses = [
    styles.navbar,
    scrolled ? styles.scrolled : '',
    collapsed ? styles.collapsed : ''
  ].filter(Boolean).join(' ')

  return (
    <div className={navbarClasses}>
      <nav>
        <div className={styles.top}>
          <header className={styles.branding}>
            <Branding language={currentLanguage} />
          </header>
          <div className={styles.hamburgerMenu}>
            <div>
              <span className={styles.routeName}>{getCurrentPageTitle()}</span>
              <button
                aria-label="hamburger menu"
                className={styles.hamburger}
                onClick={() => setCollapsed(!collapsed)}
              />
            </div>
          </div>
        </div>
        <ul className={styles.links}>
          {navItems.map((item) => (
            <li key={item.path}>
              <Link 
                href={item.path}
                className={`${isActivePath(item.path) ? styles.active : ''} ${styles.link}`}
              >
                {item.title}
              </Link>
            </li>
          ))}
          <li className={styles.appLink}>
            <Link href="https://freifahren.org" className={styles.link}>
              {{de: 'Zur App', en: 'Go to App'}[currentLanguage]}<IoNavigate style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '4px' }} />
            </Link>
          </li>
          <li className={styles.languageSwitcher}>
            <Link href={getAlternatePath()}>
              {getLanguageDisplay()}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
} 