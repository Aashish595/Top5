// src/lib/sanity/client.ts
import { createClient } from '@sanity/client';
import { groq } from 'next-sanity';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-05-03', // or your preferred version
  useCdn: process.env.NODE_ENV === 'production', // CDN for production
  perspective: 'published', // ensures you get published content
});