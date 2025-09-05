---
title: "JavaScript Array at method"
pubDate: 2025-04-24
description: "A relatively unknown method to access JavaScript Array elements, the at() method."
author: "Michael Watts"
readTime: 4
tags: ["javascript"]
wip: false
---

## JavaScript Array at() method

`Array.prototype.at()` is a nice way to access elements in an array particularly the last.

### Here's our array:

```js
const arr = [1, 2, 3, 4, 5];
```

### New Array.prototype.at method:

```js
// Getting the last element
arr.at(-1); // Output: 5

// Getting element at index 2
arr.at(2); // Output: 3
```

### Comparison with traditional array access:

Here's how the same operations would look using traditional array access:

```js
// Getting the last element
arr[arr.length - 1]; // Output: 5

// Getting element at index 2
arr[2]; // Output: 3
```

The `at()` method provides a more elegant way to access elements, especially with the last element silliness that used to happen.

### Browser support

Browser support is good https://caniuse.com/mdn-javascript_builtins_array_at

### Handling errors

If an element is out of range it returns `undefined`

```js
const arr = [1, 2, 3, 4, 5];
assert.strictEqual(arr.at(2), 3);
assert.strictEqual(arr.at(21), undefined);
```
