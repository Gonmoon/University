// const paginationContainer = document.getElementById("pagination");
// let currentPage = 1;

// function renderPagination(pageCount, products, queryParams) {
//     let url = `http://localhost:3000/design_products?_page=${currentPage}&_limit=10&${queryParams.slice(1)}`;
//     paginationContainer.innerHTML = '';

//     for(let i = 1; i <= pageCount; i++) {
//         const pageButton = document.createElement('button');
//         pageButton.textContent = i;
//         pageButton.className = "pagination__button";
        
//         if(i === currentPage) {
//             pageButton.classList.add('pagination__button_active');
//         }

//         pageButton.addEventListener('click', () => {
//             currentPage = i;
//             url = `http://localhost:3000/design_products?_page=${i}&_limit=10&${queryParams.slice(1)}`;
//             fetch(url)
//                 .then(response => response.json())
//                 .then(json => renderCatalog(json))
//                 .then(() => renderPagination(pageCount, products, queryParams));
//         });
        
//         paginationContainer.appendChild(pageButton);
//     }
    
//     return fetch(url);
// }

// export { renderPagination };