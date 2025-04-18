import { resolve } from 'path';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';


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
        login: { text: "Войти", type: "button", class: "btn-login" }
    }

};


const loginPageData = {
    title: 'Вход - Контекст',
    formTitle: 'Вход',
    fields: {
        login: { label: "Логин", type: "text", name: "login", placeholder: "Логин", value: "" },
        password: { label: "Пароль", type: "password", name: "password", placeholder: "Пароль", value: "" }
    },
    buttons: {
        login: { text: "Войти", type: "submit", class: "btn-login" }
    },
    link: {
        text: "Нет аккаунта?",
        linkText: "Зарегистрироваться",
        href: "/src/index.html"
    },


};
const error500PageData = {
    title: 'Ошибка 500 - Упс!',
    errorCode: '500',
    errorMessage: 'Мы уже фиксим',
    linkText: 'Назад к чатам',
    linkHref: '/src/index.html'
};


const error404PageData = {
    title: 'Ошибка 404 - Не найдено',
    errorCode: '404',
    errorMessage: 'Такой страницы не существует',
    linkText: 'На главную',
    linkHref: '/src/index.html'
};

const settingsPageData = {
    title: 'Настройки профиля - Контекст',
    formTitle: 'Информация о пользователе',
    fields: {
        email: { label: 'Почта', name:"email", value: "mail@mail.com" },
        login: { label: 'Логин', name:"login",value: "ivanivanov" },
        name: { label: 'Имя', name:"first_name", value: "Иван"},
        lastName: { label:'Фамилия', name:"second_name", value: "Иванов"},
        chatName: { label: 'Имя в чате',name:"display_name", value: "Иван"},
        phone: {label:"Телефон",name:"phone",  value:"8 (900)-777-00-00"},
    },
    buttons: {
        userDataChange: { text: "Сохранить изменения", type: "button", class: "action-button" },
        exit: { text: "Выйти", type: "button", class: "action-button logout-button" }
    }
};


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

                if (pagePath.includes('index.html')) {
                    return registrationPageData;
                }
                return {};
            }
        }),
    ],

    root: resolve(__dirname, 'src'),

    build: {
        outDir: resolve(__dirname, 'dist'),
        emptyOutDir: true,
        rollupOptions: {
            input: {

                main: resolve(__dirname, 'src/index.html'),
                login: resolve(__dirname, 'src/login.html'),
                error404: resolve(__dirname, 'src/error404.html'),
                error500: resolve(__dirname, 'src/error500.html'),
                usersettings: resolve(__dirname, 'src/userSettings.html'),
                chat: resolve(__dirname, 'src/chat.html')

            }
        }
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        }
    },
    server: {
        open: '',
        port: 3000
    },
    preview:{
        port:3000
    }
});
