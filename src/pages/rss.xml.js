import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = await getCollection("posts");
  const publishedPosts = posts
    .filter((post) => post.data?.draft !== true)
    .map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/posts/${post.slug}`,
    }));

  return rss({
    title: "Michael Watts",
    description:
      "Writing about random things but mainly stuff about web and technology.",
    site: context.site,
    items: publishedPosts,
    customData: `<language>en-gb</language>`,
  });
}
