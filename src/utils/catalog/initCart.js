import { API_URL, FAVORITES_URL, CART_URL } from '../../api/api.js';


function deleteInCarts(productId) {
    fetch(`${API_URL}?id=${productId}`)
        .then(response => response.json())
        .then(json => {
            fetch(`${CART_URL}/${productId}`, {
                method: "DELETE"
            });
        });
}

function addToCarts(productId) {
    fetch(`${API_URL}?id=${productId}`)
        .then(response => response.json())
        .then(json => {
            fetch(CART_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(json[0])
            });
        });
}

async function loaderCarts(productId) {
    fetch(`${CART_URL}?id=${productId}`)
        .then(response => response.json())
        .then(json => {
            if (json[0] == undefined) {
                throw new Error("NotInFavorites");
            } else {
                deleteInCarts(productId);
            } 
        }).catch(error => {
            if (error.message == "NotInFavorites") {
                addToCarts(productId)
            } else {
                throw new Error("loaderCartsError");
            };
        });
}

async function checkCartStatus(productId) {
    try {
        const response = await fetch(`${CART_URL}?id=${productId}`);
        const json = await response.json();
        
        return json[0] !== undefined;
    } catch (error) {
        console.error("ErrorCheckFavorites", error);
        return false;
    }
}

async function initCart() {
    const buttons = catalog.querySelectorAll(".cart");
    for (const btn of buttons) {

        const productId = btn.dataset.id;
        let status = true;

        try {
            const isFavorite = await checkCartStatus(productId); 
            if (isFavorite) {
                btn.textContent = "Убрать из корзины";
            } else {
                btn.textContent = "В корзину";
                status = !status;
            }
        } catch (error) {
            console.error(`ProductError ${productId}:`, error);
            btn.textContent = "В корзину";
            status = !status;
        }
        
        btn.addEventListener("click", (e) => {
            loaderCarts(productId);
            e.currentTarget.textContent = !status ? "Убрать из корзины" : "В корзину";
            status = !status;
        });
    }
}

export { initCart }