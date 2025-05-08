export class CustomAlert extends HTMLElement {
  constructor() {
    super();
    this._duration = parseInt(this.getAttribute('data-duration')) || 3000;
    this._hideTimeout = null;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .alert-box {
          position: fixed;
          bottom: -100px;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          color: black;
          padding: 16px 24px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          font-family: sans-serif;
          z-index: 9999;
          min-width: 200px;
          text-align: center;
          opacity: 0;
          transition: all 0.3s ease;
        }
        .alert-box.visible {
          bottom: 20px;
          opacity: 1;
        }
      </style>
      <div class="alert-box" id="alertBox">${this.innerHTML}</div>
    `;
  }

  show(message, duration = this._duration) {
    const box = this.shadowRoot.getElementById('alertBox');
    if (message) box.textContent = message;
    
    box.classList.add('visible');

    clearTimeout(this._hideTimeout);
    this._hideTimeout = setTimeout(() => {
      box.classList.remove('visible');
      setTimeout(() => this.remove(), 300);
    }, duration);
  }

  disconnectedCallback() {
    clearTimeout(this._hideTimeout);
  }
}