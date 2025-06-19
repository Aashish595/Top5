import { createImageUrlBuilder } from 'next-sanity'
import { client } from './client'

export const urlForImage = (source: any) => {
  return createImageUrlBuilder(client).image(source)
}

export function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function getActivePoll() {
  return client.fetch(groq`
    *[_type == "poll" && isActive == true] | order(publishedAt desc) [0] {
      _id,
      question,
      options,
      publishedAt,
      category->{title, slug}
    }
  `)
}