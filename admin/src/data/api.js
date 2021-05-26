export const apis = {
   // 'dev': 'http://localhost:5001/',
   'dev': 'https://obscure-ocean-64391.herokuapp.com/',
    'prod': 'http://picsfies.com:5000/'
}

export const MODE = /localhost/.test(window.location.href) ? 'dev' : 'prod';

export const api = apis[MODE];