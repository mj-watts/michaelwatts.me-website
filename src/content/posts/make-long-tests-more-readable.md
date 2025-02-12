---
title: "Making long tests more readable with function composition"
pubDate: 2025-02-12
description: "Making long tests more readable with function composition"
author: "Michael Watts"
tags: ["vitest", "gherkin"]
---

## Introduction

Sometimes tests can get really long, very fast. They become harder to read and more difficult to navigate making them a pain to maintain.

In this post I'll show a way to make long tests more readable by using function composition.

If we have a test, something like this:

```ts
test('Adding items to cart', ({ given, when, then }) => {
  let basket: ShoppingBasket;

  given('an empty shopping cart', () => {
    basket = new ShoppingBasket();
  });

  when('the user adds a £10 book', () => {
    basket.addItem('book', 10);
  });

  when('the user adds a £2 pen', () => {
    basket.addItem('pen', 2);
  });

  then('the total should be £12', () => {
    expect(basket.getTotal()).toBe(12);
  });
});
```

It's fine at the moment but once it starts to grow it can get hard to read and difficult to navigate.

The best tip is to literally zoom out, shrink the text and get a bird's eye view of the test.

Pick out the repeated steps and extract them into functions.

If we have 4 tests that are almost identical, we can extract the repeated steps into a function.

```ts
const givenAnEmptyShoppingCart = (given) => {
  given('an empty shopping cart', () => {
    basket = new ShoppingBasket();
  });
}

const whenTheUserAddsAnItemToTheBasket = (when, item, price) => {
  when(`the user adds a £${price} ${item}`, () => {
    basket.addItem(item, price);
  });
}

const thenTheTotalShouldBe = (then, total) => {
  then(`the total should be £${total}`, () => {
    expect(basket.getTotal()).toBe(total);
  });
}

```

Update the test to use the new functions.

```ts
test('Adding items to cart', ({ given, when, then }) => {
  givenAnEmptyShoppingCart(given);
  whenTheUserAddsAnItemToTheBasket(when, 'book', 10);
  whenTheUserAddsAnItemToTheBasket(when, 'pen', 2);
  thenTheTotalShouldBe(then, 12);
});
```

Now the test is much shorter and easier to read.
