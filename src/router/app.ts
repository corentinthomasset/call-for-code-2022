import { createRouter, createMemoryHistory, RouteRecordRaw } from 'vue-router';
import Notification from '@/views/app/Notification.vue';
import Modal from '@/views/app/Modal.vue';
import Results from '@/views/app/Results.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'notification',
    component: Notification,
  },
  {
    path: '/modal',
    name: 'modal',
    component: Modal,
    children: [
      {
        path: '',
        alias: 'results',
        name: 'search-results',
        component: Results,
      },
    ],
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
