import rss, { pagesGlobToRssItems } from "@astrojs/rss";

export async function get(context) {
  return rss({
    title: "Michael Watts",
    description:
      "Writing about random things but mainly stuff about web and technology.",
    site: context.site,
    items: await pagesGlobToRssItems(import.meta.glob("./posts/*.{md,mdx}")),
    customData: `<language>en-gb</language>`,
  });
}
