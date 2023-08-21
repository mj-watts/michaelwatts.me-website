---
layout: ../../layouts/MarkdownPostLayout.astro
title: "Making links more accessible"
pubDate: 2023-08-19
description: "Making links more accessible for screen readers"
author: "Michael Watts"
image:
  url: "https://docs.astro.build/assets/full-logo-light.png"
  alt: "A link image"
tags: ["accessibility"]
wip: true
---

TL;DR: Grab a copy of NVDA or equivalent, start it up, close your eyes and navigate your web pages. This little tip can cut down on quite a lot of unnecessary chatter.

If you've ever used a screen reader and keyboard to navigate a web page, you may have noticed that they can provide a lot of information, which can sometimes be overwhelming. Building a page that cuts down on the chatter can help prevent users with accessibility issues quickly navigate your content.

**The following reads out as:**

1. link image to https://example.com,
2. Image alt: "A description about this image"
3. Heading tag H6 0. Link "Example Link" to "https://example.com"
4. Jan 02, 2023

You may have noticed that this is part of a list, if there are 10, 50, or 100 of the same, your reader would be overwhelmed by the slurry of information spat out by their screen reader.

```html
<li>
  <a href="https://example.com">
    <img
      src="https://example.com/source.png"
      alt="A description about this image"
    />
  </a>
  <div>
    <h6>
      <a href="https://example.com">Example Link</a>
    </h6>
    <p>Jan 02, 2023</p>
  </div>
</li>
```

Changing the previous block to the following and using a neat little trick adopted by the BBC you can cut down the chatter to this:

1. "Example Link" link

```html
<li class="article-block">
  <div class="order-2">
    <p class="h6">
      <a href="https://example.com">Example Link</a>
    </p>
    <p>Jan 02, 2006</p>
  </div>
  <div>
    <img
      src="https://example.com/source.png"
      alt="A description about this image"
    />
  </div>
</li>
```

with the following style (scss):

```scss
.article-block {
  display: flex;
  position: relative;

  a {
    &:after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 2;
    }
  }
}
```
