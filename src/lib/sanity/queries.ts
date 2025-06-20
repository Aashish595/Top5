// src/lib/sanity/queries.ts
import { client } from "./client";
import { groq } from "next-sanity";
import { Category, List, Poll, Post , SubCategory } from "@/types/sanity";

export async function getCategories(): Promise<Category[]> {
  try {
    return await client.fetch<Category[]>(groq`
      *[_type == "category"] | order(order asc) {
        _id,
        title,
        slug,
        description,
        "parent": parent->{_id, title, slug},
        order,
        image
      }
    `);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getTrendingLists(limit = 5): Promise<List[]> {
  try {
    return await client.fetch<List[]>(groq`
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
    `);
  } catch (error) {
    console.error("Error fetching trending lists:", error);
    return [];
  }
}

export async function getLatestPosts(limit = 3): Promise<Post[]> {
  try {
    return await client.fetch<Post[]>(groq`
      *[_type == "post"] | order(publishedAt desc) [0...${limit}] {
        _id,
        title,
        slug,
        excerpt,
        mainImage,
        publishedAt,
        categories[]->{title, slug}
      }
    `);
  } catch (error) {
    console.error("Error fetching latest posts:", error);
    return [];
  }
}

export async function getListsByCategory(categorySlug: string, limit = 10): Promise<List[]> {
  try {
    return await client.fetch<List[]>(
      groq`
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
      `,
      { categorySlug }
    );
  } catch (error) {
    console.error("Error fetching lists by category:", error);
    return [];
  }
}

export async function searchContent(query: string): Promise<Array<List | Post>> {
  try {
    return await client.fetch<Array<List | Post>>(
      groq`
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
      `,
      { query } as Record<string, unknown> // Explicit type cast
    );
  } catch (error) {
    console.error("Error searching content:", error);
    return [];
  }
}


export async function getFeaturedLists(limit = 5): Promise<List[]> {
  try {
    return await client.fetch<List[]>(groq`
      *[_type == "list" && defined(items[0].image)] | order(publishedAt desc) [0...${limit}] {
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
    `);
  } catch (error) {
    console.error("Error fetching featured lists:", error);
    return [];
  }
}

export async function getPolls(): Promise<Poll[]> {
  try {
    return await client.fetch(groq`
      *[_type == "poll"] | order(publishedAt desc) {
        _id,
        question,
        "options": options[] {
          _key,
          text,
          votes
        },
        publishedAt
      }
    `)
    
  } catch (error) {
    console.error("Error fetching polls:", error);
    return [];
    
  }
}

export async function getCategoryBySlug(slug: string) {
  return client.fetch<Category | null>(groq`
    *[_type == "category" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      image,
      "parent": parent->{title, slug}
    }
  `, { slug })
}

export async function getSubcategoryBySlug(slug: string) {
  return client.fetch<Category | null>(groq`
    *[_type == "category" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      image,
      "parent": parent->{title, slug}
    }
  `, { slug })
}

export async function getListsBySubcategory(categorySlug: string, subcategorySlug: string) {
  return client.fetch<List[]>(groq`
    *[_type == "list" && 
      category->slug.current == $subcategorySlug && 
      category->parent->slug.current == $categorySlug
    ] | order(publishedAt desc) {
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
  `, { categorySlug, subcategorySlug })
}

export async function getListBySlug(slug: string) {
  return client.fetch<List | null>(groq`
    *[_type == "list" && slug.current == $slug][0] {
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
  `, { slug })
}



// src/lib/sanity/queries.ts
export const getCategoriesWithSubcategories = async (): Promise<(Category & { subcategories: SubCategory[] })[]> => {
  try {
    const query = groq`
      *[_type == "category" && !defined(parent)] | order(order asc) {
        _id,
        title,
        slug,
        description,
        order,
        image,
        "subcategories": *[_type == "category" && defined(parent) && parent._ref == ^._id] | order(order asc) {
          _id,
          title,
          slug,
          description,
          order,
          image
        }
      }
    `;
    
    const results = await client.fetch<(Category & { subcategories: SubCategory[] })[]>(query);
    return results;
  } catch (error) {
    console.error('Error fetching categories with subcategories:', error);
    return [];
  }
}