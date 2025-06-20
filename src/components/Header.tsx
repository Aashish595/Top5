"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, Search, ChevronDown, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import ThemeToggle from "./ThemeToggle";
import { Sidebar, SidebarToggle } from "./Sidebar";
import { Category, SubCategory } from "@/types/sanity";
import { getCategoriesWithSubcategories } from "@/lib/sanity/queries";
import Image from "next/image";

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<
    (Category & { subcategories: SubCategory[] })[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [hoverDropdown, setHoverDropdown] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategoriesWithSubcategories();
        setCategories(categoriesData);
      } catch (err) {
        console.error("Failed to load categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div>Loading...</div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            {/* Desktop Sidebar Toggle */}
            <SidebarToggle
              isOpen={isDesktopSidebarOpen}
              setIsOpen={setIsDesktopSidebarOpen}
              className="hidden lg:flex"
            />

            {/* Mobile menu button */}
            <SidebarToggle
              isOpen={isMobileMenuOpen}
              setIsOpen={setIsMobileMenuOpen}
              className="lg:hidden"
            />

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/main_logo.png"
                alt="Top5 Logo"
                width={150}
                height={40}
                className="object-contain"
              />
            </Link>

            {/* Search - Mobile Only */}
            <div className="relative md:hidden">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Search - Desktop Only */}
            <div className="relative hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search news..."
                  className="pl-10 w-[180px] lg:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <Sidebar
        isMobile
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        categories={categories}
      />

      {/* Desktop Sidebar */}
      <Sidebar
        isOpen={isDesktopSidebarOpen}
        categories={categories}
      />
    </>
  );
}