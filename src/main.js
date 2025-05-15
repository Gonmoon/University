import "./styles/main/style.scss"
import "./styles/main/tablet-style.scss"
import "./styles/main/phone-style.scss"

import { ComponentHeader } from "./components/component-header.js";
import { ComponentFooter } from "./components/component-footer.js";

customElements.define("widget-header", ComponentHeader);
customElements.define("widget-footer", ComponentFooter);

import { initBurger } from "./utils/initBurger.js";

window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if(preloader) {
    setTimeout(() => {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
    }, 1000);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  initBurger();

  // для scroll
  const sections = document.querySelectorAll('section');

  if(sections) {
      const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2
    });
  
    sections.forEach(section => {
      observer.observe(section);
    });
  }  

  // Вверх
  const scrollBtn = document.getElementById('scrollToTop');

  if(scrollBtn) {
      window.addEventListener('scroll', () => {
      scrollBtn.classList.toggle('show', window.scrollY > 300);
    });
  
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Slider
  // const swiper = new Swiper('.swiper', {
  //   loop: true,
  //   navigation: {
  //     nextEl: '.swiper-button-next',
  //     prevEl: '.swiper-button-prev',
  //   },
  //   pagination: {
  //     el: '.swiper-pagination',
  //     clickable: true,
  //   },
  //   autoplay: {
  //     delay: 2000,
  //     disableOnInteraction: false,
  //   },
  // });

  // Видео
  // document.querySelector('.video-trigger').addEventListener('click', () => {
  //   document.getElementById('videoModal').classList.remove('hidden');
  // });

  // document.getElementById('closeVideo').addEventListener('click', () => {
  //   const modal = document.getElementById('videoModal');
  //   modal.classList.add('hidden');
  //   const iframe = modal.querySelector('iframe');
  //   iframe.src = iframe.src;
  // });
})