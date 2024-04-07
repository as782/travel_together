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
      hideNavbar: true,
      noToken: true
    },
    component: () => import('../views/login/LoginApp.vue')
  },
  {
    path: '/accountLogin',
    name: 'accountLogin',
    meta: {
      title: '账号登录',
      keepAlive: false,
      hideNavbar: false,
      noToken: true
    },
    component: () => import('../views/login/components/LoginFormPage.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: '注册账号',
      keepAlive: false,
      hideNavbar: false,
      noToken: true
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
          noToken: false,
          refresh: false
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
          noToken: false,
          refresh: true
        },
        component: () => import('../views/mine/MyProfile.vue')
      }
    ]
  }
]

const pageRoutes: RouteRecordRaw[] = [
  // 帖子详情
  {
    path: '/groupDetail/:id',
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

  // 消息相关页面
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
    path: '/aboutmoment',
    component: SimpleLayout,
    children: [
      {
        path: '',
        name: 'aboutmoment',
        meta: {
          title: '最新动态',
          keepAlive: false,
          hideNavbar: false,
          tabBar: true,
          noToken: false
        },
        component: () => import('../views/aboutmoment/aboutMomentPage.vue')
      }
    ]
  },
  {
    path: '/user/:id',
    component: SimpleLayout,
    children: [
      {
        path: '',
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
  },
  // 我的相关页面
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
  },
  {
    path: '/myjoinedgroups',
    component: SimpleLayout,
    children: [
      {
        path: '',
        name: 'myjoinedgroups',
        meta: {
          title: '加入的队伍',
          keepAlive: false,
          hideNavbar: false,
          noToken: false
        },
        component: () => import('../views/somelist/listMyJoins/MyJoinedTeam.vue')
      }
    ]
  },
  // 发布相关页面
  {
    path: '/publishgroup',
    component: SimpleLayout,
    children: [
      {
        path: '',
        name: 'publishgroup',
        meta: {
          title: '发布队伍',
          keepAlive: false,
          hideNavbar: false,
          noToken: false
        },
        component: () => import('../views/publish/PublishGroupPage.vue')
      }
    ]
  },
  {
    path: '/publishmoment',
    component: SimpleLayout,
    children: [
      {
        path: '',
        name: 'publishmoment',
        meta: {
          title: '发布动态',
          keepAlive: false,
          hideNavbar: false,
          noToken: false
        },
        component: () => import('../views/publish/PublishMoment.vue')
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
