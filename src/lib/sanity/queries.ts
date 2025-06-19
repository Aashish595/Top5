import { client } from './client'
import { groq } from 'next-sanity'

export async function getCategories() {
  return client.fetch<Category[]>(groq`
    *[_type == "category"] | order(order asc) {
      _id,
      title,
      slug,
      description,
      "parent": parent->{_id, title, slug},
      order,
      image
    }
  `)
}

export async function getTrendingLists(limit = 5) {
  return client.fetch<List[]>(groq`
    *[_type == "list" && isTrending == true] | order(publishedAt desc) [0...${limit}] {
      _id,
      title,
      slug,
      category->{title, slug},
      items[] {
        position,
        title,
        description,
        image,
        link
      },
      publishedAt,
      isTrending
    }
  `)
}

export async function getLatestPosts(limit = 3) {
  return client.fetch<Post[]>(groq`
    *[_type == "post"] | order(publishedAt desc) [0...${limit}] {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      categories[]->{title, slug}
    }
  `)
}

export async function getListsByCategory(categorySlug: string, limit = 10) {
  return client.fetch<List[]>(groq`
    *[_type == "list" && category->slug.current == $categorySlug] | order(publishedAt desc) [0...${limit}] {
      _id,
      title,
      slug,
      category->{title, slug},
      items[] {
        position,
        title,
        description,
        image,
        link
      },
      publishedAt,
      isTrending
    }
  `, { categorySlug })
}

export async function searchContent(query: string) {
  return client.fetch(groq`
    *[_type in ["list", "post"] && title match $query + "*"] {
      _type,
      _id,
      title,
      slug,
      ...(_type == "list" => {
        "category": category->title
      }),
      ...(_type == "post" => {
        "categories": categories[]->title
      })
    }
  `, { query })
}