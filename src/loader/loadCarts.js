import "../styles/catalog/style.scss";
import { renderPagination } from "../utils/catalog/renderPagination.js";
import { API_URL, FAVORITES_URL, CART_URL } from '../api/api.js';
import { ComponentPopup } from "../components/component-popup.js";

customElements.define("widget-popup", ComponentPopup);

document.addEventListener("DOMContentLoaded", () => {
  renderPagination(true, "", 1, CART_URL);
})