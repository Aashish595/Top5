// lib/sanity/transform.ts
import { Category as SanityCategory, SubCategory as SanitySubCategory ,List as SanityList, Post as SanityPost, Poll as SanityPoll } from '@/types/sanity'
import { Category, List, Post, Poll ,SubCategory} from '@/types'



// lib/sanity/transform.ts
export function transformCategory(category: unknown): Category {
  if (typeof category !== 'object' || category === null) {
    throw new Error('Invalid category data');
  }

  const c = category as SanityCategory;
  
  // Validate required fields
  if (!c._id || typeof c._id !== 'string') {
    throw new Error('Invalid category: missing or invalid _id');
  }
  if (!c.title || typeof c.title !== 'string') {
    throw new Error('Invalid category: missing or invalid title');
  }
  if (!c.slug?.current || typeof c.slug.current !== 'string') {
    throw new Error('Invalid category: missing or invalid slug');
  }

  return {
    _id: c._id,
    title: c.title,
    slug: { current: c.slug.current },  // Maintain Sanity's slug structure
    subcategories: c.subcategories?.map(transformSubCategory) || []  // Ensure array
  };
}

function transformSubCategory(subcategory: unknown): SubCategory {
  // Basic type checking
  if (typeof subcategory !== 'object' || subcategory === null) {
    throw new Error('Invalid subcategory data');
  }

  const s = subcategory as SanitySubCategory;

  // Validate required fields
  if (!s._id || typeof s._id !== 'string') {
    throw new Error('Invalid subcategory: missing or invalid _id');
  }
  if (!s.title || typeof s.title !== 'string') {
    throw new Error('Invalid subcategory: missing or invalid title');
  }
  if (!s.slug?.current || typeof s.slug.current !== 'string') {
    throw new Error('Invalid subcategory: missing or invalid slug');
  }

  return {
    _id: s._id,
    title: s.title,
    slug: { current: s.slug.current } // Keep the slug object structure
  };
}

export function transformList(list: unknown): List {
  if (typeof list !== 'object' || list === null) {
    throw new Error('Invalid list data');
  }
  // Add proper type checking for List properties
  return list as List;
}

export function transformPost(post: unknown): Post {
  if (typeof post !== 'object' || post === null) {
    throw new Error('Invalid post data');
  }
  return post as Post;
}

export function transformPoll(poll: unknown): Poll {
  if (typeof poll !== 'object' || poll === null) {
    throw new Error('Invalid poll data');
  }
  return poll as Poll;
}



