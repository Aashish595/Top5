import Link from 'next/link'
import { CalendarDays, Clock } from 'lucide-react'
import { Button } from './ui/button'
import { Post } from '@/types'
import { urlForImage } from '@/lib/sanity/utils'
import Image from 'next/image'

interface LatestPostsProps {
  posts: Post[]
}

export default function LatestPosts({ posts }: LatestPostsProps) {
  return (
    <div className="bg-background rounded-lg border p-6">
      <h2 className="text-xl font-semibold mb-6">Latest Posts</h2>
      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post._id} className="flex gap-4">
            {post.mainImage && (
              <div className="relative w-20 h-20 shrink-0 rounded-md overflow-hidden">
                <Image
                  src={urlForImage(post.mainImage).url()}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <h3 className="font-medium mb-1">
                <Link href={`/posts/${post.slug.current}`} className="hover:text-primary">
                  {post.title}
                </Link>
              </h3>
              <div className="flex items-center text-sm text-muted-foreground space-x-4 mb-2">
                <span className="flex items-center">
                  <CalendarDays className="h-4 w-4 mr-1" />
                  {new Date(post.publishedAt).toLocaleDateString()}
                </span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  5 min read
                </span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {post.excerpt}
              </p>
            </div>
          </article>
        ))}
      </div>
      <Button variant="outline" className="mt-6 w-full">
        View All Posts
      </Button>
    </div>
  )
}