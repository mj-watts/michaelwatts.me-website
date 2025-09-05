---
title: "Writing Expressive Tests with Gherkin and Vitest in TypeScript"
pubDate: 2024-07-24
description: "Learn how to write clear, behaviour-driven tests using Gherkin syntax with Vitest and TypeScript, enhanced by AI-powered coding assistance."
author: "Michael Watts"
readTime: 10
tags: ["ai", "cursor", "vitest", "gherkin"]
---

Behaviour-Driven Development (BDD) helps us write tests that read like specifications, making them easier to understand and maintain. In this post, I'll explore how to write tests using Gherkin syntax with Vitest and TypeScript. I'll also look at how AI coding assistants like Cursor can help write tests but how to review the generated tests and write them more efficiently.

## What is Gherkin?

Gherkin is a plain-text language that uses a simple set of keywords to describe software behaviour. The most common keywords are:

- **Feature**: To describe the feature or scenario
- **Scenario**: To describe a specific scenario
- **Given**: To set up the initial context
- **When**: To describe an action
- **Then**: To assert the expected outcome
- **And**: To add additional context or actions

**Examples** can also be used to test multiple scenarios are written in a table format.

There are other keywords that can be used to describe the test, but these are the most common which I'll use in this post.

Here are a few practical examples of Gherkin syntax in action:

### Basic Example

```gherkin
Feature: Shopping Basket

  Scenario: Adding items to cart
    Given an empty shopping cart
    When the user adds a £10 book
    And the user adds a £2 pen
    Then the total should be £12

  Scenario: Applying valid discount code
    Given a logged-in user
    And an empty shopping cart
    When the user adds items worth £100
    And enters discount code "SAVE10"
    Then a 10% discount should be applied

  Scenario: Invalid discount code
    Given a logged-in user
    And an empty shopping cart
    When the user adds items worth £100
    And enters discount code "INVALID"
    Then no discount should be applied
```

### Using Background to set up the context

```gherkin
Feature: Shopping Cart Discounts
  Background:
    Given a logged-in user
    And an empty shopping cart

  Scenario: Applying valid discount code
    When the user adds items worth £100
    And enters discount code "SAVE10"
    Then a 10% discount should be applied
    And the final total should be £90

  Scenario: Invalid discount code
    When the user adds items worth £100
    And enters discount code "INVALID"
    Then no discount should be applied
    And the final total should be £100
```

### Scenario Outline with Examples

```gherkin
Feature: Bulk Discounts
  Scenario Outline: Volume-based discounts
    Given a shopping cart
    When the user adds <quantity> items at £<price> each
    Then the total should be £<total>
    And the discount should be <discount>%

    Examples:
      | quantity | price | total | discount |
      | 1        | 10    | 10    | 0        |
      | 5        | 10    | 45    | 10       |
      | 10       | 10    | 80    | 20       |
```

Most of these Gherkin scenarios can be translated into Vitest tests depending on the library you use.
The tests can be easily read by anyone and also they're AI-friendly meaning that tools like Cursor can learn the context and intent behind each step.

## Setting Up Our Test Environment

First, let's set up a simple project with Vitest and TypeScript. We'll need to install the necessary dependencies including Vitest, TypeScript, and the Node.js type definitions. Once set up, we can start writing our tests using the Gherkin syntax.

```bash
bash
npm init -y
npm install -D vitest typescript @types/node
```

Create a `vitest.config.ts`:

```ts
// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
  },
});
```

## Writing Our First Gherkin-Style Test

To demonstrate how to write Gherkin-style tests, we'll create a simple shopping basket calculator. This example will show how to structure tests that are both readable and maintainable. The key is to use clear, descriptive comments that follow the Given-When-Then pattern.

```ts
// src/ShoppingBasket.ts
export class ShoppingBasket {
  private items: { name: string; price: number }[] = [];

  addItem(name: string, price: number) {
    this.items.push({ name, price });
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }
}
```

```ts
// src/ShoppingBasket.test.ts
import { defineFeature, loadFeature } from "@amiceli/vitest-cucumber";
import { ShoppingBasket } from "./ShoppingBasket";

const feature = loadFeature("./features/shopping-basket.feature");

defineFeature(feature, (test) => {
  test("Adding items to cart", ({ given, when, then }) => {
    let basket: ShoppingBasket;

    given("an empty shopping cart", () => {
      basket = new ShoppingBasket();
    });

    when("the user adds a £10 book", () => {
      basket.addItem("book", 10);
    });

    when("the user adds a £2 pen", () => {
      basket.addItem("pen", 2);
    });

    then("the total should be £12", () => {
      expect(basket.getTotal()).toBe(12);
    });
  });

  test("Applying valid discount code", ({ given, when, then }) => {
    let basket: ShoppingBasket;
    let total: number;

    given("a logged-in user", () => {
      // Assume user is logged in
    });

    given("an empty shopping cart", () => {
      basket = new ShoppingBasket();
    });

    when("the user adds items worth £100", () => {
      basket.addItem("expensive item", 100);
    });

    when('enters discount code "SAVE10"', () => {
      total = basket.getTotal("SAVE10");
    });

    then("a 10% discount should be applied", () => {
      expect(total).toBe(90);
    });
  });

  test("Invalid discount code", ({ given, when, then }) => {
    let basket: ShoppingBasket;
    let total: number;

    given("a logged-in user", () => {
      // Assume user is logged in
    });

    given("an empty shopping cart", () => {
      basket = new ShoppingBasket();
    });

    when("the user adds items worth £100", () => {
      basket.addItem("expensive item", 100);
    });

    when('enters discount code "INVALID"', () => {
      total = basket.getTotal("INVALID");
    });

    then("no discount should be applied", () => {
      expect(total).toBe(100);
    });
  });
});
```

