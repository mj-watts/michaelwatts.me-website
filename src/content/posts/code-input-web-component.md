---
title: "One-time-password code input web component"
pubDate: 2024-01-15
description: "One-time-code (OTP), PIN or code input boxes (like you see when logging into PayPal, etc.), a way of doing it with a single input but appears to have 6 separate inputs"
author: "Michael Watts"
tags: ["typescript", "html", "css", "web components"]
wip: false
---

## Example of an OTP code input

Here is an example of how to handle a one-time-password code input.


**Working example:**
<code-input></code-input>
Enter or paste characters into the cells above. Once it reaches the maximum number of characters it will de-focus.

## The HTML:

Note the use of `autocorrect` and `spellcheck` to avoid red warning lines on the input.

```html
<div class="code-container">
  <input
    id="code-input"
    type="text"
    name="code-input"
    class="code-input"
    maxlength="6"
    title="Input code"
    autocomplete="off"
    autocorrect="off"
    autocapitalize="off"
    spellcheck="false"
    pattern="[a-z][A-Z][0-9]"
    autofocus
  />
  <div class="cell"></div>
  <div class="cell"></div>
  <div class="cell"></div>
  <div class="cell"></div>
  <div class="cell"></div>
  <div class="cell"></div>
</div>
```

## The CSS:

The CSS uses a fixed-width monotype font with the use of `ch` as a character measurement.

```css
.code-container {
  display: grid;
  grid-template-columns: repeat(6, 2ch);
  grid-template-rows: 1fr;
  gap: 0px 1ch;
  position: relative;
  font-family: monospace;
  font-size: 2.5rem;
  height: 100px;
  align-items: center;
}

.code-input {
  position: absolute;
  top: 0;
  left: 0.5ch;
  right: -2ch;
  height: 100px;
  font-family: inherit;
  font-size: inherit;
  border: none;
  outline: none;
  padding: 0;
  letter-spacing: 2ch;
  color: grey;
  background: transparent;
  width: 18ch;
  user-select: none;
  opacity: 0.5;
  transition: opacity 0.2s ease-in-out;
}

.code-input:focus {
  opacity: 1;
  color: rebeccapurple;
}

.code-input::selection {
  background-color: transparent;
}

.cell {
  outline: 2px solid grey;
  width: 2ch;
  height: 3ch;
  z-index: -1;
  border-radius: 5px;
}
```

## The TypeScript:

Blurring the input box when the 6th character has been entered avoids breaking overflow.

```ts
const handleInput = (event: InputEvent) => {
  const codeInput = event.target as HTMLInputElement;
  if (codeInput.value.length >= 6) {
    codeInput.blur(); // Blur the input so cursor doesn't hang outside boxes
  }
};

const codeInput = document.querySelector("#code-input");

codeInput?.addEventListener("input", (event: Event) => {
  handleInput(event as InputEvent);
});

codeInput?.addEventListener("paste", () => {
  setTimeout(handleInput, 0);
});
```

## The full OTP input web component code:

```ts
class CodeInput extends HTMLElement {
  #shadow: ShadowRoot | null = null;

  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: "open" });
  }

  handleInput(event: InputEvent) {
    const codeInput = event.target as HTMLInputElement;
    if (codeInput.value.length >= 6) {
      codeInput.blur(); // Blur the input so cursor doesn't hang outside boxes
    }
  }

  connectedCallback() {
    if (this.#shadow === null) return;

    this.#shadow.innerHTML = `
      <style>
        .cells {
          display: grid;
          grid-template-columns: repeat(6, 2ch);
          grid-template-rows: 1fr;
          gap: 0px 1ch;
          position: relative;
          font-family: monospace;
          font-size: 2.5rem;
          height: 100px;
          align-items: center;
        }
        .code-input {
          position: absolute;
          top: 0;
          left: .5ch;
          right: -2ch;
          height: 100px;
          font-family: inherit;
          font-size: inherit;
          border: none;
          outline: none;
          padding: 0;
          letter-spacing: 2ch;
          color: grey;
          background: transparent;
          width: 18ch;
          user-select: none;
          opacity: .5;
          transition: opacity .2s ease-in-out;
        }
        .code-input:focus {
          opacity: 1;
          color: white;
        }
        .code-input::selection {
          background-color: transparent;
        }
        .cell {
          outline: 2px solid grey;
          width: 2ch;
          height: 3ch;
          z-index: -1;
          border-radius: 5px;
        }
      </style>
      <div class="cells">
        <input
          id="code-input"
          type="text"
          name="code-input"
          class="code-input"
          maxlength="6"
          title="Input code"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          pattern="[a-z][A-Z][0-9]"
          autofocus
        />
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
      </div>
    `;

    const codeInput = this.#shadow.querySelector("#code-input");

    codeInput?.addEventListener("input", (event: Event) => {
      this.handleInput(event as InputEvent);
    });

    codeInput?.addEventListener("paste", () => {
      setTimeout(this.handleInput, 0);
    });
  }
}

customElements.define("code-input", CodeInput);
```
