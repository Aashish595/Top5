// This file contains utility functions for working with Sanity data in a Next.js application.

import { groq } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url';
import { client } from './client';

export const urlForImage = (source: any) => {
  return imageUrlBuilder(client).image(source);
};


export function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

