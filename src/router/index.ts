import { createRouter, createWebHistory } from 'vue-router';
import { MainView, FullResultsView } from '../views';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView,
    },
    {
      path: '/full',
      name: 'full',
      component: FullResultsView,
    },
  ],
});

export default router;
