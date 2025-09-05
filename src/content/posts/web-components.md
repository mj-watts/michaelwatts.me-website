---
title: "Web components"
pubDate: 2023-10-26
description: "How to create custom elements and handle attributes using JavaScript and TypeScript."
author: "Michael Watts"
readTime: 4
tags: ["web-components", "JavaScript", "TypeScript"]
---

<style>
hello-world {
  color: deeppink;
  font-size: larger;
}
</style>

Here is an example of the simplest web component which outputs "Hello World!".

<hello-world class="border border-rose-300 px-5"></hello-world>

To include this on the page we simply add the following to our HTML (or in this case our markdown):

```html
<style>
  hello-world {
    color: deeppink;
    font-size: larger;
  }
</style>

<hello-world></hello-world>
```

And here is the code:

```ts
class HelloWorld extends HTMLElement {
  connectedCallback() {
    this.textContent = "Hello World!";
  }
}

customElements.define("hello-world", HelloWorld);
```

## A simple web component with attributes

```html
<hello-world name="you"></hello-world>
```

Outputs the following:

<hello-world name="you" class="border border-rose-300 px-5"></hello-world>

And below is code for accepting attributes/props. Note the two newly added methods (plus the updated string interpolation output).

The first method is a static method where the prop names can be defined:

```ts
static get observedAttributes() {
  return ["name"];
}
```

and the second is an attribute change callback method used to assign new values to our prop names:

```ts
attributeChangedCallback(
  property: string,
  oldValue: string,
  newValue: string
) {
  if (oldValue === newValue) return;
  (this as any)[property] = newValue;
}
```

The full component code:

```ts
class HelloWorld extends HTMLElement {
  name: string;

  constructor() {
    super();

    this.name = "World";
  }

  static get observedAttributes() {
    return ["name"];
  }

  attributeChangedCallback(
    property: string,
    oldValue: string,
    newValue: string
  ) {
    if (oldValue === newValue) return;
    (this as any)[property] = newValue;
  }

  connectedCallback() {
    this.textContent = `Hello ${this.name}!`;
  }
}

customElements.define("hello-world", HelloWorld);
```
