import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const postsCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
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
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/works",
    generateId: ({ entry }) => entry.replace(/\/index\.mdx?$/, ""),
  }),
  schema: z.object({
    title: z.string(),
    sectors: z.array(z.string()),
    pubDate: z.date(),
    summary: z.array(z.string()),
    type: z.string(),
    tags: z.array(z.string()),
    nextTitle: z.string().optional(),
    nextDescription: z.string().optional(),
    nextLink: z.string().optional(),
  }),
});

export const collections = {
  posts: postsCollection,
  recipes: defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/recipes" }),
    schema: postsCollection.schema,
  }),
  works: worksCollection,
};
