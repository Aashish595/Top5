export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'videoUrl',
      title: 'Showreel Video',
      type: 'file',
      options: { accept: 'video/mp4' },
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
    },
  ],
};