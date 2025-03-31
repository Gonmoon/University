// Main
import './styles/main/style.scss'
import './styles/main/tablet-style.scss'
import './styles/main/phone-style.scss'

import { ComponentHeader } from './components/component-header.js';
import { ComponentFooter } from './components/component-footer.js';

import { initBurger } from './burger.js'

customElements.define('widget-header', ComponentHeader);
customElements.define('widget-footer', ComponentFooter);

document.addEventListener('DOMContentLoaded', () => {
  initBurger()
})

// Catalog
import './styles/catalog/style.scss'

const catalog = document.getElementById('catalog');
const search = document.getElementById('search');
const sort = document.getElementById('sort');
const reset = document.getElementById('reset');

let products = [];

      const sortByNameBtn = document.getElementById('sortByName');
        const sortByPriceAscBtn = document.getElementById('sortByPriceAsc');
        const sortByPriceDescBtn = document.getElementById('sortByPriceDesc');
        const filterExpensiveBtn = document.getElementById('filterExpensive');
        const filterCheapBtn = document.getElementById('filterCheap');
        const filterInStockBtn = document.getElementById('filterInStock');
        const mapPricesBtn = document.getElementById('mapPrices');
        const uniqueStylesBtn = document.getElementById('uniqueStyles');
        const totalValueBtn = document.getElementById('totalValue');

async function loadCatalog() {
    try {
        const response = await fetch('http://localhost:3000/design_products');
        const json = await response.json();
        products = json;
        renderCatalog(products);
    } catch (error) {
        console.error("Ошибка загрузки данных", error);
    }
}

function renderCatalog(items) {
    catalog.innerHTML = '';
    if (items.length === 0) {
        catalog.innerHTML = '<p class="no-products">Товары не найдены</p>';
        return;
    }
    items.forEach(item => {
        catalog.innerHTML += `
            <div class="catalog-cart">
                <img src="${item.photo_url || 'https://via.placeholder.com/250'}" alt="product" class="catalog-cart__img">
                <div class="catalog-cart__text-wrapper">
                    <p class="catalog-cart__name">${item.name}</p>
                    <p class="catalog-cart__price">${item.price.toLocaleString()}₽</p>
                </div>
                <p class="catalog-cart__description">${item.description}</p>
                <p>${item.in_stock ? '✓ В наличии' : '✗ Нет в наличии'}</p>
                <p>Стиль: ${item.style}</p>
            </div>
        `;
    });
}

search.addEventListener('input', (e) => {
    const value = search.value.toLowerCase();
    if (value === '') return renderCatalog(products);
    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(value) || 
        product.description.toLowerCase().includes(value)
    );
    renderCatalog(filtered);
});

sort.addEventListener('change', (e) => {
    const sorted = [...products].sort((a, b) => {
        if (sort.value === "name") return a.name.localeCompare(b.name);
        if (sort.value === "price") return a.price - b.price;
        if (sort.value === "style") return a.style.localeCompare(b.style);
        return 0;
    });
    renderCatalog(sorted);
});

reset.addEventListener('click', (e) => {
    search.value = "";
    sort.value = "default";
    renderCatalog(products);
});

sortByNameBtn.addEventListener('click', () => {
    const sorted = [...products].sort((a, b) => a.name.localeCompare(b.name));
    renderCatalog(sorted);
});

sortByPriceAscBtn.addEventListener('click', () => {
    const sorted = [...products].sort((a, b) => a.price - b.price);
    renderCatalog(sorted);
});

sortByPriceDescBtn.addEventListener('click', () => {
    const sorted = [...products].sort((a, b) => b.price - a.price);
    renderCatalog(sorted);
});

filterExpensiveBtn.addEventListener('click', () => {
    const filtered = products.filter(product => product.price > 50000);
    renderCatalog(filtered);
});

filterCheapBtn.addEventListener('click', () => {
    const filtered = products.filter(product => product.price < 10000);
    renderCatalog(filtered.length ? filtered : [{name: "Нет дешевых товаров", description: "Попробуйте другие фильтры"}]);
});

filterInStockBtn.addEventListener('click', () => {
    const filtered = products.filter(product => product.in_stock);
    renderCatalog(filtered);
});

mapPricesBtn.addEventListener('click', () => {
    const discounted = products.map(product => ({
        ...product,
        price: Math.round(product.price * 0.8),
        description: `${product.description} (Скидка 20%!)`
    }));
    renderCatalog(discounted);
});

totalValueBtn.addEventListener('click', () => {
    const total = products.reduce((sum, product) => sum + product.price, 0);
 
    catalog.innerHTML = `<p class="full-price">${total}₽</p>`;
});

loadCatalog();