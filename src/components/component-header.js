export class ComponentHeader extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = `
            <header class="header">
                <div class="header__logo">
                  <img src="./logo.svg" alt="logo" class="header__logo-img">
                </div>
                <button id="burger" class="header__open-main-nav">
                  <span class="header__burger"></span>
                  <span class="header__burger-text">Menu</span>
                </button>
                <nav class="header__nav" id="main-nav">
                  <ul class="header__ul">
                    <li class="header__li">
                        <a href="" class="header__link">Home</a>
                    </li>
                    <li class="header__li">
                        <a href="" class="header__link">About</a>
                    </li>
                    <li class="header__li">
                        <a href="" class="header__link">Pricing</a></li>
                    <li class="header__li header__li_fix">
                        <a href="" class="header__link">Open positions</a>
                    </li>
                    <li class="header__li">
                        <a href="" class="header__link">Blog</a>
                    </li>
                    <li class="header__li">
                        <a href="" class="header__link">Template</a>
                    </li>
                  </ul>
                </nav>
                <a href="http://localhost:5173/catalog.html" class="header__button button">Buy now</a>
            </header>
        `;
    }
}
