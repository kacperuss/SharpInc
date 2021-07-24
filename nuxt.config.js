export default {
    target: 'static',

    server: {
        port: 777,
    },

    head: {
        title: 'Sharp Inc',
        htmlAttrs: {
            lang: 'en',
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=Teko:wght@300;600&display=swap',
            },
        ],
    },

    tailwindcss: {
        cssPath: '~/assets/scss/vendors/tailwind.css',
        configPath: 'tailwind.config.js',
    },

    css: ['./assets/scss/main.scss'],

    plugins: ['~/plugins/global.js'],

    components: true,

    buildModules: ['@nuxtjs/tailwindcss'],

    modules: [],
    styleResources: {
        scss: ['./assets/scss/abstracts.scss'],
    },

    build: {},
}
