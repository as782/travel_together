import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import authHelper from '@/utils/auth/authHelper'
import { showToast } from 'vant'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.noToken && !authHelper.getToken()) {
    showToast({ message: '请先登录' })
    next({ path: '/login' })
  } else {
    next()
  }
})

export default router
