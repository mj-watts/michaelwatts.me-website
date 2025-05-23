---
title: "JavaScript Proxy objects"
pubDate: 2025-04-25
description: "The power of proxy objects in JavaScript"
author: "Michael Watts"
tags: ["javascript"]
wip: false
---

## The power of proxy objects in JavaScript

They've been around a while, proxy objects in JavaScript provide a way to intercept and customise operations performed on objects. They're particularly useful for validation, logging, formatting, notifications, and debugging.

### Basic Structure

A Proxy wraps an existing object and can intercept operations performed on it. Here's the basic syntax:

```js
const target = {
  name: 'John'
};

const handler = {
  get: function(target, prop) {
    return target[prop];
  }
};

const proxy = new Proxy(target, handler);
```

### Practical Examples

#### 1. Validation

Here's a practical example of using a Proxy to validate property values:

```js
const userHandler = {
  set: function(obj, prop, value) {
    if (prop === 'age' && typeof value !== 'number') {
      throw new TypeError('Age must be a number');
    }

    if (prop === 'age' && value < 0) {
      throw new RangeError('Age cannot be negative');
    }

    obj[prop] = value;

    return true;
  }
};

const user = new Proxy({}, userHandler);

user.age = 25; // Works fine
// user.age = -5; // Throws RangeError
// user.age = "25"; // Throws TypeError
```

#### 2. Default Values

Proxies can provide default values for non-existent properties:

```js
const handler = {
  get: function(target, prop) {
    return prop in target ? target[prop] : 'Property not found';
  }
};

const object = new Proxy({}, handler);
object.name = 'Test';

console.log(object.name); // Output: "Test"
console.log(object.age);  // Output: "Property not found"
```

#### 3. Logging

A practical use case for monitoring property access:

```js
const handler = {
  get: function(target, prop) {
    console.log(`Accessing property: ${prop}`);
    return target[prop];
  },
  set: function(target, prop, value) {
    console.log(`Setting property: ${prop} = ${value}`);
    target[prop] = value;
    return true;
  }
};

const user = new Proxy({}, handler);
user.name = 'John'; // Logs: "Setting property: name = John"
console.log(user.name); // Logs: "Accessing property: name" then "John"
```

### When to Use Proxies

Use Proxies when you need to:
- Validate data before it's set
- Provide default values
- Log access to properties
- Create read-only objects
- Implement custom property lookup behaviour

### Performance Considerations

Proxies do introduce a small performance overhead. Use them when the benefits of intercepting operations outweigh the performance cost. For high-performance applications, consider alternative patterns if the proxy operations are in critical paths.

### Browser Support

Proxy objects are supported in all modern browsers. There is no way to polyfill Proxies in older browsers as they require low-level engine support.

## Conclusion

Proxy objects are a powerful feature for intercepting and customising fundamental operations in JavaScript. They're particularly useful for creating robust APIs and debugging tools, but should be used judiciously considering their performance implications.
