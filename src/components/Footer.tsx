'use client'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, ArrowUp } from 'lucide-react'
import { Button } from './ui/button'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t bg-muted/50">
      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Top5</h3>
            <p className="text-sm text-muted-foreground">
              Discover the best in every category with our expert-curated top 5 lists.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/news" className="text-sm text-muted-foreground hover:text-primary">
                  News
                </Link>
              </li>
              <li>
                <Link href="/movies" className="text-sm text-muted-foreground hover:text-primary">
                  Movies
                </Link>
              </li>
              <li>
                <Link href="/mobiles" className="text-sm text-muted-foreground hover:text-primary">
                  Mobiles
                </Link>
              </li>
              <li>
                <Link href="/laptops" className="text-sm text-muted-foreground hover:text-primary">
                  Laptops
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Subscribe</h3>
            <p className="text-sm text-muted-foreground">
              Get the latest top 5 lists delivered to your inbox.
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 text-sm border rounded-md"
              />
              <Button size="sm" className="shrink-0">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Top5. All rights reserved.
          </p>
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollToTop}
            className="text-muted-foreground"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </footer>
  )
}