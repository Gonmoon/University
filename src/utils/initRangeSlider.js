import { renderPagination } from "./catalog/renderPagination.js";

function collision(div1, div2) {
  const rect1 = div1.getBoundingClientRect();
  const rect2 = div2.getBoundingClientRect();
  return !(rect1.right < rect2.left || rect1.left > rect2.right);
}

function initRangeSlider() {
  const slider = document.getElementById("slider");
  if (!slider) return;

  const track = slider.querySelector(".range-slider__track");
  const range = slider.querySelector(".range-slider__range");
  const minHandle = slider.querySelector(".range-slider__handle_min");
  const maxHandle = slider.querySelector(".range-slider__handle_max");
  const minValue = slider.querySelector(".range-slider__value_min");
  const maxValue = slider.querySelector(".range-slider__value_max");
  const rangeBoth = slider.querySelector(".range-slider__value_both");

  const minLimit = slider.dataset.min;
  const maxLimit = slider.dataset.max;
  let min = 0;
  let max = maxLimit;

  function updatePositions() {
    const minPos = ((min - minLimit) / (maxLimit - minLimit)) * 100;
    const maxPos = ((max - minLimit) / (maxLimit - minLimit)) * 100;
    
    range.style.left = `${minPos}%`;
    range.style.width = `${maxPos - minPos}%`;
    minHandle.style.left = `${minPos}%`;
    maxHandle.style.left = `${maxPos}%`;
    
    minValue.textContent = `${min}₽`;
    maxValue.textContent = `${max}₽`;
    rangeBoth.innerHTML = `<i>${min}₽ - </i>${max}₽`;
    
    if (min === max) {
      rangeBoth.querySelector("i").style.display = "none";
    } else {
      rangeBoth.querySelector("i").style.display = "inline";
    }

    if (collision(minValue, maxValue)) {
      minValue.style.opacity = "0";
      maxValue.style.opacity = "0";
      rangeBoth.style.display = "block";
    } else {
      minValue.style.opacity = "1";
      maxValue.style.opacity = "1";
      rangeBoth.style.display = "none";
    }
    
  }

  function setupHandle(handle, isMin) {
    let isDragging = false;
    
    handle.addEventListener("mousedown", (e) => {
      isDragging = true;
      
      const mouseUpHandler = () => {
        isDragging = false;
        
        renderPagination(true, `?price_gte=${min}&price_lte=${max}`);
        
        document.removeEventListener("mousemove", moveHandler);
        document.removeEventListener("mouseup", mouseUpHandler);
      };
      
      document.addEventListener("mousemove", moveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    });
    
    function moveHandler(e) {
      if (!isDragging) return;
      
      const rect = track.getBoundingClientRect();
      let pos = (e.clientX - rect.left) / rect.width;
      pos = Math.max(0, Math.min(1, pos));
      const value = Math.round(minLimit + pos * (maxLimit - minLimit));
      
      if (isMin) {
        min = Math.min(value, max);
      } else {
        max = Math.max(value, min);
      }
      
      updatePositions();
    }
  }

  setupHandle(minHandle, true);
  setupHandle(maxHandle, false);
  updatePositions();
}

export { initRangeSlider };

