import { z, defineCollection } from "astro:content";

const postsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    author: z.string(),
    readTime: z.number().min(1),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
  }),
});

const worksCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      sectors: z.array(z.string()),
      pubDate: z.date(),
      summary: z.string(),
      type: z.string(),
      tags: z.array(z.string()),
      recommendationImage: image().optional(),
      recommendationText: z.string().optional(),
      recommendationFooter: z.string().optional(),
      recommendedWork: z
        .array(z.enum(["iomusic", "webapps", "ecomm", "sfm", "sa", "sppoc"]))
        .optional(),
    }),
});

export const collections = {
  posts: postsCollection,
  recipes: postsCollection,
  works: worksCollection,
};
