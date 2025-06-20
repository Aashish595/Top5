'use client'
import { Facebook, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react'
import { Button } from './ui/button'

interface ShareButtonsProps {
  title: string
  url: string
  className?: string
}

export default function ShareButtons({ title, url,className }: ShareButtonsProps) {
  const shareText = `Check out "${title}" on Top5`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url)
    alert('Link copied to clipboard!')
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" size="sm" asChild>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Facebook className="h-4 w-4 mr-2" />
          Share
        </a>
      </Button>
      <Button variant="outline" size="sm" asChild>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter className="h-4 w-4 mr-2" />
          Tweet
        </a>
      </Button>
      <Button variant="outline" size="sm" asChild>
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Linkedin className="h-4 w-4 mr-2" />
          Share
        </a>
      </Button>
      <Button variant="outline" size="sm" onClick={copyToClipboard}>
        <LinkIcon className="h-4 w-4 mr-2" />
        Copy Link
      </Button>
    </div>
  )
}