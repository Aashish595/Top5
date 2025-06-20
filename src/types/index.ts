
export interface SanitySlug {
  _type: 'slug';
  current: string;
}
export interface SanityCategory {
  _id: string;
  _type: 'category';
  title: string;
  slug: SanitySlug;
  subcategories?: SanitySubCategory[]; // Optional in Sanity
}



export interface SanitySubCategory {
  _id: string;
  _type: 'subcategory';
  title: string;
  slug: SanitySlug;
}


export interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;  // Changed from string to object
  };
  subcategories: SubCategory[];  // Made required
}

// types/index.ts or types/sanity.ts
export interface SubCategory {
  _id: string;
  title: string;
 slug: {
    current: string;
  };
   description?: string;
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

// types/index.ts
