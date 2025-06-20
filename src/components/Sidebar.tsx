'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { ChevronDown, ChevronRight, X, Menu } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Category, SubCategory } from '@/types/sanity'

interface NavItem {
  name: string
  url: string
}

interface NavSection {
  title: string
  items: NavItem[]
}

interface SidebarProps {
  categories: (Category & { subcategories: SubCategory[] })[]
  isOpen: boolean
  onClose?: () => void
  isMobile?: boolean
}

export function Sidebar({
  categories,
  isOpen,
  onClose = () => {},
  isMobile = false
}: SidebarProps) {
  const pathname = usePathname()
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({})
  const [openTrending, setOpenTrending] = useState(false)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})

  // Navigation sections data (moved from Header)
  const navSections: NavSection[] = [
    {
      title: "Live TV",
      items: [
        { name: "Spotlight", url: "/live-tv/spotlight" },
        { name: "Video", url: "/live-tv/video" },
        { name: "Profit", url: "/live-tv/profit" },
      ],
    },
    {
      title: "Latest",
      items: [
        { name: "Breaking News", url: "/latest/breaking" },
        { name: "Trending", url: "/latest/trending" },
        { name: "Editors Pick", url: "/latest/editors-pick" },
      ],
    },
  ]

  const trendingItems: NavItem[] = [
    { name: "Movies", url: "/trending/movies" },
    { name: "Tech", url: "/trending/tech" },
    { name: "Music", url: "/trending/music" },
    { name: "Food", url: "/trending/food" },
    { name: "View All", url: "/trending" },
  ]

  const toggleCategory = (categoryId: string) => {
    setOpenCategories(prev => ({ ...prev, [categoryId]: !prev[categoryId] }))
  }

  const toggleSection = (sectionTitle: string) => {
    setOpenSections(prev => ({ ...prev, [sectionTitle]: !prev[sectionTitle] }))
  }

  useEffect(() => {
    if (!isOpen) {
      setOpenCategories({})
      setOpenTrending(false)
      setOpenSections({})
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen && onClose) {
      onClose()
    }
  }, [pathname])

  const sidebarContent = (
    <nav className="p-4 h-full">
      <ul className="space-y-2">
        <li>
          <Link
            href="/"
            className={`block py-2 px-3 rounded-md transition-colors ${
              pathname === '/' 
                ? 'text-primary font-medium bg-primary/10' 
                : 'text-muted-foreground hover:bg-accent hover:text-primary'
            }`}
          >
            Home
          </Link>
        </li>

        {navSections.map(section => (
          <li key={section.title} className="border-b border-border/50 pb-2">
            <div className="flex items-center">
              <button
                className={`flex-1 py-2 px-3 rounded-md text-left transition-colors ${
                  pathname.startsWith(`/${section.title.toLowerCase().replace(' ', '-')}`)
                    ? 'text-primary font-medium bg-primary/10'
                    : 'text-muted-foreground hover:bg-accent hover:text-primary'
                }`}
                onClick={() => toggleSection(section.title)}
              >
                {section.title}
              </button>
              <button
                onClick={() => toggleSection(section.title)}
                className="p-2 text-muted-foreground hover:text-primary rounded-md"
              >
                {openSections[section.title] ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
            </div>
            {openSections[section.title] && (
              <ul className="pl-4 mt-1 space-y-1">
                {section.items.map(item => (
                  <li key={item.url}>
                    <Link
                      href={item.url}
                      className={`block py-1.5 px-3 rounded-md transition-colors ${
                        pathname === item.url 
                          ? 'text-primary font-medium bg-primary/10' 
                          : 'text-muted-foreground hover:bg-accent hover:text-primary'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}

        {categories.map(category => (
          <li key={category._id} className="border-b border-border/50 pb-2">
            <div className="flex items-center">
              <Link
                href={`/${category.slug.current}`}
                className={`flex-1 py-2 px-3 rounded-md transition-colors ${
                  pathname === `/${category.slug.current}`
                    ? 'text-primary font-medium bg-primary/10'
                    : 'text-muted-foreground hover:bg-accent hover:text-primary'
                }`}
              >
                {category.title}
              </Link>
              {category.subcategories.length > 0 && (
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    toggleCategory(category._id)
                  }}
                  className="p-2 text-muted-foreground hover:text-primary rounded-md"
                >
                  {openCategories[category._id] ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>
            {openCategories[category._id] && category.subcategories.length > 0 && (
              <ul className="pl-4 mt-1 space-y-1">
                {category.subcategories.map(subcategory => (
                  <li key={subcategory._id}>
                    <Link
                      href={`/${category.slug.current}/${subcategory.slug.current}`}
                      className={`block py-1.5 px-3 rounded-md transition-colors ${
                        pathname === `/${category.slug.current}/${subcategory.slug.current}`
                          ? 'text-primary font-medium bg-primary/10'
                          : 'text-muted-foreground hover:bg-accent hover:text-primary'
                      }`}
                    >
                      {subcategory.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}

        <li className="border-b border-border/50 pb-2">
          <div className="flex items-center">
            <button
              className={`flex-1 py-2 px-3 rounded-md text-left transition-colors ${
                pathname.startsWith('/trending') 
                  ? 'text-primary font-medium bg-primary/10' 
                  : 'text-muted-foreground hover:bg-accent hover:text-primary'
              }`}
              onClick={() => setOpenTrending(!openTrending)}
            >
              Trending
            </button>
            <button
              onClick={() => setOpenTrending(!openTrending)}
              className="p-2 text-muted-foreground hover:text-primary rounded-md"
            >
              {openTrending ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          </div>
          {openTrending && (
            <ul className="pl-4 mt-1 space-y-1">
              {trendingItems.map(item => (
                <li key={item.url}>
                  <Link
                    href={item.url}
                    className={`block py-1.5 px-3 rounded-md transition-colors ${
                      pathname === item.url 
                        ? 'text-primary font-medium bg-primary/10' 
                        : 'text-muted-foreground hover:bg-accent hover:text-primary'
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>
    </nav>
  )

  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-72 bg-background border-r z-50 shadow-xl lg:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <span className="text-lg font-semibold">Menu</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={onClose}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="overflow-y-auto h-[calc(100%-57px)]">
                {sidebarContent}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    )
  }

  return (
    <aside 
      className={`hidden lg:block fixed lg:sticky top-16 left-0 w-72 h-[calc(100vh-65px)] bg-background border-r overflow-y-auto transition-all duration-300 z-30 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      {sidebarContent}
    </aside>
  )
}

export function SidebarToggle({
  isOpen,
  setIsOpen,
  className = ''
}: {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  className?: string
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={className}
      onClick={() => setIsOpen(!isOpen)}
      aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
    >
      {isOpen ? (
        <X className="h-5 w-5" />
      ) : (
        <Menu className="h-5 w-5" />
      )}
    </Button>
  )
}