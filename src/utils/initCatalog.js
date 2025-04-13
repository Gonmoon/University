import "../styles/catalog/style.scss";
import { initFavorites } from "./initFavorites.js";
import { initPopup } from "./initPopup.js"; // Убрать
// import { renderPagination } from "./renderPagination.js";
import { API_URL, FAVORITES_URL, CART_URL } from '../api/api.js';

const catalog = document.getElementById("catalog");

const search = document.getElementById("search");
const sort = document.getElementById("sort");
const reset = document.getElementById("reset");
const sortCategory = document.getElementById("sortCategory");

const sortByNameBtn = document.getElementById("sortByName");
const sortByPriceAscBtn = document.getElementById("sortByPriceAsc");
const sortByPriceDescBtn = document.getElementById("sortByPriceDesc");
const filterExpensiveBtn = document.getElementById("filterExpensive");
const filterCheapBtn = document.getElementById("filterCheap");
const filterInStockBtn = document.getElementById("filterInStock");
const mapPricesBtn = document.getElementById("mapPrices");
const uniqueStylesBtn = document.getElementById("uniqueStyles");
const totalValueBtn = document.getElementById("totalValue");

let products = [];

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

    // Доделать
    catalog.querySelectorAll(".cart").forEach(btn => {
        btn.addEventListener("click", (e) => {
            // addToCart(e.target.dataset.id);
            initPopup("Что-то", "Готово");
        });
    })
}

async function fetchAndRenderProducts(queryParams = "") {
    try {
        const response = await fetch(`${API_URL}${queryParams}`);
        const products = await response.json();
        let totalPage = (Math.ceil(products.length / 10));

        const answer = await renderPagination(totalPage, products, queryParams);
        const productsPage = await answer.json();
        await renderCatalog(productsPage);
    } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
    }
}

async function initSorting() {
    search.addEventListener("input", async (e) => {
        const value = search.value.toLowerCase();
        if (value === "") return fetchAndRenderProducts();
        
        try {
            const response = await fetch(`${API_URL}?q=${value}`);
            const filtered = await response.json();
            renderCatalog(filtered);
        } catch (error) {
            console.error("Ошибка при поиске:", error);
        }
    });
    
    sort.addEventListener("change", async (e) => {
        let sortParam = "";
        if (sort.value === "name") sortParam = "_sort=name&_order=asc";
        if (sort.value === "price") sortParam = "_sort=price&_order=asc";
        if (sort.value === "style") sortParam = "_sort=style&_order=asc";
        
        fetchAndRenderProducts(sortParam ? `?${sortParam}` : "");
    });

    sortCategory.addEventListener("change", (e) => {
    const selectedCategory = e.target.value;
        let queryParams = "";
        
        if (selectedCategory !== "all") {
            queryParams = `?category=${selectedCategory}`;
        }
        
        fetchAndRenderProducts(queryParams);
    });

    reset.addEventListener("click", (e) => {
        search.value = "";
        sort.value = "default";
        fetchAndRenderProducts();
    });
    
    sortByNameBtn.addEventListener("click", () => {
        fetchAndRenderProducts("?_sort=name&_order=asc");
    });
    
    sortByPriceAscBtn.addEventListener("click", () => {
        fetchAndRenderProducts("?_sort=price&_order=asc");
    });
    
    sortByPriceDescBtn.addEventListener("click", () => {
        fetchAndRenderProducts("?_sort=price&_order=desc");
    });
    
    filterExpensiveBtn.addEventListener("click", () => {
        fetchAndRenderProducts("?price_gte=50000");
    });
    
    filterCheapBtn.addEventListener("click", async () => {
        fetchAndRenderProducts("?price_lte=10000");
    });
    
    filterInStockBtn.addEventListener("click", () => {
        fetchAndRenderProducts("?in_stock=true");
    });
    
    mapPricesBtn.addEventListener("click", async () => {
        try {
            const response = await fetch(API_URL);
            const products = await response.json();
            
            await Promise.all(products.map(async product => {
                await fetch(`${API_URL}/${product.id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        price: Math.round(product.price * 0.8),
                        description: `${product.description}`
                    })
                });
            }));
            
            fetchAndRenderProducts();
        } catch (error) {
            console.error("Ошибка при обновлении цен:", error);
        }
    });
    
    totalValueBtn.addEventListener("click", async () => {
        try {
            const response = await fetch(API_URL);
            const products = await response.json();
            const total = products.reduce((sum, product) => sum + product.price, 0);
            catalog.innerHTML = `<p class="full-price">${total}₽</p>`;
        } catch (error) {
            console.error("Ошибка при расчете общей стоимости:", error);
        }
    });
}


// -----Pagination-----
const paginationContainer = document.getElementById("pagination");
let currentPage = 1;

function renderPagination(pageCount, products, queryParams) {
    let url = `http://localhost:3000/design_products?_page=${currentPage}&_limit=10&${queryParams.slice(1)}`;
    paginationContainer.innerHTML = '';

    for(let i = 1; i <= pageCount; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.className = "pagination__button";
        
        if(i === currentPage) {
            pageButton.classList.add('pagination__button_active');
        }

        pageButton.addEventListener('click', () => {
            currentPage = i;
            url = `http://localhost:3000/design_products?_page=${i}&_limit=10&${queryParams.slice(1)}`;
            fetch(url)
                .then(response => response.json())
                .then(json => renderCatalog(json))
                .then(() => renderPagination(pageCount, products, queryParams));
        });
        
        paginationContainer.appendChild(pageButton);
    }

    return fetch(url);
}

function initCatalog() {
    fetchAndRenderProducts();
    initSorting();
}

export { initCatalog };