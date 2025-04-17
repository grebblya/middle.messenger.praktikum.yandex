import { resolve } from 'path';
import { defineConfig } from 'vite'; // <-- Добавьте импорт defineConfig
import handlebars from 'vite-plugin-handlebars';

// Ваши объекты данных (registrationPageData, loginPageData, и т.д.) остаются без изменений...
// --- Начало ваших данных ---
// Данные для страницы РЕГИСТРАЦИИ
const registrationPageData = {
    title: 'Регистрация - Контекст',
    formTitle: 'Регистрация',
    fields: {
        email: { label: "Почта", type: "email", name: "email", placeholder: "e-mail@mail.com" },
        login: { label: "Логин", type: "text", name: "login", placeholder: "ivanivanov"  },
        firstName: { label: "Имя", type: "text", name: "first_name", placeholder: "Иван"  },
        lastName: { label: "Фамилия", type: "text", name: "second_name", placeholder: "Иванов",  },
        phone: { label: "Телефон", type: "tel", name: "phone", placeholder: "+7 (900) 000 00 00",  },
        password: { label: "Пароль", type: "password", name: "password", placeholder: "********",  },
        passwordConfirm: { label: "Пароль (ещё раз)", type: "password", name: "password_confirm", placeholder: "********", }
    },
    buttons: {
        register: { text: "Зарегистрироваться", type: "submit", class: "btn-register" },
        login: { text: "Войти", type: "button", class: "btn-login" } // Возможно, здесь должна быть ссылка или кнопка на страницу входа
    }
    // Можно добавить ссылку "Уже есть аккаунт? Войти"
    // link: { text: "Уже есть аккаунт?", linkText: "Войти", href: "/src/login.html" }
};

// Данные для страницы АВТОРИЗАЦИИ
const loginPageData = {
    title: 'Вход - Контекст',
    formTitle: 'Вход',
    fields: {
        login: { label: "Логин", type: "text", name: "login", placeholder: "Логин", value: "" }, // Placeholder как в дизайне
        password: { label: "Пароль", type: "password", name: "password", placeholder: "Пароль", value: "" } // Placeholder как в дизайне
    },
    buttons: {
        login: { text: "Войти", type: "submit", class: "btn-login" }
    },
    link: { // Данные для ссылки под кнопкой
        text: "Нет аккаунта?",
        linkText: "Зарегистрироваться",
        href: "/src/index.html" // Ссылка на страницу регистрации
    },


};
const error500PageData = {
    title: 'Ошибка 500 - Упс!',
    errorCode: '500',
    errorMessage: 'Мы уже фиксим',
    linkText: 'Назад к чатам',
    linkHref: '/src/index.html' // Или другая релевантная ссылка (например, на главную страницу чатов)
};

// Данные для страницы ОШИБКИ 404 (как пример)
const error404PageData = {
    title: 'Ошибка 404 - Не найдено',
    errorCode: '404',
    errorMessage: 'Такой страницы не существует',
    linkText: 'На главную',
    linkHref: '/src/index.html' // Ссылка на главную
};

const settingsPageData = {
    title: 'Настройки профиля - Контекст', // Исправил title для ясности
    formTitle: 'Информация о пользователе',
    fields: {
        email: { label: 'Почта', name:"email", value: "mail@mail.com" },
        login: { label: 'Логин', name:"login",value: "ivanivanov" },
        name: { label: 'Имя', name:"first_name", value: "Иван"}, // Поправил "имя"
        lastName: { label:'Фамилия', name:"second_name", value: "Иванов"}, // Поправил "фамилия"
        chatName: { label: 'Имя в чате',name:"display_name", value: "Иван"}, // Поправил "имя в чате"
        phone: {label:"Телефон",name:"phone",  value:"8 (900)-777-00-00"}, // Поправил "телефон"
    },
    buttons: {
        userDataChange: { text: "Сохранить изменения", type: "button", class: "action-button" },
        exit: { text: "Выйти", type: "button", class: "action-button logout-button" }
    }
};

const changePasswordData = {
    title:  'Смена пароля - Контекст', // Добавил title
    // formTitle: 'информация о пользователе', // Возможно, не нужен здесь
    fields: { // Структурировал поля, чтобы было похоже на другие страницы
        oldPassword: { label: "Старый пароль", type: "password", name: "oldPassword", placeholder: "********"},
        newPassword: { label: "Новый пароль", type: "password", name: "newPassword", placeholder: "********"},
        confirmPassword: { label: "Повторите новый пароль", type: "password", name: "confirmPassword", placeholder: "********"}
    },
    buttons: {
        save: { text: "Сохранить", type: "submit", class: "btn-save" }
    }
    // Старая структура была не очень удобна для Handlebars, изменил на более стандартную
    // forms: {
    //     oldPassword: { passwordType: "oldPassword", text: "Введите старый пароль", passwordToggleType: 'oldPasswordToggle', passwordError: 'oldPasswordError'},
    // }
};
// --- Конец ваших данных - --


// Экспортируем конфигурацию через defineConfig
export default defineConfig({
    base: '',
    plugins: [
        handlebars({
            partialDirectory: resolve(__dirname, 'src/partials'),
            context(pagePath) {
                console.log(`[Build Context] Processing: ${pagePath}`); // Логгирование для отладки сборки
                if (pagePath.includes('login.html')) {
                    return loginPageData;
                }
                if (pagePath.includes('userSettings.html')) {
                    return settingsPageData;
                }
                if (pagePath.includes('error500.html')) {
                    return error500PageData;
                }
                if (pagePath.includes('error404.html')) {
                    return error404PageData;
                }
                // По умолчанию (для index.html и других неуказанных)
                // Убедитесь, что index.html действительно должен использовать registrationPageData
                if (pagePath.includes('index.html')) {
                    return registrationPageData;
                }
                // Можно вернуть пустой объект или общие данные, если нет совпадения
                return {}; // Или registrationPageData, если это правильное поведение по умолчанию
            }
        }),
        // другие плагины...
    ],
    // Указываем корень проекта, если ваши HTML файлы лежат в src
    root: resolve(__dirname, 'src'), // <-- Важно, если HTML и main.js/css лежат в src

    build: {
        // Правильное имя опции: outDir
        outDir: resolve(__dirname, 'dist'), // Указываем путь к dist относительно корня проекта (где vite.config.js)
        emptyOutDir: true, // Очищать папку dist перед сборкой
        rollupOptions: {
            input: {
                // Ключи (main, login и т.д.) определяют имя выходного HTML файла в dist (main -> index.html)
                main: resolve(__dirname, 'src/index.html'), // Обычно это главная страница
                login: resolve(__dirname, 'src/login.html'),
                error404: resolve(__dirname, 'src/error404.html'), // Дал уникальный ключ
                error500: resolve(__dirname, 'src/error500.html'), // <-- Добавлено
                usersettings: resolve(__dirname, 'src/userSettings.html'), // <-- Добавлено
                chat: resolve(__dirname, 'src/chat.html')
                // Добавьте сюда все остальные ваши страницы по аналогии
            }
        }
    },
    resolve: {
        alias: {
            // Алиас '@' теперь будет указывать на корень проекта, т.к. мы изменили root
            // Если ваши JS/CSS импорты ожидают '@' как 'src', оставьте как было, НО убедитесь, что пути в rollupOptions и root согласованы
            '@': resolve(__dirname, 'src'),
        }
    },
    server: {
        // Открывать при старте `vite dev`
        open: 'dist/index.html' // Путь относительно `root`
    }
});