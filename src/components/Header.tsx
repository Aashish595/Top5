'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, Search, ChevronDown } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import ThemeToggle from './ThemeToggle'
import MobileSidebar from './MobileSidebar'
import { Category, SubCategory } from '@/types/sanity'
import { getCategoriesWithSubcategories } from '@/lib/sanity/queries'
import Image from 'next/image'

export default function Header() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [categories, setCategories] = useState<(Category & { subcategories: SubCategory[] })[]>([])
  const [loading, setLoading] = useState(true)
  const [hoverDropdown, setHoverDropdown] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategoriesWithSubcategories()
        setCategories(categoriesData)
      } catch (err) {
        console.error('Failed to load categories:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  // Sample trending data (can be fetched from Sanity)
  const trendingItems = [
    { name: "Movies", url: "/trending/movies" },
    { name: "Tech", url: "/trending/tech" },
    { name: "Music", url: "/trending/music" },
    { name: "Food", url: "/trending/food" },
    { name: "View All", url: "/trending" }
  ]

  if (loading) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div>Loading...</div>
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Left section with logo and main nav */}
        <div className="flex items-center gap-6">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/main_logo.png" 
              alt="Top5 Logo" 
              width={150} 
              height={100} 
              className="  object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Home Link */}
            <Link
              href="/"
              className={`px-3 py-2 text-sm font-medium transition-colors hover:text-primary rounded-md ${
                pathname === '/'
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:bg-accent'
              }`}
            >
              Home
            </Link>

            {/* Categories Dropdown */}
            {categories.map((category) => (
              <div 
                key={category._id}
                className="relative"
                onMouseEnter={() => setHoverDropdown(category._id)}
                onMouseLeave={() => setHoverDropdown(null)}
              >
                <button
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors hover:text-primary rounded-md ${
                    pathname.startsWith(`/${category.slug.current}`)
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:bg-accent'
                  }`}
                >
                  {category.title}
                  {category.subcategories.length > 0 && (
                    <ChevronDown className={`h-4 w-4 transition-transform ${hoverDropdown === category._id ? 'rotate-180' : ''}`} />
                  )}
                </button>
                
                {hoverDropdown === category._id && category.subcategories.length > 0 && (
                  <div className="absolute left-0 mt-0 w-56 origin-top-right rounded-b-md bg-background shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 animate-in fade-in-50">
                    <div className="py-1">
                      {category.subcategories.map((subcategory) => (
                        <Link
                          key={subcategory._id}
                          href={`/${category.slug.current}/${subcategory.slug.current}`}
                          className="block px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-primary"
                        >
                          {subcategory.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Trending Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setHoverDropdown('trending')}
              onMouseLeave={() => setHoverDropdown(null)}
            >
              <button
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors hover:text-primary rounded-md ${
                  pathname.startsWith('/trending')
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:bg-accent'
                }`}
              >
                Categories
                <ChevronDown className={`h-4 w-4 transition-transform ${hoverDropdown === 'trending' ? 'rotate-180' : ''}`} />
              </button>
              
              {hoverDropdown === 'trending' && (
                <div className="absolute left-0 mt-0 w-56 origin-top-right rounded-b-md bg-background shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 animate-in fade-in-50">
                  <div className="py-1">
                    {trendingItems.map((item, index) => (
                      <Link
                        key={index}
                        href={item.url}
                        className={`block px-4 py-2 text-sm ${item.name === "View All" ? 'font-semibold text-primary' : 'text-muted-foreground'} hover:bg-accent hover:text-primary`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Right section with search and theme toggle */}
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search top 5 lists..."
                className="pl-10 w-[180px] lg:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <ThemeToggle />
        </div>
      </div>

      <MobileSidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        categories={categories}
        trendingItems={trendingItems}
      />
    </header>
  )
}