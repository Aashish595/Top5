'use client';

import { Button } from './ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, List } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:block w-64 border-r h-[calc(100vh-56px)]">
      <nav className="flex flex-col p-4 space-y-1">
        <Link
          href="/"
          className={cn(
            'rounded-md',
            pathname === '/'
              ? 'bg-accent text-accent-foreground'
              : 'hover:bg-accent/50'
          )}
        >
          <Button variant="ghost" className="w-full justify-start">
            <Home className="h-5 w-5 mr-2" />
            Home
          </Button>
        </Link>
        <Link
          href="/category"
          className={cn(
            'rounded-md',
            pathname === '/category'
              ? 'bg-accent text-accent-foreground'
              : 'hover:bg-accent/50'
          )}
        >
          <Button variant="ghost" className="w-full justify-start">
            <List className="h-5 w-5 mr-2" />
            Category
          </Button>
        </Link>
      </nav>
    </aside>
  );
}

function cn(...inputs: (string | undefined)[]) {
  return inputs.filter(Boolean).join(' ');
}