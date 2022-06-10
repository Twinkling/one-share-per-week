import { createApp } from 'vue';
import 'normalize.css';
import App from './App.vue';
import router from './routers';
import { customCSS } from './directive/custom-css';

createApp(App).use(router).use(customCSS).mount('#app');
