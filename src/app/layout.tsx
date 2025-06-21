// src/app/layout.tsx

import '@/styles/globals.css'
import { ReactNode } from 'react'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'

export const metadata = {
  title: 'Your Site Title',
  description: 'Your Site Description',
}

interface LayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Sidebar />
        {children}
      </body>
    </html>
  )
}
