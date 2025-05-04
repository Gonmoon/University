import "../styles/catalog/style.scss";
import { renderPagination } from "../utils/catalog/renderPagination.js";
import { API_URL, FAVORITES_URL, CART_URL } from "../api/api.js";

document.addEventListener("DOMContentLoaded", () => {
  const favorites = JSON.parse(localStorage.getItem("favorite")) || [];
  
  if(favorites.length === 0) {
    const catalog = document.getElementById("catalog");
    catalog.innerHTML = '<p class="no-products">Товары не найдены</p>';
  } else {
    const ids = favorites.map(item => item.id);
    const query = `?${ids.map(id => `id=${id}`).join('&')}`;
    renderPagination(true, query, 1, API_URL);
  }
})