import { notFound } from 'next/navigation'
import { getListsByCategory, getCategoryBySlug } from '@/lib/sanity/queries'
import { List } from '@/types'
import { urlForImage } from '@/lib/sanity/utils'
import Image from 'next/image'
import Link from 'next/link'

interface CategoryPageProps {
  params: { category: string }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const [category, lists] = await Promise.all([
    getCategoryBySlug(params.category),
    getListsByCategory(params.category),
  ])

  if (!category) return notFound()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{category.title}</h1>
        {category.description && (
          <p className="text-muted-foreground max-w-3xl">{category.description}</p>
        )}
      </div>

      {category.image && (
        <div className="relative h-64 w-full rounded-lg overflow-hidden mb-8">
          <Image
            src={urlForImage(category.image).url()}
            alt={category.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lists.map((list) => (
          <Link
            key={list._id}
            href={`/lists/${list.slug.current}`}
            className="group rounded-lg border overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-video bg-muted">
              {list.items[0]?.image && (
                <Image
                  src={urlForImage(list.items[0].image).url()}
                  alt={list.items[0].title}
                  fill
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h2 className="text-white font-medium group-hover:text-primary transition-colors">
                  {list.title}
                </h2>
              </div>
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                {list.items.slice(0, 3).map((item) => (
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

      {lists.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No lists found in this category yet.</p>
        </div>
      )}
    </div>
  )
}