// src/lib/sanity/queries.ts
import { client } from "./client";
import { groq } from "next-sanity";
import { 
  SanityCategory, 
  SanityList, 
  SanityPoll, 
  SanityPost,
  SanitySubCategory
} from "@/types/sanity";

// Frontend types
import { 
  Category, 
  List, 
  Poll, 
  Post,
  SubCategory 
} from "@/types";
// src/lib/sanity/queries.ts
export async function getCategories(): Promise<Category[]> {
  try {
    const categories = await client.fetch<SanityCategory[]>(groq`
      *[_type == "category" && !defined(parent)] | order(order asc) {
        _id,
        _type,
        title,
        slug,
        description,
        order,
        image
      }
    `);
    
    const subcategories = await client.fetch<SanitySubCategory[]>(groq`
      *[_type == "category" && defined(parent)] | order(order asc) {
        _id,
        _type,
        title,
        slug,
        description,
        order,
        image,
        parent
      }
    `);

    return categories.map(category => ({
      _id: category._id,
      title: category.title,
      slug: category.slug,
      description: category.description,
      order: category.order,
      image: category.image,
      subcategories: subcategories
        .filter(sub => sub.parent._ref === category._id)
        .map(sub => ({
          _id: sub._id,
          title: sub.title,
          slug: sub.slug,
          description: sub.description,
          order: sub.order,
          image: sub.image
        }))
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getTrendingLists(limit = 5): Promise<List[]> {
  try {
    const lists = await client.fetch<(SanityList & {
      category: { title: string; slug: { current: string } }
    })[]>(groq`
      *[_type == "list" && isTrending == true] | order(publishedAt desc) [0...${limit}] {
        _id,
        title,
        slug,
        "category": category->{
          title,
          slug
        },
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

    return lists.map(list => ({
      _id: list._id,
      title: list.title,
      slug: list.slug,
      category: list.category,
      items: list.items,
      publishedAt: list.publishedAt,
      isTrending: list.isTrending
    }));
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


export async function getFeaturedLists(): Promise<List[]> {
  return client.fetch(groq`
    *[_type == "list" && isFeatured == true] | order(publishedAt desc) {
      _id,
      _type,
      title,
      slug,
      category->{
        _id,
        title,
        slug
      },
      items[] {
        position,
        title,
        description,
        image,
        link
      },
      publishedAt
    }
  `);
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

export async function getSubcategoryBySlug(slug: string): Promise<SubCategory | null> {
  try {
    const subcategory = await client.fetch<SanitySubCategory & {
      parent: { title: string; slug: { current: string } }
    }>(groq`
      *[_type == "category" && defined(parent) && slug.current == $slug][0] {
        _id,
        _type,
        title,
        slug,
        description,
        order,
        image,
        "parent": parent->{
          title,
          slug
        }
      }
    `, { slug });

    if (!subcategory) return null;

    return {
      _id: subcategory._id,
      title: subcategory.title,
      slug: subcategory.slug,
      description: subcategory.description,
      order: subcategory.order,
      image: subcategory.image,
      parent: subcategory.parent
    };
  } catch (error) {
    console.error("Error fetching subcategory:", error);
    return null;
  }
}

export async function getListsBySubcategory(
  categorySlug: string, 
  subcategorySlug: string
): Promise<List[]> {
  try {
    const lists = await client.fetch<(SanityList & {
      category: { title: string; slug: { current: string } }
    })[]>(groq`
      *[_type == "list" && 
        category->slug.current == $subcategorySlug && 
        category->parent->slug.current == $categorySlug
      ] | order(publishedAt desc) {
        _id,
        title,
        slug,
        "category": category->{
          title,
          slug
        },
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
    `, { categorySlug, subcategorySlug });

    return lists.map(list => ({
      _id: list._id,
      title: list.title,
      slug: list.slug,
      category: list.category,
      items: list.items,
      publishedAt: list.publishedAt,
      isTrending: list.isTrending
    }));
  } catch (error) {
    console.error("Error fetching lists by subcategory:", error);
    return [];
  }
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