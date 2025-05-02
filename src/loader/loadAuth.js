import "../styles/auth/style.scss";

import { initPopup } from "../utils/initPopup.js"
import { ComponentPopup } from "../components/component-popup.js";
customElements.define("widget-popup", ComponentPopup);

const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registration-form');
  const nickname = document.getElementById('nickname');
  const regenBtn = document.getElementById('regen-nickname');
  const submitBtn = document.getElementById('submit-button');
  const passwordOption = document.getElementById('password-option');
  const manualFields = document.getElementById('manual-password-fields');
  const autoFields = document.getElementById('auto-password-fields');
  const autoPassword = document.getElementById('auto-password');
  const generatePasswordBtn = document.getElementById('generate-password');
  const agreement = document.getElementById('agreement');

  let nicknameAttempts = 0;

  function showError(input, message) {
    let msg = input.parentElement.querySelector('.error-msg');
    if (!msg) {
      msg = document.createElement('div');
      msg.className = 'error-msg';
      msg.style.position = 'absolute';
      msg.style.top = '100%';
      msg.style.color = 'red';
      msg.style.fontSize = '12px';
      msg.style.marginTop = '0';
      input.parentElement.style.position = 'relative';
      input.parentElement.appendChild(msg);
    }
    msg.textContent = message;
  }

  function clearError(input) {
    const msg = input.parentElement.querySelector('.error-msg');
    if (msg) msg.remove();
  }

  function generateNickname() {
    const fn = document.getElementById('first-name').value.trim().slice(0, 3);
    const ln = document.getElementById('last-name').value.trim().slice(0, 3);
    const rand = Math.floor(Math.random() * 990 + 10);
    const suffix = ['', '_by', '_dev', '_x', '_007'][Math.floor(Math.random() * 5)];
    return (fn + ln + rand + suffix).replace(/[^a-zA-Zа-яА-Я0-9_]/g, '');
  }

  regenBtn.addEventListener('click', () => {
    if (nicknameAttempts < 5) {
      nickname.value = generateNickname();
      nicknameAttempts++;
    } else {
      nickname.removeAttribute('readonly');
      regenBtn.disabled = true;
    }
  });

  passwordOption.addEventListener('change', () => {
    if (passwordOption.value === 'manual') {
      manualFields.style.display = 'block';
      autoFields.style.display = 'none';
    } else {
      manualFields.style.display = 'none';
      autoFields.style.display = 'block';
    }
  });

  generatePasswordBtn.addEventListener('click', () => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let pwd = "";
    while (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,20}/.test(pwd)) {
      pwd = Array.from({length: 12}, () => charset[Math.floor(Math.random() * charset.length)]).join('');
    }
    autoPassword.value = pwd;
  });

  form.addEventListener('input', () => {
    const phone = document.getElementById('phone');
    const birth = document.getElementById('birth-date');
    const email = document.getElementById('email');
    const pass = document.getElementById('password');
    const passConfirm = document.getElementById('password-confirm');
    const terms = document.getElementById('terms');
    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const middleName = document.getElementById('middle-name');

    [phone, birth, email, pass, passConfirm, firstName, lastName, middleName].forEach(clearError);

    const nameValid = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(firstName.value.trim());
    if (!nameValid) showError(firstName, 'Введите корректное имя (только буквы, пробелы и дефисы)');

    const lastNameValid = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(lastName.value.trim());
    if (!lastNameValid) showError(lastName, 'Введите корректную фамилию (только буквы, пробелы и дефисы)');

    const middleNameValid = middleName.value.trim() === '' || /^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(middleName.value.trim());
    if (middleName.value.trim() && !middleNameValid) showError(middleName, 'Введите корректное отчество (только буквы, пробелы и дефисы)');

    const phoneValid = /^\+375(25|29|33|44|17)\d{7}$/.test(phone.value.trim());
    if (!phoneValid) showError(phone, 'Введите корректный номер РБ: +375XXXXXXXXX');

    const emailValid = /\S+@\S+\.\S+/.test(email.value.trim());
    if (!emailValid) showError(email, 'Некорректный email');

    const birthDate = new Date(birth.value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear() - (today < new Date(birthDate.setFullYear(today.getFullYear())) ? 1 : 0);
    const birthValid = age >= 16;
    if (!birthValid) showError(birth, 'Регистрация с 16 лет');

    let passwordValid = true;
    if (passwordOption.value === 'manual') {
      passwordValid = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,20}/.test(pass.value);
      if (!passwordValid) showError(pass, 'Пароль: 8-20 символов, с заглавной, цифрой и спецсимволом');
      if (pass.value !== passConfirm.value) {
        passwordValid = false;
        showError(passConfirm, 'Пароли не совпадают');
      }
    } else {
      passwordValid = autoPassword.value.length >= 8;
    }

    const termsValid = terms.checked;

    submitBtn.disabled = !(phoneValid && emailValid && birthValid && passwordValid && termsValid && nameValid && lastNameValid && middleNameValid);
  });

  agreement.addEventListener('click', (e) => {
  	initPopup("Agreement", "Lorem");
  })

  form.addEventListener('submit', e => {
    e.preventDefault();
    alert('Регистрация прошла успешно!');
    form.reset();
    submitBtn.disabled = true;
    nickname.value = '';
    nickname.setAttribute('readonly', true);
    regenBtn.disabled = false;
    nicknameAttempts = 0;
  });
});
