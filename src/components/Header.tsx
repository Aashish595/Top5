'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, Search, X } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import ThemeToggle from './ThemeToggle'
import MobileSidebar from './MobileSidebar'
import { Category } from '@/types'
import { getCategories } from '@/lib/sanity/queries'

export default function Header() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const { data: categories } = getCategories()

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    if (query.length > 2) {
      setIsSearching(true)
      // Implement search API call to Sanity
      // const results = await searchContent(query)
      // setSearchResults(results)
    } else {
      setSearchResults([])
      setIsSearching(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">Top5</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6">
            {categories?.map((category) => (
              <Link
                key={category._id}
                href={`/${category.slug.current}`}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === `/${category.slug.current}`
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                {category.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search lists..."
                className="pl-10 w-[200px] lg:w-[300px]"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 w-full mt-1 bg-background border rounded-md shadow-lg z-50">
                {searchResults.map((result) => (
                  <Link
                    key={result._id}
                    href={`/${result.slug.current}`}
                    className="block p-3 hover:bg-muted"
                  >
                    {result.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          <ThemeToggle />
        </div>
      </div>

      <MobileSidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        categories={categories}
      />
    </header>
  )
}