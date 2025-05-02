import "../styles/popup.scss";

export function initPopup(title, content) {
    document.body.insertAdjacentHTML("afterBegin", `<widget-popup id="popup" title="${title || ""}">${content}</widget-popup>`);

    const popup = document.getElementById("popup");
    const close = document.getElementById("close");
    const overlay = document.getElementById("overlay");

    document.documentElement.style.scrollBehavior = "auto";
    document.body.style.overflow = "hidden";

    
    overlay.addEventListener("click", function(e) {
        if (e.target.dataset.id === "overlay") {
            popup.remove();
        }
        document.body.style.overflow = "";
        document.documentElement.style.scrollBehavior = "";
    });

    close.addEventListener("click", function(e) {
        popup.remove();
        
        document.body.style.overflow = "";
        document.documentElement.style.scrollBehavior = "";
    });
}
