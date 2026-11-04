import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import svelte from "@astrojs/svelte";
import react from "@astrojs/react";
import rehypeExternalLinks from "rehype-external-links";
import rehypePrettyCode from "rehype-pretty-code";
import { transformerNotationDiff } from "@shikijs/transformers";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://michaelwatts.me",
  compressHTML: true,
  integrations: [mdx(), svelte(), react()],
  markdown: {
    syntaxHighlight: false,
    processor: unified({
      rehypePlugins: [
        [
          rehypePrettyCode,
          {
            theme: {
              dark: "vitesse-dark",
              light: "vitesse-light",
            },
            transformers: [transformerNotationDiff()],
            onVisitHighlightedLine(node: any) {
              node?.properties?.className?.push("highlighted");
            },
            onVisitHighlightedChars(node: any) {
              node?.properties?.className
                ? node.properties.className.push("highlighted-chars")
                : (node.properties.className = ["highlighted-chars"]);
            },
          },
        ],
        [
          rehypeExternalLinks,
          {
            content: { type: "text", value: " ☍" },
            target: "_blank",
          },
        ],
      ],
    }),
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
