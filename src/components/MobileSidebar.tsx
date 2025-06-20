'use client'

import { X, ChevronDown, ChevronRight } from 'lucide-react'
import { Button } from './ui/button'
import { Category, SubCategory } from '@/types/sanity'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

interface MobileSidebarProps {
  isOpen: boolean
  onClose: () => void
  categories: (Category & { subcategories: SubCategory[] })[]
  trendingItems: { name: string; url: string }[]
}

export default function MobileSidebar({ 
  isOpen, 
  onClose, 
  categories, 
  trendingItems 
}: MobileSidebarProps) {
  const pathname = usePathname()
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({})
  const [openTrending, setOpenTrending] = useState(false)

  const toggleCategory = (categoryId: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="fixed inset-y-0 left-0 w-3/4 max-w-sm bg-background border-r">
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-lg font-semibold">Menu</span>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="overflow-y-auto h-[calc(100%-57px)]">
          <nav className="p-4">
            <ul className="space-y-2">
              {/* Home Link */}
              <li>
                <Link
                  href="/"
                  className={`block w-full py-2 ${
                    pathname === '/'
                      ? 'text-primary font-medium'
                      : 'text-muted-foreground'
                  }`}
                  onClick={onClose}
                >
                  Home
                </Link>
              </li>

              {/* Categories */}
              {categories.map((category) => (
                <li key={category._id}>
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/${category.slug.current}`}
                      className={`block w-full py-2 ${
                        pathname === `/${category.slug.current}`
                          ? 'text-primary font-medium'
                          : 'text-muted-foreground'
                      }`}
                      onClick={onClose}
                    >
                      {category.title}
                    </Link>
                    {category.subcategories.length > 0 && (
                      <button
                        onClick={() => toggleCategory(category._id)}
                        className="p-2"
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
                      {category.subcategories.map((subcategory) => (
                        <li key={subcategory._id}>
                          <Link
                            href={`/${category.slug.current}/${subcategory.slug.current}`}
                            className={`block py-1 ${
                              pathname === `/${category.slug.current}/${subcategory.slug.current}`
                                ? 'text-primary font-medium'
                                : 'text-muted-foreground'
                            }`}
                            onClick={onClose}
                          >
                            {subcategory.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}

              {/* Trending Section */}
              <li>
                <div className="flex items-center justify-between">
                  <button
                    className={`block w-full py-2 text-left ${
                      pathname.startsWith('/trending')
                        ? 'text-primary font-medium'
                        : 'text-muted-foreground'
                    }`}
                    onClick={() => setOpenTrending(!openTrending)}
                  >
                    Trending
                  </button>
                  <button
                    onClick={() => setOpenTrending(!openTrending)}
                    className="p-2"
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
                    {trendingItems.map((item, index) => (
                      <li key={index}>
                        <Link
                          href={item.url}
                          className={`block py-1 ${
                            pathname === item.url
                              ? 'text-primary font-medium'
                              : 'text-muted-foreground'
                          }`}
                          onClick={onClose}
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
        </div>
      </div>
    </div>
  )
}