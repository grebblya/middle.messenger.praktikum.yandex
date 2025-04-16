// vite.config.js
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

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
    title: 'Регистрация - Контекст',
    formTitle: 'информация о пользователе',
    fields: {
        email: { label: 'Почта', name:"", value: "mail@mail.com" },
        login: { label: 'Логин', name:"",value: "ivanivanov" },
        name: { label: 'имя', name:"", value: "Иван"},
        lastName: { label:'фамилия', name:"", value: "Иванов"},
        chatName: { label: 'имя в чате',name:"", value: "Иван"},
        phone: {label:"телефон",name:"",  value:"8 (900)-777-00-00"},
    },
    buttons: {
        userDataChange: { text: "Сохранить изменения", type: "button", class: "action-button edit-button" },
        exit: { text: "Выйти", type: "button", class: "action-button logout-button" }
    }



};

const changePasswordData = {
    // title:  'Контекст',
    // formTitle: 'информация о пользователе',
    forms: {
        oldPassword: { passwordType: "oldPassword", text: "Введите старый пароль", passwordToggleType: 'oldPasswordToggle', passwordError: 'oldPasswordError'},

    }
}

export default {
    plugins: [
        handlebars({
            partialDirectory: resolve(__dirname, 'src/partials'),
            // Определяем контекст в зависимости от страницы
            context(pagePath) {
                // pagePath содержит путь к текущему обрабатываемому HTML файлу
                if (pagePath.includes('login.html')) {
                    return loginPageData;
                }
                // if (pagePath.includes('set.html')) {
                //     return settings;
                // }
                if (pagePath.includes('usersettings.html')) {
                    return settingsPageData;
                }
                if (pagePath.includes('changePassword2.html')) {
                    return changePasswordData;
                }
                if (pagePath.includes('error500.html')) {
                    // Здесь можно добавить логику для выбора данных ошибки
                    // Например, если бы у вас были error-404.html и error-500.html
                    // if (pagePath.includes('error-404.html')) return error404PageData;
                    // if (pagePath.includes('error-500.html')) return errorPageData;
                    // Пока просто возвращаем данные для 500 ошибки
                    return error500PageData;
                }
                if (pagePath.includes('error404.html')) {
                    // Здесь можно добавить логику для выбора данных ошибки
                    // Например, если бы у вас были error-404.html и error-500.html
                    // if (pagePath.includes('error-404.html')) return error404PageData;
                    // if (pagePath.includes('error-500.html')) return errorPageData;
                    // Пока просто возвращаем данные для 500 ошибки
                    return error404PageData;
                }
                // По умолчанию возвращаем данные для регистрации (index.html)
                return registrationPageData;
            }
        }),
    ],
    build: {
        rollupOptions: {
            input: {
                // Указываем обе страницы как точки входа
                main: resolve(__dirname, 'src/index.html'),
                login: resolve(__dirname, 'src/login.html'),
                error: resolve(__dirname, 'src/error.html')
            }
        }
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        }
    },
    server: {
        open: '/src/login.html' // Можно изменить на '/src/index.html' или оставить так
    }
};