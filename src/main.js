// Импортируем CSS, чтобы Vite его обработал
// Хотя <link> в HTML тоже работает, это более явный способ для Vite
import '/css/style.css';

// Здесь можно добавить JavaScript для валидации формы,
// отправки данных и т.д.
console.log("Registration form script loaded.");

// Пример простой логики (необязательно):
// const form = document.querySelector('.registration-form');
// form.addEventListener('submit', (event) => {
//     event.preventDefault(); // Предотвращаем стандартную отправку
//     console.log('Form submitted!');
//     // Здесь будет логика отправки данных на сервер
// });