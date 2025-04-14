import { renderPagination } from "./renderPagination.js";

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

async function initSorting() {
    search.addEventListener("input", async (e) => {
        const value = search.value.toLowerCase();
        if (value === "") return renderPagination(true);
        
        try {
            renderPagination(true, `?q=${value}`);
        } catch (error) {
            console.error("Ошибка при поиске:", error);
        }
    });
    
    sort.addEventListener("change", async (e) => {
        let sortParam = "";
        if (sort.value === "name") sortParam = "_sort=name&_order=asc";
        if (sort.value === "price") sortParam = "_sort=price&_order=asc";
        if (sort.value === "style") sortParam = "_sort=style&_order=asc";
        
        renderPagination(true, sortParam ? `?${sortParam}` : "");
    });

    sortCategory.addEventListener("change", (e) => {
    const selectedCategory = e.target.value;
        let queryParams = "";
        
        if (selectedCategory !== "all") {
            queryParams = `?category=${selectedCategory}`;
        }
        
        renderPagination(true, queryParams);
    });

    reset.addEventListener("click", (e) => {
        search.value = "";
        sort.value = "default";
        renderPagination(true);
    });
    
    sortByNameBtn.addEventListener("click", () => {
        renderPagination(true, "?_sort=name&_order=asc");
    });
    
    sortByPriceAscBtn.addEventListener("click", () => {
        renderPagination(true, "?_sort=price&_order=asc");
    });
    
    sortByPriceDescBtn.addEventListener("click", () => {
        renderPagination(true, "?_sort=price&_order=desc");
    });
    
    filterExpensiveBtn.addEventListener("click", () => {
        renderPagination(true, "?price_gte=50000");
    });
    
    filterCheapBtn.addEventListener("click", async () => {
        renderPagination(true, "?price_lte=10000");
    });
    
    filterInStockBtn.addEventListener("click", () => {
        renderPagination(true, "?in_stock=true");
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
            
            renderPagination(true);
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

export { initSorting };