import { createRouter, createMemoryHistory, RouteRecordRaw } from 'vue-router';
import Notification from '@/views/app/Notification.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'notification',
    component: Notification,
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
