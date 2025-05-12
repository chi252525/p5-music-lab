// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    name: 'Home',
    children: [{ path: '', component: () => import('../pages/IndexPage.vue') }],
  },
  {
    path: '/MoneyPlayer',
    name: 'MoneyPlayer',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: '/MoneyPlayer',
        component: () => import('../components/Player.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
