import { CustomAlert } from "../components/component-alert.js";

let isRegistered = false;

export function initAlert(content, duration = 3000) {
  if (!isRegistered) {
    customElements.define('custom-alert', CustomAlert);
    isRegistered = true;
  }

  document.querySelectorAll('custom-alert').forEach(el => el.remove());

  const alert = document.createElement('custom-alert');
  alert.setAttribute('data-duration', duration.toString());
  alert.innerHTML = content;
  
  document.body.appendChild(alert);
  alert.show(content);
}