export default {
  name: 'poll',
  type: 'document',
  title: 'Poll',
  fields: [
    {
      name: 'question',
      type: 'string',
      title: 'Question',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'options',
      type: 'array',
      title: 'Options',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              type: 'string',
              title: 'Option Text',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'votes',
              type: 'number',
              title: 'Votes',
              initialValue: 0,
              validation: (Rule: any) => Rule.required().min(0),
            },
          ],
          preview: {
            select: {
              title: 'text',
              subtitle: 'votes',
            },
            prepare(selection: any) {
              const { title, subtitle } = selection
              return {
                title,
                subtitle: `${subtitle} votes`,
              }
            },
          },
        },
      ],
      validation: (Rule: any) => Rule.required().min(2),
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published At',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      type: 'reference',
      title: 'Category',
      to: [{ type: 'category' }],
    },
    {
      name: 'isActive',
      type: 'boolean',
      title: 'Is Active?',
      description: 'Only one poll should be active at a time',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'options.length',
      media: 'category.image',
    },
    prepare(selection: any) {
      const { title, subtitle } = selection
      return {
        title,
        subtitle: `${subtitle} options`,
      }
    },
  },
}