## Adding More Complex Scenarios

As our applications grow, we often need to test more complex scenarios. We'll extend our shopping basket example to handle discounts, showing how Gherkin-style tests can clearly describe business rules and edge cases.

```ts
// src/ShoppingBasket.ts
export class ShoppingBasket {
  private items: { name: string; price: number }[] = [];

  addItem(name: string, price: number) {
    this.items.push({ name, price });
  }

  getTotal(discountCode?: string) {
    const subtotal = this.items.reduce((sum, item) => sum + item.price, 0);

    if (discountCode === "SAVE10") {
      return subtotal * 0.9;
    }

    return subtotal;
  }
}
```

Here are our tests for the discount functionality:

```ts
// src/ShoppingBasket.test.ts

// existing content

test("Applying valid discount code", ({ given, when, then }) => {
  let basket: ShoppingBasket;
  let total: number;

  given("a logged-in user", () => {
    // Assume user is logged in
  });

  given("an empty shopping cart", () => {
    basket = new ShoppingBasket();
  });

  when("the user adds items worth £100", () => {
    basket.addItem("expensive item", 100);
  });

  when('enters discount code "SAVE10"', () => {
    total = basket.getTotal("SAVE10");
  });

  then("a 10% discount should be applied", () => {
    expect(total).toBe(90);
  });
});

test("Invalid discount code", ({ given, when, then }) => {
  let basket: ShoppingBasket;
  let total: number;

  given("a logged-in user", () => {
    // Assume user is logged in
  });

  given("an empty shopping cart", () => {
    basket = new ShoppingBasket();
  });

  when("the user adds items worth £100", () => {
    basket.addItem("expensive item", 100);
  });

  when('enters discount code "INVALID"', () => {
    total = basket.getTotal("INVALID");
  });

  then("no discount should be applied", () => {
    expect(total).toBe(100);
  });
});

// existing content
```

## Working with Tabular Data

Gherkin's Scenario Outline feature is particularly useful when testing multiple variations of the same behavior. Let's extend our shopping basket example to handle bulk discounts using tabular data:

```gherkin
Feature: Bulk Purchase Discounts
  Scenario Outline: Apply volume-based discounts
    Given an empty shopping cart
    When the user adds <quantity> items at £<price> each
    Then the total before discount should be £<subtotal>
    And the bulk discount should be <discount>%
    And the final total should be £<final>

    Examples:
      | quantity | price | subtotal | discount | final |
      | 1        | 10    | 10       | 0        | 10    |
      | 5        | 10    | 50       | 10       | 45    |
      | 10       | 10    | 100      | 20       | 80    |
```

Here's how we can implement this test using Vitest:

```ts
// src/ShoppingBasket.test.ts
import { describe, it, expect } from "vitest";
import { ShoppingBasket } from "./ShoppingBasket";

describe("Bulk Purchase Discounts", () => {
  const testCases = [
    { quantity: 1, price: 10, subtotal: 10, discount: 0, final: 10 },
    { quantity: 5, price: 10, subtotal: 50, discount: 10, final: 45 },
    { quantity: 10, price: 10, subtotal: 100, discount: 20, final: 80 },
  ];

  testCases.forEach(({ quantity, price, subtotal, discount, final }) => {
    it(`applies ${discount}% discount when buying ${quantity} items at £${price} each`, () => {
      // Given
      const basket = new ShoppingBasket();

      // When
      for (let i = 0; i < quantity; i++) {
        basket.addItem("test-item", price);
      }

      // Then
      expect(basket.getSubtotal()).toBe(subtotal);
      expect(basket.getBulkDiscount()).toBe(discount);
      expect(basket.getTotal()).toBe(final);
    });
  });
});
```

And here's the corresponding implementation:

```ts
// src/ShoppingBasket.ts
export class ShoppingBasket {
  private items: { name: string; price: number }[] = [];

  addItem(name: string, price: number) {
    this.items.push({ name, price });
  }

  getSubtotal() {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }

  getBulkDiscount() {
    const itemCount = this.items.length;
    if (itemCount >= 10) return 20;
    if (itemCount >= 5) return 10;
    return 0;
  }

  getTotal() {
    const subtotal = this.getSubtotal();
    const discount = this.getBulkDiscount();
    return subtotal * (1 - discount / 100);
  }
}
```

This approach makes it easy to test multiple scenarios without duplicating code. The tabular format clearly shows the relationship between inputs and expected outputs, making the tests more maintainable and easier to update when business rules change.

## How Cursor Helps

The beauty of writing tests in this way is that AI coding assistants like Cursor can understand the context and flow of your tests. When you write comments using Gherkin syntax, Cursor can:

1. Suggest appropriate test implementations based on your Given-When-Then statements
2. Help complete test scenarios based on similar patterns
3. Understand the business logic and suggest edge cases you might have missed

## Best Practices

When writing Gherkin-style tests:

1. Keep scenarios focused and specific
2. Use clear, business-oriented language
3. Maintain consistency in your Given-When-Then structure
4. Add context through descriptive test names
5. Group related scenarios in describe blocks

## Conclusion

Using Gherkin syntax in your Vitest tests not only makes them more readable and maintainable but also helps AI tools like Cursor understand your testing intentions better. This leads to more efficient test writing and better collaboration between developers and AI assistants.

Remember, the goal is to write tests that serve as living documentation of your system's behaviour. By following this approach, you create tests that are easy to understand, maintain and extend.
