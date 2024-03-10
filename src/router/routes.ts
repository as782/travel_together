import type { RouteRecordRaw } from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue'

const loginRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '起始页',
      keepAlive: true,
      hideNavbar: true
    },
    component: () => import('../views/login/LoginApp.vue')
  },
  {
    path: '/accountLogin',
    name: 'accountLogin',
    meta: {
      title: '账号登录',
      keepAlive: false,
      hideNavbar: false
    },
    component: () => import('../views/login/components/LoginFormPage.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: '注册账号',
      keepAlive: false,
      hideNavbar: false
    },
    component: () => import('../views/login/components/RegisterFormPage.vue')
  }
]
const mainRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
    component: AppLayout,
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {
          title: '首页',
          keepAlive: true,
          hideNavbar: true,
          tabBar: true,
          noToken: true,
          refresh: true
        },
        component: () => import('../views/home/HomePage.vue')
      },
      {
        path: 'moment',
        name: 'moment',
        meta: {
          title: '圈子',
          keepAlive: true,
          hideNavbar: true,
          tabBar: true,
          noToken: true,
          refresh: true
        },
        component: () => import('../views/moment/MomentPage.vue')
      },
      {
        path: 'message',
        name: 'message',
        meta: {
          title: '消息',
          keepAlive: true,
          hideNavbar: false,
          tabBar: true,
          noToken: true,
          refresh: true
        },
        component: () => import('../views/message/MessagePage.vue')
      },
      {
        path: 'mine',
        name: 'mine',
        meta: {
          title: '',
          keepAlive: true,
          hideNavbar: false,
          tabBar: true,
          noToken: true,
          refresh: true
        },
        component: () => import('../views/mine/MyProfile.vue')
      }
    ]
  }
]

const pageRoutes: RouteRecordRaw[] = [
  {
    path: '/groupDetail/:card_id',
    name: 'groupDetail',
    meta: {
      title: '组队详情',
      keepAlive: false,
      hideNavbar: true,
      tabBar: false,
      noToken: false,
      refresh: true
    },
    component: () => import('../views/groupdetail/GroupDetailPage.vue')
  },
  {
    path: '/momentDetail/:id',
    name: 'momentDetail',
    meta: {
      title: '动态详情',
      keepAlive: false,
      hideNavbar: true,
      tabBar: false,
      noToken: false,
      refresh: true
    },
    component: () => import('../views/momentdetail/MomentDetailPage.vue')
  }
]
export const routes: RouteRecordRaw[] = [...loginRoutes, ...mainRoutes, ...pageRoutes]
