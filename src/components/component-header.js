export class ComponentHeader extends HTMLElement {
    constructor() {
        super();

        let userState = localStorage.getItem("user");

        let role = userState ? JSON.parse(userState).role : "";

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
                        <a href="http://localhost:5173" class="header__link">Home</a>
                    </li>
                    <li class="header__li">
                        <a href="" class="header__link">About</a>
                    </li>
                    ${userState ? `
                        <li class="header__li">
                            <a href="http://localhost:5173/catalog.html" class="header__link">Buy</a>
                        </li>
                        <li class="header__li header__li_fix">
                            <a href="http://localhost:5173/feedback.html" class="header__link">Feedback</a>
                        </li>
                        ` : ""}
                    <li class="header__li">
                      <a href="#blog" class="header__link">Blog</a>
                    </li>
                    ${role === "admin" ?
                        `<li class="header__li">
                            <a href="http://localhost:5173/admin.html" class="header__link">Settings</a>
                         </li>`
                    : ""}
                  </ul>
                </nav>
                <a href="#" id="logoutBtn" class="header__button button">${userState ? "LogOut" : "SignIn"}</a>
            </header>
        `;

        const logoutBtn = document.getElementById('logoutBtn');

        logoutBtn.addEventListener("click", async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const favorites = JSON.parse(localStorage.getItem('favorite') || '[]');
        
            if (user && user.id) {
                try {
                    await fetch(`http://localhost:3000/users/${user.id}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            cart,
                            favorites
                        })
                    });
        
                    localStorage.removeItem('user');
                    localStorage.removeItem('cart');
                    localStorage.removeItem('favorite');
                    window.location.href = '/';
                } catch (error) {
                    console.error("Ошибка при сохранении данных перед выходом:", error);
                }
            } else {
                window.location.href = '/auth.html';
            }
        });
    }
}
