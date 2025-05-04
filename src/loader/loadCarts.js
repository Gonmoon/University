import "../styles/catalog/style.scss";
import { renderPagination } from "../utils/catalog/renderPagination.js";
import { API_URL, FAVORITES_URL, CART_URL, ORDER_URL } from "../api/api.js";

import { initPopup } from "../utils/initPopup.js"
import { ComponentPopup } from "../components/component-popup.js";
customElements.define("widget-popup", ComponentPopup);

document.addEventListener("DOMContentLoaded", () => {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
   
    if(cart.length === 0) {
      const catalog = document.getElementById("catalog");
      catalog.innerHTML = '<p class="no-products">Товары не найдены</p>';
    } else {
      const ids = cart.map(item => item.id);
      const query = `?${ids.map(id => `id=${id}`).join('&')}`;
      renderPagination(true, query, 1, API_URL);
    }

    const order = document.getElementById("order")    
    order.addEventListener("click", () => {
        const ids = cart.map(item => item.id);
        const query = `?${ids.map(id => `id=${id}`).join('&')}`;
        fetch(`${API_URL}${query}`)
            .then(response => response.json())
            .then(products => {
                let info = "<div class=\"order\">";
    
                const productNames = products.map(product => product.name);
    
                productNames.forEach((name, index) => {
                    info += `
                        <div class="order__product">
                            <p class="order__name">${name}</p>
                            <input type="number" min="1" max="40" step="1" value="1" 
                                   class="order__input" data-price="${products[index].price}"
                                   onchange="updateTotal()">
                        </div>
                    `;
                })
    
                info += `<hr class="order__hr">`;
    
                const initialTotal = products.reduce((sum, product) => sum + product.price, 0);
                info += `
                    <div class="order__info">
                        <p class="order__sum">Итого: <span id="total-sum">${initialTotal}</span>₽</p>
                        <span class="order__span" id="result"></span>
                    </div>
                    <button class="order__button" id="execute">Заказать</button>
                </div>`;

                initPopup("Оформление заказа", info);

                window.updateTotal = function() {
                    const inputs = document.querySelectorAll('.order__input');
                    let total = 0;
                    
                    inputs.forEach(input => {
                        const quantity = parseInt(input.value) || 0;
                        const price = parseFloat(input.dataset.price) || 0;
                        total += quantity * price;
                    });
                    
                    document.getElementById('total-sum').textContent = total;
                };

                const execute = document.getElementById("execute");

                execute.addEventListener("click", () => {
                    const result = document.getElementById("result");
                    result.innerHTML = "Заказ оформлен";
                    execute.style.display = "none";

                    const user = JSON.parse(localStorage.getItem("user") || "{}");
                    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
                    
                    fetch(`${ORDER_URL}${query}`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        [user.nickname]: cart
                      })
                    });

                    localStorage.removeItem("cart");
                    const catalog = document.getElementById("catalog");
                    catalog.innerHTML = '<p class="no-products">Товары не найдены</p>';
                });
            })
    });
})