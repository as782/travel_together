import 'vue-router'
export {}

declare module 'vue-router' {
  interface RouteMeta {
    // 定义一些元数据
    title?: string // 标题
    hideNavbar?: boolean // 隐藏顶部栏
    tabBar?: boolean // 是否显示底部导航
    keepAlive?: boolean // 是否缓存
    refresh?: boolean // 开启下拉刷新
    noToken?: boolean // 无需登录验证的界面
  }
}
