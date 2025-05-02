import { renderPagination } from "./renderPagination.js";

function initCheckbox() {
  const checkboxes = document.querySelectorAll('.wrapper-logic__checkbox');
  
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', async () => {
      const selected = Array.from(checkboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.id);
      
      let queryParams = [];
      
      if (selected.includes('name')) {
        queryParams.push('_sort=name&_order=asc');
      }
      
      if (selected.includes('category')) {
        queryParams.push('_sort=category&_order=asc');
      }
      
      if (selected.includes('price')) {
        queryParams.push('_sort=price&_order=asc');
      }
      
      if (selected.includes('material')) {
        queryParams.push('material_ne=null');
      }
      
      if (selected.includes('description')) {
        queryParams.push('description_ne=null');
      }
      
      if (selected.includes('in_stock')) {
        queryParams.push('in_stock=true');
      }
      
      const queryString = queryParams.join('&');
      
      try {
        renderPagination(true, `?${queryString}`);
      } catch (error) {
        console.error("Ошибка при фильтрации:", error);
      }
    });
  });
}


export { initCheckbox };