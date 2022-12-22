import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { MainView, FullResultsView } from '../views';

const routes: Array<RouteRecordRaw> = [
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
