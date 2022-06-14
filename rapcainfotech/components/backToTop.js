const backToTopTemplate = document.createElement("template");

class backToTop extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
    <a href="#main-wrapper" id="backto-top" class="back-to-top">
        <i class="far fa-angle-double-up"></i>
    </a>
    `;
  }
}

customElements.define("backtotop-component", backToTop);
