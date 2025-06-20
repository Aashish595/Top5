export interface Category {
  _id: string;
  _type: "category";
  title: string;
  slug: {
    current: string;
  };
  description?: string;
  parent?: {
    _id: string;
    _ref: string;  // Reference to parent category ID
    _type?: string; // Optional type (common in Sanity.io)
    title: string;
    slug: {
      current: string;
    };
  };
  order?: number;
  image?: any;
}

export interface List {
  _id: string;
  _type: "list";
  title: string;
  slug: {
    current: string;
  };
  category?: {
    title: string;
    slug: {
      current: string;
    };
  };
  items: Array<{
    position: number;
    title: string;
    description?: string;
    image?: any;
    link?: string;
  }>;
  publishedAt: string;
  isTrending?: boolean;
}

export interface Post {
  _id: string;
  _type: "post";
  title: string;
  slug: {
    current: string;
  };
  excerpt?: string;
  mainImage?: any;
  publishedAt: string;
  categories?: Array<{
    title: string;
    slug: {
      current: string;
    };
  }>;
}

// In your types file
export interface Poll {
  id: string;
  _type?: string;
  question: string;
  options: PollOption[];
  publishedAt?: string;
  totalVotes?: number;  // Made optional
  createdAt?: string;   // Made optional
  updatedAt?: string;   // Made optional
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
  optionId: string; // Added to match the original code
  _type?: string; // Made optional to match the Poll interface
}

export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt?: string;
  _updatedAt?: string;
}

// For images
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  caption?: string;
}

// For lists
// export interface List extends SanityDocument {
//   title: string;
//   publishedAt: string;
//   category?: CategoryReference;
//   items: ListItem[];
// }

export interface CategoryReference {
  _type: 'reference';
  _ref: string;
  title?: string; // Populated by GROQ queries
  slug?: {
    current: string;
  };
}

export interface ListItem {
  position: number;
  title: string;
  description?: string;
  image?: SanityImage;
  link?: string;
}

// For breadcrumbs
export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}