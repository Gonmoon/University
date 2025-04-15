import "../../styles/catalog/style.scss";
import { renderPagination } from "./renderPagination.js";
import { initSorting } from "./initSorting.js";

import "../../styles/rangeSlider.scss";
import { initRangeSlider } from "../initRangeSlider.js";
import { ComponentRangeSlider } from "../../components/component-range-slider.js";

customElements.define("widget-range-slider", ComponentRangeSlider);

function initCatalog() {
    renderPagination(true);
    initSorting();
    initRangeSlider();
}

export { initCatalog };