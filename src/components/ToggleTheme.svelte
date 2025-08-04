<script lang="ts">
  const ToggleThemeMode = {
    Light: "light",
    Dark: "dark",
  } as const;

  type ToggleThemeModeType =
    (typeof ToggleThemeMode)[keyof typeof ToggleThemeMode];

  let mode = $state<ToggleThemeModeType>(ToggleThemeMode.Light);
  let button = $state<HTMLButtonElement | null>(null);
  let icon = $state<SVGSVGElement | null>(null);

  $effect(() => {
    if (localStorage.getItem("theme") === ToggleThemeMode.Dark) {
      mode = ToggleThemeMode.Dark;
    } else {
      mode = ToggleThemeMode.Light;
    }

    toggleHtmlClass();
    toggleButtonClass();
    button?.classList.remove("animating");
    button?.classList.remove("done-animating");
  });

  function handleClick(event: MouseEvent) {
    toggleMode();
    toggleLocalStorage();
    toggleHtmlClass();
    toggleButtonClass();
    setAnimationClass();
    toggleIcon();
  }

  function toggleMode() {
    if (mode === ToggleThemeMode.Dark) {
      mode = ToggleThemeMode.Light;
    } else {
      mode = ToggleThemeMode.Dark;
    }
  }

  function toggleLocalStorage() {
    if (mode === ToggleThemeMode.Dark) {
      localStorage.setItem("theme", ToggleThemeMode.Dark);
    } else {
      localStorage.removeItem("theme");
    }
  }

  function toggleHtmlClass() {
    if (mode === ToggleThemeMode.Dark) {
      document.documentElement.classList.add(ToggleThemeMode.Dark);
    } else {
      document.documentElement.classList.remove(ToggleThemeMode.Dark);
    }
  }

  function toggleButtonClass() {
    if (mode === ToggleThemeMode.Dark) {
      button?.classList.add(ToggleThemeMode.Dark);
    } else {
      button?.classList.remove(ToggleThemeMode.Dark);
    }
  }

  function setAnimationClass() {
    if (!button) {
      console.warn("Button element is null");
      return;
    }

    button?.classList.add("animating");

    setTimeout(() => {
      button?.classList.remove("animating");
      button?.classList.add("done-animating");
    }, 1000);

    setTimeout(() => {
      button?.classList.remove("done-animating");
    }, 1500);
  }

  function toggleIcon() {
    setTimeout(() => {
      if (icon !== null && icon !== undefined) {
        icon.innerHTML = `<use href="#${mode}" />`;
      }
    }, 500);
  }
</script>

<button
  id="toggle-theme"
  aria-label="Toggle light/dark mode"
  class="done-animating animating dark hover:scale-125"
  bind:this={button}
  onclick={handleClick}
>
  <div class="icon-container">
    <svg id="icon" class="icon" bind:this={icon}>
      <use href={`#${mode}`} />
    </svg>
  </div>
</button>
<svg xmlns="http://www.w3.org/2000/svg" class="hidden">
  <symbol id="light" viewBox="0 0 16 16">
    <path
      d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"
    />
  </symbol>
  <symbol id="dark" viewBox="0 0 16 16">
    <path
      d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"
    />
  </symbol>
</svg>

<style>
  button {
    --icon-color: var(--color-brand-50);
    background: var(--color-brand-400);
    transition:
      background-color 0.3s ease,
      transform 0.3s ease;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    width: 26px;
    height: 26px;
    padding: 0;
    transition: transform 0.3s ease;
  }
  button.dark {
    --icon-color: var(--color-brand-400);
    background: var(--color-brand-950);
  }
  button:hover {
    cursor: pointer;
  }
  .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    overflow: hidden;
    transform: scale(0.8);
  }
  .animating {
    animation: scaleup 1s;
  }
  button.done-animating {
    animation: none;
  }
  button.animating .icon-container {
    animation: move 1s;
  }
  button.done-animating .icon-container {
    animation: none;
  }
  .icon {
    width: 18px;
    height: 18px;
    transition: fill 0.3s ease;
    fill: var(--icon-color);
  }
  button.dark .icon {
    fill: var(--icon-color);
  }
  .hidden {
    display: none;
  }
  @keyframes move {
    0% {
      transform: translateX(0) scale(0.8);
    }
    50% {
      transform: translateX(100%) translateY(-50%) scale(0.2);
    }
    50.001% {
      transform: translateX(-35%) translateY(15%) scale(0.8);
    }
    100% {
      transform: translateX(0) scale(0.8);
    }
  }
  @keyframes scaleup {
    0% {
      transform: scale(1);
      box-shadow: 0 0 1px 1px rgb(from var(--icon-color) r g b / 0) inset;
    }
    50% {
      transform: scale(1.5);
      box-shadow: 0 1px 1px 0 rgb(from var(--icon-color) r g b / 0) inset;
    }
    100% {
      transform: scale(1);
      box-shadow: 0 1px 1px 0 rgb(from var(--icon-color) r g b / 0.3) inset;
    }
  }
</style>
