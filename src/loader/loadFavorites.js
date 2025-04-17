import "../styles/catalog/style.scss";
import { renderPagination } from "../utils/catalog/renderPagination.js";
import { API_URL, FAVORITES_URL, CART_URL } from '../api/api.js';

document.addEventListener("DOMContentLoaded", () => {
  renderPagination(true, "", 1, FAVORITES_URL);
})