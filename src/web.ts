// Outputs placeholder image as a data URI, and three images with 100, 200, and 300px widths
const responsiveImage = require("./img/one.jpg?placeholder=true&sizes[]=200,sizes[]=363,sizes[]=486,sizes[]=591,sizes[]=680,sizes[]=764,sizes[]=853,sizes[]=922,sizes[]=993");


class MyComponent extends HTMLElement {
  [x: string]: any;

  static get observedAttributes() {
    return ["text"];
  }
  constructor() {
    super();
  }
  connectedCallback() {
    this.attachShadow({ mode: "open" }).innerHTML = `<style>
      h1 {color:var(--wc-color, green);}
      </style>
      
      <img
sizes="(max-width: 1024px) 100vw, auto"
srcset="${responsiveImage.srcSet}"
src="${responsiveImage.src}"
alt="">


      <h1>${this.text} Hello world! from inside web component</h1>`;
  }
  attributeChangedCallback(attr, oldValue, newValue) {
    this[attr] = newValue;
  }
}
window.customElements.define("my-component", MyComponent);
