import { createApp } from 'vue';

import App from './App/App';
import ElementPlus from 'element-plus';
import '../customization/index.css';
import store from './store/index.js';
import router from './router';

const app = createApp(App);
app.use(ElementPlus);
app.use(store);
app.use(router);
app.mount('#app');
