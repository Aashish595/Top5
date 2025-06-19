'use client'

import { Category } from '@/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'

interface DesktopSidebarProps {
  categories: Category[]
}

export default function DesktopSidebar({ categories }: DesktopSidebarProps) {
  const pathname = usePathname()
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({})

  const toggleCategory = (categoryId: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }))
  }

  return (
    <aside className="hidden lg:block w-64 shrink-0 border-r h-[calc(100vh-65px)] sticky top-16 overflow-y-auto">
      <nav className="p-4">
        <h2 className="mb-4 px-2 text-lg font-semibold tracking-tight">Categories</h2>
        <ul className="space-y-1">
          {categories
            .filter((category) => !category.parent)
            .map((category) => (
              <li key={category._id}>
                <div className="flex items-center justify-between rounded-md hover:bg-muted">
                  <Link
                    href={`/${category.slug.current}`}
                    className={`flex-1 px-2 py-2 ${
                      pathname === `/${category.slug.current}`
                        ? 'text-primary font-medium'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {category.title}
                  </Link>
                  {categories.some((c) => c.parent?._ref === category._id) && (
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
                {openCategories[category._id] && (
                  <ul className="pl-6 mt-1 space-y-1">
                    {categories
                      .filter((c) => c.parent?._ref === category._id)
                      .map((subcategory) => (
                        <li key={subcategory._id}>
                          <Link
                            href={`/${category.slug.current}/${subcategory.slug.current}`}
                            className={`block px-2 py-1 rounded-md hover:bg-muted ${
                              pathname === `/${category.slug.current}/${subcategory.slug.current}`
                                ? 'text-primary font-medium'
                                : 'text-muted-foreground'
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
        </ul>
      </nav>
    </aside>
  )
}