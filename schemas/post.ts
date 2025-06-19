export default {
  name: 'post',
  type: 'document',
  title: 'Post',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'excerpt',
      type: 'text',
      title: 'Excerpt',
      rows: 3,
      validation: (Rule: any) => Rule.required().max(200),
    },
    {
      name: 'mainImage',
      type: 'image',
      title: 'Main Image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published At',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'categories',
      type: 'array',
      title: 'Categories',
      of: [{ type: 'reference', to: { type: 'category' } }],
    },
    {
      name: 'body',
      type: 'array',
      title: 'Body',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              options: {
                isHighlighted: true,
              },
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility',
              options: {
                isHighlighted: true,
              },
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'categories.0.title',
      media: 'mainImage',
    },
    prepare(selection: any) {
      const { title, subtitle, media } = selection
      return {
        title,
        subtitle: subtitle ? `Category: ${subtitle}` : 'No category',
        media,
      }
    },
  },
}