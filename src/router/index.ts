import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/login/LoginApp.vue')
    },
    {
      path: '/accountLogin',
      name: 'accountLogin',
      component: () => import('../views/login/components/LoginFormPage.vue')
    },
    {
      path:'/register',
      name:'register',
      component:()=>import('../views/login/components/RegisterFormPage.vue')
    }
  ]
})

export default router
