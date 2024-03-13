import type { RouteRecordRaw } from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue'
import SimpleLayout from '@/layout/SimpleLayout.vue'
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
          hideNavbar: false,
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
          hideNavbar: true,
          tabBar: true,
          noToken: true,
          refresh: true
        },
        component: () => import('../views/mine/MyProfile.vue')
      },
      {
        path: '/user/:id',
        name: 'user',
        meta: {
          title: '用户页',
          keepAlive: false,
          hideNavbar: true,
          tabBar: false,
          noToken: true,
          refresh: true
        },
        component: () => import('../views/otherprofie/OtherProfile.vue')
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
      hideNavbar: false,
      tabBar: false,
      noToken: false,
      refresh: true
    },
    component: () => import('../views/momentdetail/MomentDetailPage.vue')
  },
  {
    path: '/chat/:id',
    name: 'chat',
    meta: {
      title: '聊天框',
      keepAlive: false,
      hideNavbar: false,
      tabBar: true,
      noToken: false,
      refresh: true
    },
    component: () => import('../views/chat/ChatPage.vue')
  },
  {
    path: '/sysinfo',
    name: 'sysinfo',
    meta: {
      title: '系统动态',
      keepAlive: true,
      hideNavbar: false,
      tabBar: false,
      noToken: false,
      refresh: true
    },
    component: () => import('../views/sysinfo/SystemInfoPage.vue')
  },
  {
    path: '/editprofile',
    component: SimpleLayout,
    children: [
      {
        path: '',
        name: 'editprofile',
        meta: {
          title: '个人信息',
          keepAlive: false,
          hideNavbar: false,
          noToken: false
        },
        component: () => import('../views/editprofile/EditProfilePage.vue')
      }
    ]
  },
  {
    path: '/setting',
    component: SimpleLayout,
    children: [
      {
        path: '',
        name: 'setting',
        meta: {
          title: '设置',
          keepAlive: false,
          hideNavbar: false,
          noToken: false
        },
        component: () => import('../views/settingpage/SettingPage.vue')
      }
    ]
  },
  {
    path: '/fans',
    component: SimpleLayout,
    children: [
      {
        path: '',
        name: 'fans',
        meta: {
          title: '粉丝',
          keepAlive: false,
          hideNavbar: false,
          noToken: false
        },
        component: () => import('../views/somelist/listfans/FansListPage.vue')
      }
    ]
  },

  {
    path: '/like',
    component: SimpleLayout,
    children: [
      {
        path: '',
        name: 'like',
        meta: {
          title: '喜欢',
          keepAlive: false,
          hideNavbar: false,
          noToken: false
        },
        component: () => import('../views/somelist/listoflike/LikeListPage.vue')
      }
    ]
  },
  {
    path: '/follow',
    component: SimpleLayout,
    children: [
      {
        path: '',
        name: 'follow',
        meta: {
          title: '关注',
          keepAlive: false,
          hideNavbar: false,
          noToken: false
        },
        component: () => import('../views/somelist/listfollow/FollowListPage.vue')
      }
    ]
  }
]
export const routes: RouteRecordRaw[] = [
  ...loginRoutes,
  ...mainRoutes,
  ...pageRoutes,
  {
    // error page
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/error/404Page.vue')
  }
]
