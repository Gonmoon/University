import { API_URL, ORDER_URL, FEEDBACK_URL } from "../api/api.js";
import "../styles/feedback/style.scss";

class FeedbackComponent extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const nickname = user.nickname;

    if (!nickname) {
      this.innerHTML = '<p>Пользователь не найден</p>';
      return;
    }

    const ordersRes = await fetch(ORDER_URL);
    const orders = await ordersRes.json();

    const productIds = orders
      .flatMap(order => order[nickname] || [])
      .map(item => item.id);

    const productsRes = await fetch(`${API_URL}?id=${productIds.join('&id=')}`);
    const products = await productsRes.json();

    const optionsHtml = products.map(product => `<option value="${product.id}">${product.name}</option>`).join('');

    this.innerHTML = `
      <div class="container">
        <div class="container__wrapper">
          <select name="product" id="product" class="container__select">
            ${optionsHtml}
          </select>
          <textarea name="feedback" id="text" class="container__text" placeholder="Ваш отзыв..."></textarea>
          <button class="container__button button">Send</button>
        </div>
        <ul class="container__feedbacks" id="feedbacks"></ul>
      </div>
    `;

    this.loadFeedbacks();

    this.querySelector('.container__button').addEventListener('click', async () => {
      const text = this.querySelector('#text').value.trim();
      const select = this.querySelector('#product');
      const productName = select.selectedOptions[0]?.textContent;

      if (text && productName) {
        const feedbackText = `${productName} — ${text}`;
        const list = this.querySelector('#feedbacks');
        const li = document.createElement('li');
        li.className = 'container__feedback';
        li.textContent = `${nickname}: ${feedbackText}`;
        list.appendChild(li);

        this.querySelector('#text').value = '';

        try {
          const res = await fetch(`${FEEDBACK_URL}?nickname=${nickname}`);
          const data = await res.json();

          if (data.length > 0) {
            const [existing] = data;
            const updatedFeedbacks = [...existing[nickname], feedbackText];

            await fetch(`${FEEDBACK_URL}/${existing.id}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ [nickname]: updatedFeedbacks })
            });
          } else {
            await fetch(FEEDBACK_URL, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ nickname, [nickname]: [feedbackText] })
            });
          }
        } catch (err) {
          console.error('Ошибка при отправке отзыва:', err);
        }
      }
    });
  }

  async loadFeedbacks() {
    try {
      const res = await fetch(FEEDBACK_URL);
      const data = await res.json();
  
      if (data.length > 0) {
        const list = this.querySelector('#feedbacks');
  
        data.forEach(feedbackData => {
          const nickname = feedbackData.nickname;
          const feedbacks = feedbackData[nickname];
  
          if (Array.isArray(feedbacks)) {
            feedbacks.forEach(fb => {
              const li = document.createElement('li');
              li.className = 'container__feedback';
              li.textContent = `${nickname}: ${fb}`;
              list.appendChild(li);
            });
          }
        });
      }
    } catch (err) {
      console.error('Ошибка загрузки отзывов:', err);
    }
  }
}

customElements.define('feedback-component', FeedbackComponent);
