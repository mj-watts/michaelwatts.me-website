# Personal website

https://michaelwatts.me

Requires Node.js 22.23.4 or newer. Use `nvm use` to select the pinned version.

```sh
npm ci
npm run dev
```

Run `npm run build` to generate the production site and `npm test` to check butterfly flight paths and image-shadow alignment.

- Uses Astro 7 with the official React, Svelte, MDX, and RSS integrations.
- Supports React, Svelte, and web components.
- Supports Anime.js.
- Blog metadata renders as static HTML; interactive post demos use React and web components.

The original painted foreground uses parallax, with Three.js butterflies, image-masked butterfly shadows, and slowly drifting sparkling dust.
