import { createRouter, createWebHistory } from 'vue-router'
import { constantRoutes, asyncRoutes, anyRoutes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
  // scroll behavior
  scrollBehavior: () => ({ top: 0, left: 0 }),
})

export { constantRoutes, asyncRoutes, anyRoutes }

export default router
