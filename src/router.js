import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { name: 'Home', path: '/', component: () => import('./views/home.vue') },
    { name: 'Layout', path: '/layout', component: () => import('./views/layout.vue') },
    { name: 'Filter', path: '/filter', component: () => import('./views/filter.vue') },
    // { name: 'Filter', path: '/filter', component: () => import('./views/filter.vue') },
];

export default createRouter({
    history: createWebHistory(),
    routes,
});