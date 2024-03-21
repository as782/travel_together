import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import authHelper from '@/utils/auth/authHelper'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

router.beforeEach((to, from, next) => {
  console.log(to.meta, authHelper.getToken())

  if (!to.meta.noToken && !authHelper.getToken()) {
    next({ path: '/login' })
  } else {
    next()
  }
})

export default router
