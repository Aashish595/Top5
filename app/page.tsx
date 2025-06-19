"use client"

import { useState } from "react"
import {
  Search,
  Menu,
  Sun,
  Moon,
  Star,
  TrendingUp,
  Play,
  Users,
  Heart,
  ChevronRight,
  Home,
  Newspaper,
  Smartphone,
  Film,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"

const categories = [
  {
    name: "Movies",
    color: "bg-orange-500",
    icon: Film,
    subcategories: ["Action", "Comedy", "Drama", "Sci-Fi", "Horror"],
  },
  {
    name: "Tech",
    color: "bg-blue-500",
    icon: Smartphone,
    subcategories: ["Smartphones", "Laptops", "Gaming", "AI", "Gadgets"],
  },
  {
    name: "Music",
    color: "bg-purple-500",
    icon: Play,
    subcategories: ["Pop", "Rock", "Hip-Hop", "Electronic", "Classical"],
  },
  {
    name: "Food",
    color: "bg-red-500",
    icon: Heart,
    subcategories: ["Restaurants", "Recipes", "Street Food", "Desserts", "Healthy"],
  },
  {
    name: "Travel",
    color: "bg-green-500",
    icon: TrendingUp,
    subcategories: ["Destinations", "Hotels", "Adventures", "Budget Travel", "Luxury"],
  },
]

const trendingTopics = [
  "Top 5 Netflix Shows 2024",
  "Best Budget Smartphones",
  "Most Viral TikTok Songs",
  "Healthiest Fast Foods",
  "Must-Visit Cities",
]

const featuredLists = [
  {
    id: 1,
    title: "Top 5 Movies of 2024",
    category: "Movies",
    categoryColor: "bg-orange-500",
    image: "/placeholder.svg?height=200&width=300",
    views: "125K",
    rating: 4.8,
    description: "The most anticipated and highest-rated movies this year",
  },
  {
    id: 2,
    title: "Best Budget Smartphones Under $300",
    category: "Tech",
    categoryColor: "bg-blue-500",
    image: "/placeholder.svg?height=200&width=300",
    views: "89K",
    rating: 4.6,
    description: "Amazing phones that won't break the bank",
  },
  {
    id: 3,
    title: "Top 5 Viral Songs This Month",
    category: "Music",
    categoryColor: "bg-purple-500",
    image: "/placeholder.svg?height=200&width=300",
    views: "156K",
    rating: 4.9,
    description: "The tracks everyone's talking about",
  },
  {
    id: 4,
    title: "Healthiest Fast Food Options",
    category: "Food",
    categoryColor: "bg-red-500",
    image: "/placeholder.svg?height=200&width=300",
    views: "67K",
    rating: 4.4,
    description: "Guilt-free options from popular chains",
  },
]

export default function Top5Website() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`)
    }
  }

  const handleSidebarClose = () => {
    setSidebarOpen(false)
  }

  return (
    <div className={`min-h-screen bg-background text-foreground ${isDarkMode ? "dark" : ""}`}>
      {/* Sticky Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle className="flex items-center space-x-2">
                      <div className="bg-gradient-to-r from-orange-500 to-purple-600 text-white p-2 rounded-lg">
                        <TrendingUp className="h-6 w-6" />
                      </div>
                      <span className="text-xl font-bold">Top5Everything</span>
                    </SheetTitle>
                  </SheetHeader>
                  <MobileSidebar onClose={handleSidebarClose} />
                </SheetContent>
              </Sheet>

              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-orange-500 to-purple-600 text-white p-2 rounded-lg">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <span className="text-xl font-bold">Top5Everything</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    Home
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[600px] grid-cols-2 gap-3 p-4">
                      {categories.map((category) => (
                        <div key={category.name} className="group relative">
                          <NavigationMenuLink asChild>
                            <div className="flex items-center space-x-3 rounded-md p-3 hover:bg-accent cursor-pointer">
                              <div className={`p-2 rounded-md ${category.color} text-white`}>
                                <category.icon className="h-4 w-4" />
                              </div>
                              <div>
                                <div className="font-medium">{category.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  {category.subcategories.slice(0, 2).join(", ")}...
                                </div>
                              </div>
                            </div>
                          </NavigationMenuLink>
                        </div>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
                    News
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
                    Tech
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
                    Movies
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
                    Contact
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Search */}
            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search top 5 lists..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-10 w-64"
                />
                <Button variant="ghost" size="icon" onClick={toggleTheme}>
                  {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </div>
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-80 border-r bg-background/50 min-h-screen">
          <DesktopSidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-orange-500 via-purple-600 to-blue-600 text-white py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">Discover the Best of Everything</h1>
                <p className="text-xl md:text-2xl mb-8 opacity-90">
                  Curated Top 5 lists across movies, tech, music, food, and more
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" className="text-lg px-8">
                    Explore Categories
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 border-white text-white hover:bg-white hover:text-purple-600"
                  >
                    Latest Lists
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Mobile Search */}
          <div className="sm:hidden p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search top 5 lists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="pl-10"
              />
            </div>
          </div>

          {/* Trending Section */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold flex items-center gap-2">
                  <TrendingUp className="h-8 w-8 text-orange-500" />
                  Trending Top 5 Lists
                </h2>
                <Button variant="outline">View All</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredLists.map((list) => (
                  <Card key={list.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <CardHeader className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <Image
                          src={list.image || "/placeholder.svg"}
                          alt={list.title}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge className={`absolute top-3 left-3 ${list.categoryColor} text-white`}>
                          {list.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors">
                        {list.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mb-3">{list.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{list.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span className="text-sm">{list.views}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Latest Posts */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8">Latest Top 5 Lists</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...featuredLists, ...featuredLists.slice(0, 2)].map((list, index) => (
                  <Card key={`${list.id}-${index}`} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Image
                          src={list.image || "/placeholder.svg"}
                          alt={list.title}
                          width={80}
                          height={80}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <Badge className={`${list.categoryColor} text-white mb-2`}>{list.category}</Badge>
                          <h3 className="font-semibold mb-2 hover:text-primary cursor-pointer">{list.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>{list.rating}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              <span>{list.views}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Poll Section */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="text-center">Community Poll</CardTitle>
                  <p className="text-center text-muted-foreground">What's your favorite movie genre?</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { option: "Action", percentage: 35 },
                    { option: "Comedy", percentage: 28 },
                    { option: "Drama", percentage: 20 },
                    { option: "Sci-Fi", percentage: 17 },
                  ].map((item) => (
                    <div key={item.option} className="space-y-2">
                      <div className="flex justify-between">
                        <span>{item.option}</span>
                        <span className="text-muted-foreground">{item.percentage}%</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                  <Button className="w-full mt-4">Vote Now</Button>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-r from-orange-500 to-purple-600 text-white p-2 rounded-lg">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <span className="text-xl font-bold">Top5Everything</span>
              </div>
              <p className="text-muted-foreground">
                Your ultimate destination for curated top 5 lists across all categories.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Categories</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    Movies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Technology
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Music
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Food
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon">
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Youtube className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 Top5Everything. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function DesktopSidebar() {
  return (
    <div className="p-6 space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Menu className="h-4 w-4" />
          Categories
        </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.name} className="group">
              <div className="flex items-center justify-between p-2 rounded-md hover:bg-accent cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded ${category.color} text-white`}>
                    <category.icon className="h-3 w-3" />
                  </div>
                  <span className="text-sm font-medium">{category.name}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Topics */}
      <div>
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Trending
        </h3>
        <div className="space-y-2">
          {trendingTopics.map((topic, index) => (
            <div key={index} className="p-2 rounded-md hover:bg-accent cursor-pointer">
              <p className="text-sm text-muted-foreground hover:text-foreground">{topic}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ad Space */}
      <Card>
        <CardContent className="p-4 text-center">
          <div className="bg-muted rounded-lg p-8 mb-2">
            <p className="text-muted-foreground text-sm">Advertisement</p>
          </div>
          <p className="text-xs text-muted-foreground">Sponsored Content</p>
        </CardContent>
      </Card>
    </div>
  )
}

