---
title: "Schema validation in TypeScript"
pubDate: 2024-04-11
description: "Implement TypeScript friendly schema validation easily with Zod"
author: "Michael Watts"
tags: ["typescript"]
wip: false
---

## Introduction

I recently came across a problem where an object that's used across a lot of the code I work on wasn't obvious which properties were required and which were optional. Working across C# and TypeScript with multiple repos took a while to search out the answer.

Having a source such as a schema to work from is essential for future self to come back to easily as a source of truth to work from much like an API spec for example.

Anyway I had read about Zod and decided to give it a try. My conclusion is that it was excellent as a source of truth and as a powerful validator.

## Intro to Zod

[Zod](https://zod.dev/?id=introduction) describes itself as "a TypeScript-first schema declaration and validation library" where the word schema is used to broadly refer to any data type from strings to complex nested objects.

One of the great things about it is it aims to eliminate duplicative type declarations so there are no duplicate Zod schemas and TypeScript types.

## A quick example scenario

I recently had to parse a bunch of information provided through a URL. Variables like firstname, lastname, addressline1, addressline2, etc were delivered through URL query params and some of the properties were required by the app and some weren't.

Example URL (I've broken the lines of the params for easier reading):

```console
https://myapp.io
  ?firstname=Bob
  &lastname=Ross
  &addressline1=1234+Boulevard+Drive
  &age=52
```

So in this instance in JavaScript querying **addressline1** would return a `string`, while querying **addressline2** would return `null`

```js
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

urlParams.get("addressline1");
// 1234 Boulevard Drive

urlParams.get("addressline2");
// null
```

If **addressline2** existed but was empty i.e. `&addressline2=` or just `&addressline2` the result would be an empty string:

```js
urlParams.get("addressline2");
// ``
```

I also want the users age and that needs to be a number so `&age=52` is good but it's a string I need to convert to a number.
If the string is un-convertible i.e. `&age=gibberish` I need to also check for that.

Which could amount to quite a bit of checking, to-ing and fro-ing, etc. The more params then the more the problems grow.

```js
const obj = {};

const addressline2 = urlParams.get("addressline2");
if (addressline2 !== null || addressline2 !== "") {
  obj.addressline2 = addressline2;
}

const age = urlParams.get("age");
if (age !== null || age !== "") {
  obj.age = Number(age); // could throw an error or behave unpredictably
}
```

## Zod can help

So instead of all that we can write a schema, parse it and catch and deal with any errors.

### Write the schema

It's very simple to write a Zod schema, here's an example showing some of the methods that can be used, there's a whole list on [their website](https://zod.dev/?id=basic-usage):

```ts /urlParamsSchema/
import { z } from "zod";

export const urlParamsSchema = z.object({
  firstname: z.string().min(1, { message: "firstname is required" }),
  lastname: z.string().min(1, { message: "lastname is required" }),
  addressline1: z.string().min(1, { message: "addressline1 is required" }),
  addressline2: z.string().optional(),
  age: z.string().min(1, { message: "age is required" }),
});

export type UrlParams = z.infer<typeof urlParamsSchema>;
```

### Parse the object to validate the data structure

Based on our schema we can run the following to parse an object against the schema to see if there are any validation errors.

```ts {13}
let errorMode = false;

// Query params are converted to an object, Vue router does auto-magically for you
// but here's a simple example of what it might return.
const routeQuery = {
  firstname: "Bob",
  lastname: "Ross",
  addressline1: "1234 Boulevard Drive",
  age: "52",
};

try {
  urlParamsSchema.parse(routeQuery);
} catch (error) {
  console.error("Error parsing query params", error);
  // Handle the error somehow...
}
```

That's a helluva lot more easier to read and maintain.

But also, _very importantly_, when future you or another developer comes by your code and needs to know what properties are required or are optional for `UserParams{:ts}`, you or they have an easy way to see by using this line...

```ts showLineNumbers{11}
export type UrlParams = z.infer<typeof urlParamsSchema>;
```

...your IDE can then infer the TypeScript type from the Zod schema, giving you a nice output of the data structure:

```ts
type UrlParams = {
  firstname: string;
  lastname: sring;
  addressline: string;
  addressline2?: string;
  age: string;
};
```

Nice and easy! 👍
