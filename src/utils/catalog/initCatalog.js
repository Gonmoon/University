import "../../styles/catalog/style.scss";
import { renderPagination } from "./renderPagination.js";
import { initSorting } from "./initSorting.js";

function initCatalog() {
    renderPagination(true);
    initSorting();
}

export { initCatalog };