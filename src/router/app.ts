import { createRouter, createMemoryHistory, RouteRecordRaw } from 'vue-router';
import Notification from '@/views/app/Notification.vue';
import Results from '@/views/app/Results.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'notification',
    component: Notification,
  },
  {
    path: '/results',
    name: 'results',
    component: Results,
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
