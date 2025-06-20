// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'
import { cn } from '@/lib/utils'
import ClientWrapper from '@/components/ClientWrapper'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Top5 - Curated Top 5 Lists',
  description: 'Discover the best in every category with our expert-curated top 5 lists',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        'min-h-screen bg-background font-sans antialiased',
        inter.className
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            
            <Header />
            <main className="flex-1">
              <div className="container mx-auto px-4 py-8">
                {children}
              </div>
            </main>
            <Footer />
            <ClientWrapper />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}