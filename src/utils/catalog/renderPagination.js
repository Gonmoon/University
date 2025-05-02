import { renderCatalog } from "./renderCatalog.js";
import { API_URL, FAVORITES_URL, CART_URL } from '../../api/api.js';

const paginationContainer = document.getElementById("pagination");

async function renderPagination(initBasicPage = false, queryParams = "", currentPage = 1, basicUrl = API_URL) {
    fetch(`${basicUrl}${queryParams}`)
        .then(response => response.json())
        .then(products => {
            let pageCount = Math.ceil(products.length / 10);
            let url = `${basicUrl}?_page=${currentPage}&_limit=10&${queryParams.slice(1)}`;

            if(initBasicPage === true) {
                fetch(url)
                    .then(response => response.json())
                    .then(json => renderCatalog(json))
            }
            
            paginationContainer.innerHTML = "";

            for(let i = 1; i <= pageCount; i++) {
                const pageButton = document.createElement("button");
                pageButton.textContent = i;
                pageButton.className = "pagination__button";
                
                if(i === currentPage) {
                    pageButton.classList.add("pagination__button_active");
                }
        
                pageButton.addEventListener('click', () => {
                    currentPage = i;
                    url = `${basicUrl}?_page=${i}&_limit=10&${queryParams.slice(1)}`;

                    fetch(url)
                        .then(response => response.json())
                        .then(json => renderCatalog(json))
                        .then(() => renderPagination(false, queryParams, currentPage));
                });
                
                paginationContainer.appendChild(pageButton);
            }
        })
}

export { renderPagination };