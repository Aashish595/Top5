import Link from 'next/link'
import { TrendingUp } from 'lucide-react'
import { List } from '@/types'
import { urlForImage } from '@/lib/sanity/utils'
import Image from 'next/image'

interface TrendingListsProps {
  lists: List[]
}



export default function TrendingLists({ lists }: TrendingListsProps) {
  return (
    <section className="mt-8">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-semibold">Trending Lists</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {lists.map((list) => (
          <Link
            key={list._id}
            href={`/lists/${list.slug.current}`}
            className="group rounded-lg border overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-square bg-muted">
              {list.items[0]?.image && (
                <Image
                  src={urlForImage(list.items[0].image).url()}
                  alt={list.items[0].title}
                  fill
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-medium group-hover:text-primary transition-colors">
                  {list.title}
                </h3>
                <p className="text-sm text-white/80">
                  {list.category?.title}
                </p>
              </div>
              <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                #1 {list.items[0]?.title}
              </div>
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                {list.items.slice(1, 4).map((item) => (
                  <li key={item.position} className="flex items-center gap-2">
                    <span className="text-xs font-bold text-muted-foreground">
                      #{item.position}
                    </span>
                    <span className="text-sm line-clamp-1">{item.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}