import { z, defineCollection } from "astro:content";

const postsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    author: z.string(),
    previewImage: z
      .object({
        url: z.string(),
        url2x: z.string(),
        url3x: z.string(),
        alt: z.string(),
      })
      .optional(),
    image: z
      .object({
        url: z.string(),
        url2x: z.string(),
        url3x: z.string(),
        alt: z.string(),
      })
      .optional(),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
  }),
});

export const collections = {
  posts: postsCollection,
  recipes: postsCollection,
};
