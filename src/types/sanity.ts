export interface Category {
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

export interface List {
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
  items: ListItem[]
  publishedAt: string
  isTrending?: boolean
}

export interface Post {
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

export interface Poll {
  _id: string
  _type: 'poll'
  question: string
  options: {
    text: string
    votes: number
  }[]
  publishedAt: string
}