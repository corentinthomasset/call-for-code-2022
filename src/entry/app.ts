import { createApp } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import App from '../views/app/App.vue';
import store from '../store/app';
import router from '../router/app';
import '../styles/tailwind.css';

const id = uuidv4();
document.body.insertAdjacentHTML('beforeend', `<div id="lof-${id}"></div>`);

const app = createApp(App);
app.use(store);
app.use(router);
app.mount(`#lof-${id}`);
