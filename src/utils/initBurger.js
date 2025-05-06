export function initBurger() {
  const burger = document.getElementById("burger");
  const nav = document.getElementById("main-nav");
  const body = document.body;

  const closeMenu = () => {
    nav.classList.remove("is-open");
    burger.classList.remove("is-open");
    body.style.overflow = "";
  };

  burger.addEventListener("click", function (e) {
    this.classList.toggle("is-open");
    nav.classList.toggle("is-open");

    if (this.classList.contains("is-open")) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }
  });

  document.addEventListener("click", function (e) {
    const links = nav.querySelectorAll(".header__link");
    if (!burger.contains(e.target) && !Array.from(links).some(link => link.contains(e.target))) {
      closeMenu();
    }
  });

  const links = nav.querySelectorAll(".header__link");
  links.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      closeMenu();

      // Ждем завершения анимации 
      nav.addEventListener("transitionend", function () {
        window.location.href = e.target.href;
      }, { once: true });
    });
  });
}
