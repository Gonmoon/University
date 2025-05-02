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
const uniqueStylesBtn = document.getElementById("uniqueStyles");

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
}

export { initSorting };