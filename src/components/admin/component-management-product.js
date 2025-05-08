import { API_URL } from "../../api/api.js";
import "../../styles/adminProduct.scss";
import { initAlert } from "../../utils/initAlert.js";

function showError(input, message) {
  let msg = input.parentElement.querySelector('.error-msg');
  if (!msg) {
    msg = document.createElement('div');
    msg.className = 'error-msg';
    msg.style.color = 'red';
    msg.style.fontSize = '12px';
    msg.style.marginTop = '0px';
    input.parentElement.appendChild(msg);
  }
  msg.textContent = message;
}

function removeError(input) {
  const msg = input.parentElement.querySelector('.error-msg');
  if (msg) msg.remove();
}

export class AdminProductComponent extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    this.innerHTML = `
      <div class="container-product">
        <div class="container-product__wrapper">
          <form id="productForm" class="product-form">
            <input type="hidden" id="product-id" class="product-form__input" />

            ${this.renderField('name', 'Название', 'text')}
            ${this.renderField('category', 'Категория', 'text')}
            ${this.renderField('price', 'Цена', 'number')}
            ${this.renderField('material', 'Материал', 'text')}
            ${this.renderField('style', 'Стиль', 'text')}
            ${this.renderTextarea('description', 'Описание')}
            ${this.renderField('photo_url', 'Ссылка на изображение', 'url')}

            <label class="product-form__label">
              <input type="checkbox" id="in_stock" class="product-form__checkbox" /> В наличии
            </label>

            <button type="button" id="addBtn" class="product-form__button product-form__button--add button" disabled>Добавить</button>
            <button type="button" id="updateBtn" class="product-form__button product-form__button--update button" disabled>Обновить</button>
            <button type="button" id="deleteBtn" class="product-form__button product-form__button--delete button" disabled>Удалить</button>
          </form>
          <ul id="productList" class="product-list"></ul>
        </div>
      </div>
    `;

    this.assignFields();
    this.inputs.forEach(input => input.addEventListener('input', () => this.validateForm()));
    this.addBtn.addEventListener('click', () => this.createProduct());
    this.updateBtn.addEventListener('click', () => this.updateProduct());
    this.deleteBtn.addEventListener('click', () => this.deleteProduct());

    this.loadProducts();
  }

  renderField(id, placeholder, type) {
    return `
      <div class="product-form__field">
        <input type="${type}" id="${id}" class="product-form__input" placeholder="${placeholder}" />
      </div>
    `;
  }

  renderTextarea(id, placeholder) {
    return `
      <div class="product-form__field">
        <textarea id="${id}" class="product-form__textarea" placeholder="${placeholder}"></textarea>
      </div>
    `;
  }

  assignFields() {
    this.idInput = this.querySelector('#product-id');
    this.nameInput = this.querySelector('#name');
    this.categoryInput = this.querySelector('#category');
    this.priceInput = this.querySelector('#price');
    this.materialInput = this.querySelector('#material');
    this.styleInput = this.querySelector('#style');
    this.descInput = this.querySelector('#description');
    this.photoInput = this.querySelector('#photo_url');
    this.inStockInput = this.querySelector('#in_stock');

    this.addBtn = this.querySelector('#addBtn');
    this.updateBtn = this.querySelector('#updateBtn');
    this.deleteBtn = this.querySelector('#deleteBtn');

    this.inputs = [
      this.nameInput, this.categoryInput, this.priceInput,
      this.materialInput, this.styleInput, this.descInput, this.photoInput
    ];
  }

  validateForm() {
    let valid = true;
    this.inputs.forEach(input => {
      const value = input.value.trim();
      if (!value || (input === this.priceInput && (isNaN(value) || value <= 0))) {
        showError(input, 'Поле обязательно');
        valid = false;
      } else {
        removeError(input);
      }
    });
    this.addBtn.disabled = !valid || !!this.idInput.value;
    this.updateBtn.disabled = !valid || !this.idInput.value;
    this.deleteBtn.disabled = !this.idInput.value;
  }

  async loadProducts() {
    try {
      const res = await fetch(API_URL);
      const products = await res.json();
      const list = this.querySelector('#productList');
      list.innerHTML = '';
      products.forEach(prod => {
        const li = document.createElement('li');
        li.textContent = `${prod.name} (${prod.category}) - ${prod.price}₽`;
        li.addEventListener('click', () => this.fillForm(prod));
        list.appendChild(li);
      });
    } catch (err) {
      console.error('Ошибка загрузки товаров:', err);
    }
  }

  fillForm(product) {
    this.idInput.value = product.id;
    this.nameInput.value = product.name;
    this.categoryInput.value = product.category;
    this.priceInput.value = product.price;
    this.materialInput.value = product.material;
    this.styleInput.value = product.style;
    this.descInput.value = product.description || '';
    this.photoInput.value = product.photo_url;
    this.inStockInput.checked = product.in_stock;
    this.validateForm();
  }

  getFormData() {
    return {
      name: this.nameInput.value.trim(),
      category: this.categoryInput.value.trim(),
      price: parseFloat(this.priceInput.value),
      material: this.materialInput.value.trim(),
      style: this.styleInput.value.trim(),
      description: this.descInput.value.trim(),
      photo_url: this.photoInput.value.trim(),
      in_stock: this.inStockInput.checked,
      favorites: false,
      cart: false
    };
  }

  async createProduct() {
    try {
      const data = this.getFormData();
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Ошибка при добавлении товара');
      this.resetForm();
      this.loadProducts();
      initAlert("Товар добавлен!", 3000);
    } catch (err) {
      console.error(err);
    }
  }

  async updateProduct() {
    const id = this.idInput.value;
    if (!id) return;
    try {
      const data = this.getFormData();
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Ошибка при обновлении товара');
      this.resetForm();
      this.loadProducts();
      initAlert("Товар изменён!", 3000);
    } catch (err) {
      console.error(err);
    }
  }

  async deleteProduct() {
    const id = this.idInput.value;
    if (!id) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Ошибка при удалении товара');
      this.resetForm();
      this.loadProducts();
      initAlert("Товар удалён!", 3000);
    } catch (err) {
      console.error(err);
    }
  }

  resetForm() {
    this.idInput.value = '';
    this.nameInput.value = '';
    this.categoryInput.value = '';
    this.priceInput.value = '';
    this.materialInput.value = '';
    this.styleInput.value = '';
    this.descInput.value = '';
    this.photoInput.value = '';
    this.inStockInput.checked = false;
    this.inputs.forEach(removeError);
    this.validateForm();
  }
}
