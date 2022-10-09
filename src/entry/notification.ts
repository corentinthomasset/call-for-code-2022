import { createApp } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import App from '../views/notification.vue';
import '../styles/tailwind.css';

const id = uuidv4();
document.body.insertAdjacentHTML('beforeend', `<div id="lof-${id}"></div>`);
createApp(App).mount(`#lof-${id}`);
