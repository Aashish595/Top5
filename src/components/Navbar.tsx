'use client';

import { Button } from './ui/button';
import { Input } from './ui/input';
import ThemeToggle from './ThemeToggle';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4">
        <Link href="/" className="font-bold text-lg">
          Logo
        </Link>
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}