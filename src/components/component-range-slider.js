export class ComponentRangeSlider extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = `
            <div class="range-slider">
              <div class="range-slider__track">
                <div class="range-slider__range"></div>
                <div class="range-slider__handle range-slider__handle_min"></div>
                <div class="range-slider__handle range-slider__handle_max"></div>
              </div>
              <div class="range-slider__labels">
                <span class="range-slider__value range-slider__value_min"></span>
                <span class="range-slider__value range-slider__value_max"></span>
                <span class="range-slider__value range-slider__value_both"></span>
              </div>
            </div>
        `;
    }
}


