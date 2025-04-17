import "./styles/main/style.scss"
import "./styles/main/tablet-style.scss"
import "./styles/main/phone-style.scss"

import { ComponentHeader } from "./components/component-header.js";
import { ComponentFooter } from "./components/component-footer.js";

customElements.define("widget-header", ComponentHeader);
customElements.define("widget-footer", ComponentFooter);

import { initBurger } from "./utils/initBurger.js";

document.addEventListener("DOMContentLoaded", () => {
  initBurger();
})