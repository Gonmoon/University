import { initFavorites } from "./initFavorites.js";
import { initCart } from "./initCart.js";

const catalog = document.getElementById("catalog");

async function renderCatalog(items) {
    catalog.innerHTML = "";
    if (items.length === 0) {
        catalog.innerHTML = '<p class="no-products">Товары не найдены</p>';
        return;
    }

    items.forEach(item => {
        catalog.innerHTML += `
            <div class="catalog-cart"
                 data-name="${item.name}"
                 data-price="${item.price}₽"
                 data-description="${item.description}"
                 data-stock="${item.in_stock ? '✓ В наличии' : '✗ Нет в наличии'}"
                 data-style="${item.style}">
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

    function animateCounter(id, value) {
        const el = document.getElementById(id);
        if (!el) return;
        el.textContent = value;

        el.classList.remove('pop-animation');
        void el.offsetWidth;
        el.classList.add('pop-animation');
    }

    function updateCounters() {
        const favorites = JSON.parse(localStorage.getItem('favorite')) || [];
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        animateCounter('favorite-counter', favorites.length);
        animateCounter('cart-counter', cart.length);
    }

    function checkFavoritesStatus() {
        const buttons = catalog.querySelectorAll(".favorite");
        let favorites = JSON.parse(localStorage.getItem("favorite")) || [];

        catalog.addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains('favorite')) {
                const btn = e.target;
                const productId = btn.dataset.id;

                if (favorites.some(item => item.id === productId)) {
                    favorites = favorites.filter(item => item.id !== productId);
                    btn.textContent = "В избранное";
                } else {
                    const productData = { id: productId };
                    favorites.push(productData);
                    btn.textContent = "Убрать из избранного";
                }

                localStorage.setItem("favorite", JSON.stringify(favorites));
                updateCounters();
            }
        });

        buttons.forEach(btn => {
            const productId = btn.dataset.id;
            const isFavorite = favorites.some(item => item.id === productId);
            btn.textContent = isFavorite ? "Убрать из избранного" : "В избранное";
        });
    }

    function checkCartStatus() {
        const buttons = catalog.querySelectorAll(".cart");
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        catalog.addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains('cart')) {
                const btn = e.target;
                const productId = btn.dataset.id;

                if (cart.some(item => item.id === productId)) {
                    cart = cart.filter(item => item.id !== productId);
                    btn.textContent = "В корзину";
                } else {
                    const productData = { id: productId };
                    cart.push(productData);
                    btn.textContent = "Убрать из корзины";
                }

                localStorage.setItem("cart", JSON.stringify(cart));
                updateCounters();
            }
        });

        buttons.forEach(btn => {
            const productId = btn.dataset.id;
            const isInCart = cart.some(item => item.id === productId);
            btn.textContent = isInCart ? "Убрать из корзины" : "В корзину";
        });
    }

    checkFavoritesStatus();
    checkCartStatus();
    updateCounters(); 
    // await initFavorites();
    // await initCart();
}

export { renderCatalog };
