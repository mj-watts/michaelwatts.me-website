---
title: "CSS relative colour syntax"
pubDate: 2024-02-16
description: "Exploring new proposal for adapting colours based on another colour's channels and values"
author: "Michael Watts"
tags: ["typescript", "html", "css"]
wip: false
---

Relative colour syntax in CSS allows seamless colour manipulation, enabling developers to perform various actions such as lightening, darkening, saturating, desaturating, adjusting opacity, and inverting to name just a few.

## Example 1: Lightening a brand colour

Here the `from` function has an input which is the colour you want to convert and then outputs the channels of your choice.
Here we are converting hue, saturation, lightness (`hsl`) channels because we're setting the from function to work on our `hsl()` input.

Each channel can then be edited as can be seen below a multiplier has been added to the lightness channel of `hsl`.

```css
:root {
  --brand-color: hsl(300deg 75% 50%);
}

.brand-color-light-1 {
  background: hsl(from var(--brand-color) h s calc(l * 1.25));
}
```

### Breaking it down:

If we replace the variable `var(--brand-color)` with `blue` it will make it clearer to read:

1. `hsl(from blue h s calc(l * 1.25))` the full thing
2. `from blue h s calc(l * 1.25)` the from function, e.g. without calc: `from blue h s l`
3. `blue` the inputted colour
4. `h s` are the unmodified `h` and `s` channels, there values have effectively come straight through
5. `calc(l * 1.25)` the modified `l` channel where the value of `l` is being multiplied by `1.25`

## Running example

<relative-color-syntax-example></relative-color-syntax-example>

## Example 2: Changing opacity

Before relative colour syntax, to change the opacity of a colour, the rgb equivalent of a colour would have to be stored. A typical example, when using CSS variables, might be:

```css
:root {
  --brand-color: #ffcc00;
  --brand-color-rgb: rgb(255, 204, 0);
}

.brand-opacity-50: {
  color: rgba(var(--brand-color-rgb), 0.5);
}
```

With CSS relative colour syntax the following is possible:

```css
.decrease-opacity-by-25 {
  background: rgb(from var(--brand-color) r g b / calc(alpha / 2));
}
```

Cutting out the need for repetitive rgb colour space conversions of existing variables.

## Read more

You can see a lot more examples at https://developer.chrome.com/blog/css-relative-color-syntax#adjust_opacity_a_color
