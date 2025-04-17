import "../styles/catalog/style.scss";
import { renderPagination } from "../utils/catalog/renderPagination.js";
import { API_URL, FAVORITES_URL, CART_URL } from "../api/api.js";

import { initPopup } from "../utils/initPopup.js"
import { ComponentPopup } from "../components/component-popup.js";
customElements.define("widget-popup", ComponentPopup);


document.addEventListener("DOMContentLoaded", () => {
    renderPagination(true, "", 1, CART_URL);

    const order = document.getElementById("order")    
    order.addEventListener("click", () => {
        fetch(CART_URL)
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

                    fetch(CART_URL)
                       .then(response => response.json())
                       .then(cartItems => {
                            const deleteRequests = cartItems.map(item => 
                                fetch(`${CART_URL}/${item.id}`, {
                                  method: "DELETE"
                                }).then(res => {
                                  if (!res.ok) {
                                    throw new Error(`Ошибка при удалении товара ${item.id}`);
                                  }
                                  return res;
                                })
                            );
                            
                            return Promise.all(deleteRequests);
                        })
                        .then(() => {
                            renderPagination(true, "", 1, CART_URL);
                        });
                });
            })
    });
})