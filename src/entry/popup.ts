// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { createApp } from 'vue';
import Unicon from 'vue-unicons';
import App from '../views/Popup.vue';
import store from '../store/app';
import '../styles/tailwind.css';
import '../icons';

const app = createApp(App);
app.use(store);
app.use(Unicon);
app.mount('#app');
