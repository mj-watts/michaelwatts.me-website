class RelativeColorSyntaxExample extends HTMLElement {
  #shadow: ShadowRoot | null = null;

  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (this.#shadow === null) return;

    this.#shadow.innerHTML = `
      <style>
        .relative-color-syntax-example {
          --background-color: hsl(0deg 0% 0%);
          --brand-color: hsl(300deg 75% 50%);
          --brand-color-light-1: hsl(from var(--brand-color) h s calc(l * 1.3));
          --brand-color-light-2: hsl(from var(--brand-color) h s calc(l * 1.4));
          --brand-color-light-3: hsl(from var(--brand-color) h s calc(l * 1.5));
        }

        .relative-color-syntax-example {
          width: 100%;
        }

        header, section {
          background: var(--brand-color);
          padding: 0 1rem;
          height: 12vh;
          display: flex;
          flex-direction: column;
          align-items: start;
          justify-content: center;
        }

        h1, h2, p {
          margin: 0;
        }

        h1, h2 {
          color: hsl(from var(--brand-color) h s calc(l * 1.5));
          mix-blend-mode: screen;
        }

        code {
          color: hsl(from var(--brand-color) h s calc(l * 0.65));
          mix-blend-mode: multiply;
          font-weight: bold;
          font-size: 0.9rem;
        }

        .bg-lighten-1 {
          background: var(--brand-color-light-1);
        }

        .bg-lighten-2 {
          background: var(--brand-color-light-2);
        }

        .bg-lighten-3 {
          background: var(--brand-color-light-3);
        }
      </style>
      <div class="relative-color-syntax-example">
        <header>
          <h1>A title</h1>
          <p><code>--brand-color: hsl(300deg 75% 50%)</code></p>
        </header>

        <section class="bg-lighten-1">
          <div>
            <h2>Section title 1</h2>
            <p><code>background: hsl(from var(--brand-color) h s calc(l * 1.3))</code></p>
          </div>
        </section>

        <section class="bg-lighten-2">
          <div>
            <h2>Section title 2</h2>
            <p><code>background: hsl(from var(--brand-color) h s calc(l * 1.4))</code></p>
          </div>
        </section>

        <section class="bg-lighten-3">
          <div>
            <h2>Section title 3</h2>
            <p><code>background: hsl(from var(--brand-color) h s calc(l * 1.5))</code></p>
          </div>
        </section>
      </div>
    `;
  }
}

customElements.define(
  "relative-color-syntax-example",
  RelativeColorSyntaxExample
);
