class HelloWorld extends HTMLElement {
  name: string;

  constructor() {
    super();

    this.name = "World";
  }

  static get observedAttributes() {
    return ["name"];
  }

  attributeChangedCallback(
    property: string,
    oldValue: string,
    newValue: string
  ) {
    if (oldValue === newValue) return;
    (this as any)[property] = newValue;
  }

  connectedCallback() {
    this.textContent = `Hello ${this.name}!`;
  }
}

customElements.define("hello-world", HelloWorld);
