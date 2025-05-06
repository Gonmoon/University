import "../../styles/catalog/style.scss";
import { renderPagination } from "./renderPagination.js";
import { initSorting } from "./initSorting.js";
import { initCheckbox } from "./initCheckbox.js";

import "../../styles/rangeSlider.scss";
import { initRangeSlider } from "../initRangeSlider.js";
import { ComponentRangeSlider } from "../../components/component-range-slider.js";

import { initPopup } from "../initPopup.js"
import { ComponentPopup } from "../../components/component-popup.js";

customElements.define("widget-range-slider", ComponentRangeSlider);
customElements.define("widget-popup", ComponentPopup);

function setupCatalogClickHandler() {
    catalog.addEventListener('click', (e) => {
        const card = e.target.closest('.catalog-cart');
        const isButton = e.target.closest('.catalog-cart__buttons');

        if (card && !isButton) {
            const name = card.dataset.name;
            const price = card.dataset.price;
            const desc = card.dataset.description;
            const stock = card.dataset.stock;
            const style = card.dataset.style;

            const content = `
                <p><strong>Цена:</strong> ${price}</p>
                <p><strong>Описание:</strong> ${desc}</p>
                <p><strong>Наличие:</strong> ${stock}</p>
                <p><strong>Стиль:</strong> ${style}</p>
            `;
            initPopup(name, content);
        }
    });
}

function initCatalog() {
    setupCatalogClickHandler()
    renderPagination(true);
    initSorting();
    initCheckbox();
    initRangeSlider();
}

export { initCatalog };