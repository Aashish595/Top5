// types/sanity.ts
import { PortableTextBlock } from '@portabletext/types'

export interface SanityCategory {
  _id: string
  _type: 'category'
  title: string
  slug: {
    current: string
  }
  description?: string
  parent?: {
    _ref: string
    _type: 'reference'
  }
  order?: number
  image?: {
    asset: {
      _ref: string
    }
  }
}


export interface SanitySubCategory {
  _id: string
  _type: 'category' // Note: Same type as category but with parent reference
  title: string
  slug: {
    current: string
  }
  description?: string
  parent: {
    _ref: string
    _type: 'reference'
  }
  order?: number
  image?: {
    asset: {
      _ref: string
    }
  }
}

export interface SanityListItem {
  position: number
  title: string
  description?: string
  image?: {
    asset: {
      _ref: string
    }
  }
  link?: string
}

export interface SanityList {
  _id: string
  _type: 'list'
  title: string
  slug: {
    current: string
  }
  category: {
    _ref: string
    _type: 'reference'
  }
  items: SanityListItem[]
  publishedAt: string
  isTrending?: boolean
}

export interface SanityPost {
  _id: string
  _type: 'post'
  title: string
  slug: {
    current: string
  }
  excerpt?: string
  mainImage?: {
    asset: {
      _ref: string
    }
  }
  publishedAt: string
  categories?: Array<{
    _ref: string
    _type: 'reference'
  }>
}

export interface SanityPoll {
  _id: string
  _type: 'poll'
  question: string
  options: {
    text: string
    votes: number
  }[]
  publishedAt: string
}

// Frontend types that match your component expectations
export interface Category {
  _id: string
  title: string
  slug: {
    current: string
  }
  subcategories: SubCategory[]
}

export interface SubCategory {
  _id: string
  title: string
  slug: {
    current: string
  }
}

export interface List {
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
  items: ListItem[]
  publishedAt: string
  isTrending?: boolean
}

export interface ListItem {
  position: number
  title: string
  description?: string
  image?: {
    asset: {
      _ref: string
    }
  }
  link?: string
}

export interface Post {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt?: string
  mainImage?: {
    asset: {
      _ref: string
    }
  }
  publishedAt: string
  categories?: {
    title: string
    slug: {
      current: string
    }
  }[]
}

export interface Poll {
  _id: string
  question: string
  options: {
    text: string
    votes: number
  }[]
  publishedAt: string
}