'use client'

import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './ui/button'
import { List } from '@/types'
import { urlForImage } from '@/lib/sanity/utils'
import Image from 'next/image'
import { useState, useEffect } from 'react'

// components/HeroSection.tsx
interface HeroSectionProps {
  lists: {
    _id: string
    title: string
    slug: {
      current: string
    }
    category: {
      title: string
      slug: {
        current: string
      }
    }
    items: {
      position: number
      title: string
      description?: string
      image?: {
        asset: {
          _ref: string
        }
      }
      link?: string
    }[]
    publishedAt: string
  }[]
}

export default function HeroSection({ lists }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % lists.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [lists.length, isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + lists.length) % lists.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % lists.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  if (!lists.length) return null

  return (
    <section className="relative w-full overflow-hidden rounded-lg bg-muted/50">
      {/* Carousel */}
      <div className="relative h-[400px] md:h-[500px]">
        {lists.map((list, index) => (
          <div
            key={list._id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10" />
            
            {/* Background Image */}
            {list.items[0]?.image && (
              <Image
                src={urlForImage(list.items[0].image).url()}
                alt={list.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
            )}
            
            {/* Content */}
            <div className="relative z-20 h-full flex flex-col justify-end p-6 md:p-12">
              <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-white uppercase bg-primary rounded-full">
                Featured List
              </span>
              
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                <Link href={`/lists/${list.slug.current}`}>
                  {list.title}
                </Link>
              </h1>
              
              <p className="text-white/80 mb-6 max-w-2xl line-clamp-2">
                {list.items[0]?.description || `Top 5 ${list.category?.title || ''} you need to know about`}
              </p>
              
              <div className="flex flex-wrap gap-3 mb-6">
                {list.items.slice(0, 3).map((item) => (
                  <span 
                    key={item.position} 
                    className="px-3 py-1 text-sm font-medium text-white bg-black/30 rounded-full backdrop-blur-sm"
                  >
                    #{item.position} {item.title}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-4">
                <Button asChild>
                  <Link href={`/lists/${list.slug.current}`}>
                    View Full List
                  </Link>
                </Button>
                <Button variant="outline" className="text-white border-white hover:bg-white/10" asChild>
                  <Link href={`/${list.category?.slug.current}`}>
                    More {list.category?.title}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Navigation Arrows */}
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 z-30 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 z-30 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
      
      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center gap-2">
        {lists.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}