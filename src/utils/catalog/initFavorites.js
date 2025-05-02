import { API_URL, FAVORITES_URL, CART_URL } from '../../api/api.js';

function deleteInFavorites(productId) {
    fetch(`${API_URL}?id=${productId}`)
        .then(response => response.json())
        .then(json => {
            fetch(`${FAVORITES_URL}/${productId}`, {
                method: "DELETE"
            });
        });
}

function addToFavorites(productId) {
    fetch(`${API_URL}?id=${productId}`)
        .then(response => response.json())
        .then(json => {
            fetch(FAVORITES_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(json[0])
            });
        });
}

async function loaderFavorites(productId) {
    fetch(`${FAVORITES_URL}?id=${productId}`)
        .then(response => response.json())
        .then(json => {
            if (json[0] == undefined) {
                throw new Error("NotInFavorites");
            } else {
                deleteInFavorites(productId);
            } 
        }).catch(error => {
            if (error.message == "NotInFavorites") {
                addToFavorites(productId)
            } else {
                throw new Error("loaderFavoritesError");
            };
        });
}

async function checkFavoritesStatus(productId) {
    try {
        const response = await fetch(`${FAVORITES_URL}?id=${productId}`);
        const json = await response.json();
        
        return json[0] !== undefined;
    } catch (error) {
        console.error("ErrorCheckFavorites", error);
        return false;
    }
}

async function initFavorites() {
    const buttons = catalog.querySelectorAll(".favorite");
    for (const btn of buttons) {

        const productId = btn.dataset.id;
        let status = true;

        try {
            const isFavorite = await checkFavoritesStatus(productId); 
            if (isFavorite) {
                btn.textContent = "Убрать из избраного";
            } else {
                btn.textContent = "В избранное";
                status = !status;
            }
        } catch (error) {
            console.error(`ProductError ${productId}:`, error);
            btn.textContent = "В избранное";
            status = !status;
        }
        
        btn.addEventListener("click", (e) => {
            loaderFavorites(productId);
            e.currentTarget.textContent = !status ? "Убрать из избраного" : "В избранное";
            status = !status;
        });
    }
}

export { initFavorites };