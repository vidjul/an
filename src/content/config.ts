import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().max(99),
    date: z.coerce.date(),
    excerpt: z.string().max(200),
  }),
});

export const collections = { posts };
