export class ComponentPopup extends HTMLElement {
    constructor() {
        super();

        const title = this.getAttribute("title") || "";
        const content = this.innerHTML;

        this.innerHTML = `
            <div class="popup" id="overlay" data-id="overlay">
                <div class="popup__main">
                    <div class="popup__header">
                        <p class="popup__h2">${title}</p>
                        <p class="popup__close" id="close">&times;</p>
                    </div>
                    <div class="popup__content">
                        ${content}
                    </div>
                </div>
            </div>
        `;
    }
}


