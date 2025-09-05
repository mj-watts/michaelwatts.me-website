---
title: "Diff notation test with Shiki"
pubDate: 2024-04-23
description: "Testing  Shiki diff notation transformer plugin."
author: "Michael Watts"
readTime: 2
tags: ["shiki"]
wip: false
---

I've successfully implemented the Shiki diff notation transformer plugin, which provides a brilliant way to highlight code changes in your documentation or blog posts.

## Basic Usage

The plugin works by adding special comments to your code blocks. These comments tell Shiki how to render the differences.

For example, this basic demonstration...

```ts
console.log("hewwo"); // [!code --]
console.log("hello"); // [!code ++]
console.log("goodbye");
```

...will output the following with proper diff highlighting:

```ts
console.log("hewwo"); // [!code --]
console.log("hello"); // [!code ++]
console.log("goodbye");
```

## More Complex Examples

Let's look at some more practical examples. Here's a TypeScript interface modification:

```ts
interface User {
  name: string;
  age: number; // [!code --]
  dateOfBirth: Date; // [!code ++]
  email: string;
}
```

Or perhaps a React component update:

```tsx
function Welcome() {
    return (
        <div className="old-class"> // [!code --]
        <div className="new-class text-primary"> // [!code ++]
            <h1>Welcome!</h1>
        </div>
    );
}
```

## Without Diff Notation

For comparison, here's how regular code blocks appear without any diff notation:

```ts
console.log("hewwo");
console.log("hello");
console.log("goodbye");
```

## Current Limitations

Whilst the diff highlighting works brilliantly, I'm still investigating a few aspects:

1. Line number display isn't working as expected yet
2. Multi-line diff blocks might need special handling
3. The colour scheme follows the current theme - might need to adjust for better contrast

## Next Steps

I'm planning to explore:

- Custom colour schemes for the diff highlights
- Adding line numbers alongside the code
- Supporting additional diff notation styles
- Implementing collapsible code blocks

If you're interested in implementing this yourself, you'll need to install the Shiki transformer plugin and configure it in your Astro config file.

---

_Note: This post will be updated as I discover more features and workarounds._
