'use client'

import { X } from 'lucide-react'
import { Button } from './ui/button'
import { Category } from '@/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

interface MobileSidebarProps {
  isOpen: boolean
  onClose: () => void
  categories: Category[]
}

export default function MobileSidebar({ isOpen, onClose, categories }: MobileSidebarProps) {
  const pathname = usePathname()
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({})

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
              {categories
                .filter((category) => !category.parent)
                .map((category) => (
                  <li key={category._id}>
                    <div className="flex items-center justify-between">
                      <Link
                        href={`/${category.slug.current}`}
                        className={`block w-full py-2 ${
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
                          {openCategories[category._id] ? '−' : '+'}
                        </button>
                      )}
                    </div>
                    {openCategories[category._id] && (
                      <ul className="pl-4 mt-1 space-y-1">
                        {categories
                          .filter((c) => c.parent?._ref === category._id)
                          .map((subcategory) => (
                            <li key={subcategory._id}>
                              <Link
                                href={`/${category.slug.current}/${subcategory.slug.current}`}
                                className={`block py-1 ${
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
        </div>
      </div>
    </div>
  )
}