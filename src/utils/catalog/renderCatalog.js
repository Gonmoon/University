import { initFavorites } from "./initFavorites.js";
import { initCart } from "./initCart.js";
// import { initPopup } from "../initPopup.js"; // Убрать

const catalog = document.getElementById("catalog");

async function renderCatalog(items) {
    catalog.innerHTML = "";
    if (items.length === 0) {
        catalog.innerHTML = '<p class="no-products">Товары не найдены</p>';
        return;
    }

    items.forEach(item => {
        catalog.innerHTML += `
            <div class="catalog-cart">
                <img src="${item.photo_url || "https://via.placeholder.com/250"}" alt="product" class="catalog-cart__img">
                <div class="catalog-cart__text-wrapper">
                    <p class="catalog-cart__name">${item.name}</p>
                    <p class="catalog-cart__price">${item.price}₽</p>
                </div>
                <p class="catalog-cart__description">${item.description}</p>
                <p>${item.in_stock ? "✓ В наличии" : "✗ Нет в наличии"}</p>
                <p>Стиль: ${item.style}</p>
                <div class="catalog-cart__buttons">
                    <button class="catalog-cart__button favorite" data-id="${item.id}"></button>
                    <button class="catalog-cart__button cart" data-id="${item.id}">В корзину</button>
                </div>
            </div>
        `;
    });

    await initFavorites();
    await initCart();

    // Доделать
    // catalog.querySelectorAll(".cart").forEach(btn => {
    //     btn.addEventListener("click", (e) => {
    //         // addToCart(e.target.dataset.id);
    //         initPopup("Что-то", "Готово");
    //     });
    // })
}

export { renderCatalog };