function MobileSidebar({ onClose }: { onClose: () => void }) {
  return (
    <div className="p-6 space-y-6">
      {/* Navigation Links */}
      <div className="space-y-2">
        <Button variant="ghost" className="w-full justify-start" onClick={onClose}>
          <Home className="h-4 w-4 mr-2" />
          Home
        </Button>
        <Button variant="ghost" className="w-full justify-start" onClick={onClose}>
          <Newspaper className="h-4 w-4 mr-2" />
          News
        </Button>
        <Button variant="ghost" className="w-full justify-start" onClick={onClose}>
          <Smartphone className="h-4 w-4 mr-2" />
          Tech
        </Button>
        <Button variant="ghost" className="w-full justify-start" onClick={onClose}>
          <Film className="h-4 w-4 mr-2" />
          Movies
        </Button>
        <Button variant="ghost" className="w-full justify-start" onClick={onClose}>
          <Mail className="h-4 w-4 mr-2" />
          Contact
        </Button>
      </div>

      <Separator />

      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <Button key={category.name} variant="ghost" className="w-full justify-start" onClick={onClose}>
              <div className={`p-1.5 rounded ${category.color} text-white mr-3`}>
                <category.icon className="h-3 w-3" />
              </div>
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Trending */}
      <div>
        <h3 className="font-semibold mb-4">Trending</h3>
        <div className="space-y-2">
          {trendingTopics.slice(0, 3).map((topic, index) => (
            <p
              key={index}
              className="text-sm text-muted-foreground p-2 hover:text-foreground cursor-pointer"
              onClick={onClose}
            >
              {topic}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
