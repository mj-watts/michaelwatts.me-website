---
title: "Diff notation test with Shiki"
pubDate: 2024-04-23
description: "Testing  Shiki diff notation transformer plugin"
author: "Michael Watts"
image:
  url: "https://docs.astro.build/assets/full-logo-light.png"
  alt: "A link image"
tags: ["shiki"]
wip: false
---

Got this working with the Shiki diff notation transformer plugin.

By adding comments to the code block, you can highlight the changes.

For example this...

```
console.log("hewwo"); // [!code --]
console.log("hello"); // [!code ++]
console.log("goodbye");
```

...will output the following:

```ts
console.log("hewwo"); // [!code --]
console.log("hello"); // [!code ++]
console.log("goodbye");
```

And just checking that without comments, it will output the following:

```ts
console.log("hewwo");
console.log("hello");
console.log("goodbye");
```

Not sure how to get the line numbers to show up though...
