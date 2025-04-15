import "./styles/main/style.scss"
import "./styles/main/tablet-style.scss"
import "./styles/main/phone-style.scss"

import { ComponentHeader } from "./components/component-header.js";
import { ComponentFooter } from "./components/component-footer.js";
import { ComponentPopup } from "./components/component-popup.js";

customElements.define("widget-header", ComponentHeader);
customElements.define("widget-footer", ComponentFooter);
customElements.define("widget-popup", ComponentPopup);


import { initCatalog } from "./utils/catalog/initCatalog.js";
import { initBurger } from "./utils/initBurger.js";

document.addEventListener("DOMContentLoaded", () => {
  initBurger();
  initCatalog();
})