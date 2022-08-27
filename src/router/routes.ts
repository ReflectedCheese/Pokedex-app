import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },

      { path: '/myTeam', component: () => import('pages/MyTeam.vue') },
    ],
  },

  {
    path: '/',
    component: () => import('layouts/DetailsLayout.vue'),
    children: [
      { path: '/:id', component: () => import('pages/DetailPage.vue') },
    ],
  },

  {
    path: '/',
    component: () => import('layouts/FaveLayout.vue'),
    children: [
      { path: '/myFave', component: () => import('pages/MyFave.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
