import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import store from '@/store';
import 'amfe-flexible';
import 'vant/lib/index.css';

const app = createApp(App);
app.use(router).use(store).mount('#app');
