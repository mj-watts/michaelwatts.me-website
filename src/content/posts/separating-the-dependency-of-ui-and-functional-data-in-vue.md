---
title: "Separating UI and Functional Data Dependencies in Vue"
pubDate: 2025-02-13
description: "Learn how to cleanly separate user interface state from business logic in Vue applications using the Composition API, improving maintainability and testing."
readTime: 8
author: "Michael Watts"
tags: ["vue", "composition api", "architecture", "state management"]
---

One of the most common architectural challenges in Vue applications is properly separating user interface concerns from business logic. When UI state and functional data become tightly coupled, it leads to components that are difficult to test, maintain, and reason about.

In this post, I'll demonstrate a practical approach to decoupling UI state from functional data in Vue applications, making your code more modular and maintainable.

## The Problem: Tightly Coupled State

Let's start with a common scenario—a user profile component that allows updating an email address. Here's how this might initially look:

```ts
// store.ts - Initial approach with mixed concerns
const store = createStore({
  state: {
    email: "",
  },
});
```

```vue
<!-- UserProfile.vue - Tightly coupled approach -->
<script setup lang="ts">
import { useStore } from "@/store";

const store = useStore();

const updateEmail = async (email: string) => {
  // Mixing UI interaction with business logic
  await fetch("/api/user/email", {
    method: "PUT",
    body: JSON.stringify({
      email: store.state.email,
    }),
  });
};
</script>

<template>
  <button @click="updateEmail">{{ store.state.email }}</button>
</template>
```

```ts
// actions.ts - Direct state mutation
export function updateEmail(email: string) {
  store.state.email = email;
}
```

## The Issue with This Approach

This implementation suffers from several problems:

1. **Mixed responsibilities**: The component handles both UI concerns (button interactions) and business logic (API calls)
2. **Testing difficulties**: It's challenging to test the email update logic without involving the UI
3. **Tight coupling**: Changes to the UI state directly affect the functional data
4. **Reusability concerns**: The email update logic is bound to this specific component structure

## The Solution: Separate UI and Functional Stores

Here's a cleaner approach that separates UI state from functional data:

```ts
// stores/index.ts - Separated concerns
import { reactive } from "vue";

// UI-specific state - handles form interactions, loading states, etc.
export const uiStore = reactive({
  emailInputValue: "",
  isSubmitting: false,
  showValidationError: false,
  isEmailFieldFocused: false,
});

// Functional/business data - represents the actual application state
export const dataStore = reactive({
  email: "",
  lastUpdated: null as Date | null,
});

// Business logic function - pure and testable
export async function updateUserEmail(): Promise<boolean> {
  if (!uiStore.emailInputValue.trim()) {
    uiStore.showValidationError = true;
    return false;
  }

  uiStore.isSubmitting = true;
  uiStore.showValidationError = false;

  try {
    const response = await fetch("/api/user/email", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: uiStore.emailInputValue,
      }),
    });

    if (response.ok) {
      // Update functional data only after successful API call
      dataStore.email = uiStore.emailInputValue;
      dataStore.lastUpdated = new Date();

      // Reset UI state
      uiStore.emailInputValue = "";
      return true;
    }

    throw new Error("Failed to update email");
  } catch (error) {
    uiStore.showValidationError = true;
    return false;
  } finally {
    uiStore.isSubmitting = false;
  }
}
```

```vue
<!-- UserProfile.vue - Clean separation -->
<script setup lang="ts">
import { uiStore, dataStore, updateUserEmail } from "@/stores";

const handleEmailUpdate = async () => {
  const success = await updateUserEmail();
  if (success) {
    // Handle success (e.g., show toast notification)
    console.log("Email updated successfully");
  }
};
</script>

<template>
  <div class="user-profile">
    <p>Current email: {{ dataStore.email }}</p>

    <div class="email-form">
      <input
        v-model="uiStore.emailInputValue"
        :disabled="uiStore.isSubmitting"
        @focus="uiStore.isEmailFieldFocused = true"
        @blur="uiStore.isEmailFieldFocused = false"
        placeholder="Enter new email"
        class="email-input"
      />

      <button
        @click="handleEmailUpdate"
        :disabled="uiStore.isSubmitting || !uiStore.emailInputValue.trim()"
        class="update-button"
      >
        {{ uiStore.isSubmitting ? "Updating..." : "Update Email" }}
      </button>

      <div v-if="uiStore.showValidationError" class="error-message">
        Please enter a valid email address
      </div>
    </div>
  </div>
</template>
```

## Benefits of This Approach

### 1. **Clear Separation of Concerns**

- `uiStore` handles presentation logic: loading states, form values, validation messages
- `dataStore` represents the actual application state: user data, timestamps
- Business logic functions are pure and focused on a single responsibility

### 2. **Improved Testability**

```ts
// Easy to test business logic in isolation
import { updateUserEmail, dataStore, uiStore } from "@/stores";

describe("updateUserEmail", () => {
  it("should update email when valid input provided", async () => {
    uiStore.emailInputValue = "test@example.com";
    const result = await updateUserEmail();

    expect(result).toBe(true);
    expect(dataStore.email).toBe("test@example.com");
  });
});
```

### 3. **Enhanced Maintainability**

- UI changes don't affect business logic
- Business logic changes don't require UI modifications
- Each store has a single, well-defined purpose

### 4. **Better Developer Experience**

- Clear understanding of what each piece of state represents
- Easier debugging with separated concerns
- More predictable state updates

## Conclusion

By separating UI state from functional data, we create Vue applications that are more maintainable, testable, and scalable. The key is to think of UI state as ephemeral presentation concerns (loading spinners, form values, error messages) whilst treating functional data as the core truth of your application.

This pattern works particularly well with Vue's Composition API and reactive system, allowing you to create clean, focused stores that serve specific purposes without unnecessary coupling.
