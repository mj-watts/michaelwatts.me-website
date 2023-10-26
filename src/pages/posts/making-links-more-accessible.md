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

I'm looking to expand my knowledge in web accessibility and share my findings with other developers.

Although I've been involved in website and app development for quite some time, it's only recently that I've started to appreciate the importance of addressing the difficulties faced by people with disabilities. While I had previously come across accessibility standards and guidelines, I'm now beginning to genuinely understand their significance.

Look at this:

> At least 1 in 5 people in the UK have a long term illness, impairment or disability. Many more have a temporary disability.
>
> &mdash; <cite>gov.uk website - Understanding accessibility</cite>

There are [16 million people in the UK](https://www.scope.org.uk/media/disability-facts-figures/) who have a long term disability, many more with a temporary disability. Any one of us, at any given time, could encounter an injury resulting in some form of disability, whether it's related to mobility, hearing, vision, or any other potential impairment.

## Screen reader at the ready

So, with that in mind let's arm ourselves with a screen reader and navigate the web to see what we can learn.

If you're on windows you can grab a free copy of NVDA - there are various useful ways and shortcuts to navigate a website ([see here for a full list](https://webaim.org/resources/shortcuts/nvda)).

### Navigating pages

If you've never used a screen reader and keyboard to navigate a web page, the feedback of information can, at first, be so overwhelming. It's a bit like being hit in the eyes with one of those busy old websites from the 90s, with flashing gifs, tickers, rainbows, etc. There is too much noise. They provide too much information to do their job effectively.

The first thing I learnt then using a screen reader for the first time is to test web components manually in order to cut down too much chatter and information. It provides a more minimalistic and tranquil experience for the user.

### Building a web component that provides concise information

#### Example component before improvement:

##### HTML

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
##### Screen reader output:

1. link image to https://example.com,
2. Image alt: "A description about this image"
3. Heading tag H6 0. Link "Example Link" to "https://example.com"
4. Jan 02, 2023

This is part of a list so it is worth considering that if there are many more items it could potentially overwhelm users relying on screen readers.

Changing the previous block to the following and using a neat little trick adopted by the BBC you can cut down the chatter to a single line:

#### Component after improvement:

##### HTML

```html
<ul>
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
<ul>

<style>
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
</style>
```
##### Screen reader output:
1. "Example Link" link
