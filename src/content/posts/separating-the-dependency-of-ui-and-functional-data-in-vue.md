---
title: "Separating the dependency of UI and functional data in Vue"
pubDate: 2025-02-13
description: "Separating the dependency of UI and functional data in Vue"
previewImage:
  url: "/posts/function-ui-data-separation.png"
  url2x: "/posts/function-ui-data-separation@2x.png"
  url3x: "/posts/function-ui-data-separation@3x.png"
  alt: "Separating UI and functional data"
author: "Michael Watts"
tags: ["vue", "composition api"]
---

In this post I'll show a way to separate the dependency of UI and functional data in Vue.

Let's say we have a dashboard that displays a user profile button.

```ts
// store.ts
const store = createStore({
  state: {
    email: "",
  },
});
```

```vue
<script setup lang="ts">
import { store } from "@/store";

const store = useStore();

const updateEmail = async (email: string) => {
  await fetch.put("/api/user/email", {
    method: "PUT",
    body: {
      email: store.state.email,
    },
  });
};
</script>

<template>
  <button @click="updateEmail">{{ store.state.email }}</button>
</template>
```

```ts
//action.ts
export function updateEmail(email: string) {
  store.state.email = email;
}
```

```ts
// store.js
import { reactive } from "vue";

export const uiStore = reactive({
  emailInputValue: "",
});

export const dataStore = reactive({
  email: "",
});

export function updateEmail() {
  dataStore.email = uiStore.emailInputValue;
  // POST email to server
}
```
