enum ToggleThemeMode {
  Light = "light",
  Dark = "dark",
}

class ToggleTheme extends HTMLElement {
  #shadow: ShadowRoot | null = null;
  #mode: string = ToggleThemeMode.Light;
  #html: HTMLElement | null = null;
  #icon: HTMLElement | null | undefined = null;

  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: "open" });
  }

  toggleMode() {
    if (this.#mode === ToggleThemeMode.Dark) {
      this.#mode = ToggleThemeMode.Light;
    } else {
      this.#mode = ToggleThemeMode.Dark;
    }
  }

  toggleLocalStorage() {
    if (this.#mode === ToggleThemeMode.Dark) {
      localStorage.setItem("theme", ToggleThemeMode.Dark);
    } else {
      localStorage.removeItem("theme");
    }
  }

  toggleHtmlClass() {
    if (this.#mode === ToggleThemeMode.Dark) {
      this.#html?.classList.add(ToggleThemeMode.Dark);
    } else {
      this.#html?.classList.remove(ToggleThemeMode.Dark);
    }
  }

  toggleSelfClass() {
    const toggleThemeElement = document.querySelector("toggle-theme");

    const button =
      toggleThemeElement?.shadowRoot?.getElementById("toggle-theme");

    if (this.#mode === ToggleThemeMode.Dark) {
      button?.classList.add(ToggleThemeMode.Dark);
    } else {
      button?.classList.remove(ToggleThemeMode.Dark);
    }
  }

  toggleIcon() {
    const toggleThemeElement = document.querySelector("toggle-theme");
    const button =
      toggleThemeElement?.shadowRoot?.getElementById("toggle-theme");

    this.#icon = toggleThemeElement?.shadowRoot?.querySelector("#icon");

    if (this.#icon === null || this.#icon === undefined) return;

    button?.classList.add("animating");

    setTimeout(() => {
      if (this.#icon !== null && this.#icon !== undefined) {
        this.#icon.innerHTML = `<use href="#${this.#mode}" />`;
      }
    }, 500);

    setTimeout(() => {
      button?.classList.remove("animating");
      button?.classList.add("done-animating");
    }, 1000);

    setTimeout(() => {
      button?.classList.remove("done-animating");
    }, 1500);
  }

  connectedCallback() {
    if (this.#shadow === null) return;

    this.#html = document.querySelector("html");

    if (localStorage.getItem("theme") === ToggleThemeMode.Dark) {
      this.#mode = ToggleThemeMode.Dark;
    } else {
      this.#mode = ToggleThemeMode.Light;
    }

    this.toggleHtmlClass();
    this.toggleSelfClass();

    this.#shadow.innerHTML = `
      <style>
        #toggle-theme {
          --icon-background-color-dark: #081d73;
          --icon-background-color-light: #44b7e6;
          --icon-color: #F0E68C;
          --icon-color-darker: #FFC72C;
        }
        #toggle-theme {
          background: var(--icon-background-color-light);
          transition: background-color 0.3s ease;
          border-radius: 50%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          width: 26px;
          height: 26px;
          padding: 0;
          box-shadow: 0 1px 1px 0 rgb(from var(--icon-color) r g b / 0.3) inset;
        }
        #toggle-theme.dark {
          background: var(--icon-background-color-dark);
        }
        #toggle-theme:hover {
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
        #toggle-theme.animating {
          animation: glow 1s;
        }
        #toggle-theme.done-animating {
          animation: none;
        }
        #toggle-theme.animating .icon-container {
          animation: move 1s;
        }
        #toggle-theme.done-animating .icon-container {
          animation: none;
        }
        .icon {
          width: 18px;
          height: 18px;
          transition: fill 0.3s ease;
          fill: var(--icon-color);
        }
        #toggle-theme.dark .icon {
          fill: var(--icon-color-darker);
        }
        #toggle-theme:hover {
          background-filter: brightness(1.2);
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
        @keyframes glow {
          0% {
            transform: scale(1);
            box-shadow: 0 0 1px 1px rgb(from var(--icon-color) r g b / 0) inset;
          }
          50% {
            transform: scale(1.2);
            box-shadow: 0 1px 1px 0 rgb(from var(--icon-color) r g b / 0) inset;
          }
          100% {
            transform: scale(1);
            box-shadow: 0 1px 1px 0 rgb(from var(--icon-color) r g b / 0.3) inset;
          }
        }
      </style>
      <button
        id="toggle-theme"
        aria-label="Toggle light/dark mode"
        class="${this.#mode}"
      >
        <div class="icon-container">
          <svg id="icon" class="icon">
            <use href="#${this.#mode}" />
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
    `;

    this.#shadow.addEventListener("click", () => {
      this.toggleMode();
      this.toggleLocalStorage();
      this.toggleHtmlClass();
      this.toggleSelfClass();
      this.toggleIcon();
    });
  }
}

customElements.define("toggle-theme", ToggleTheme);
