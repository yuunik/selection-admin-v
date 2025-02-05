const constantRoutes = [
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'any',
  },
]

export { constantRoutes }
