<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { RouterView, useRoute } from 'vue-router'

import BlankSpaceBox from '@/components/blankspacebox/BlankSpaceBox.vue'
import { useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
// 定义枚举类型
type TabBarItem = 'home' | 'moment' | 'message' | 'mine'

const tabActive = ref<TabBarItem>(route.path.split('/')[1] as TabBarItem)

// 修改顶部导航栏高度, 底部TabBar高度和文字颜色
const themeVars = reactive({
  navBarHeight: '50px',
  navBarIconColor: '#333',
  navBarTitleTextColor: '#333',
  navBarBackgroundColor: '#fff',

  // tabbar
  tabBarHeight: '50px',
  tabBarTextColor: '#999',
  tabBarActiveTextColor: '#333'
})

// 是否显示顶部导航栏
const IsShowNavbar = computed(() => !route.meta?.hideNavbar)
// 是否显示底部TabBar
const IsShowTabbar = computed(() => route.meta?.tabBar)
// 是否能够刷新
const IsCanRefresh = computed(() => route.meta?.refresh)
// 标题是否显示
const IsShowTitle = computed(() => (route.meta?.title ? true : false))
// 刷新loading
const refreshLoading = ref(false)
// 处理刷新
const onRefresh = () => {
  setTimeout(() => {
    refreshLoading.value = false
  }, 1000)
}

// 发布遮罩层
const showMask = ref(false)
</script>

<template>
  <main class="overflow-y-hidden bg-slate-200">
    <van-config-provider :theme-vars="themeVars">
      <van-nav-bar
        fixed
        :z-index="999"
        v-if="IsShowNavbar"
      >
        <template #title>
          <span v-if="route.name !== 'home'">
            {{ IsShowTitle ? route.meta?.title : '' }}
          </span>
        </template>
        <template #left>
          <div
            class="flex items-center"
            v-if="route.name == 'home'"
          >
            <img
              class="w-10"
              src="../assets/logo.svg"
              alt=""
            />
            <span class="text-xl font-serif font-medium italic">一起旅行</span>
          </div>
        </template>
        <template #right>
          <div v-if="route.name == 'home'">
            <van-config-provider :theme-vars="{ searchPadding: 0 }">
              <van-search
                shape="round"
                @focus="() => router.push('/search')"
              />
            </van-config-provider>
          </div>
        </template>
      </van-nav-bar>

      <BlankSpaceBox
        v-if="IsShowNavbar"
        :height="themeVars.navBarHeight"
      />

      <!-- login , 及 mainlayout 都先在此显示 -->
      <div ref="scrollRef">
        <van-pull-refresh
          :disabled="!IsCanRefresh"
          v-model="refreshLoading"
          @refresh="onRefresh"
        >
          <RouterView>
            <template #default="{ Component }">
              <transition name="slide-fadein-up">
                <keep-alive>
                  <component
                    :key="route.name || route.path"
                    v-if="route.meta.keepAlive"
                    :is="Component"
                  />
                </keep-alive>
              </transition>
              <component
                :key="route.name || route.path"
                v-if="!route.meta.keepAlive"
                :is="Component"
              />
            </template>
          </RouterView>
        </van-pull-refresh>
      </div>

      <BlankSpaceBox
        v-if="IsShowTabbar"
        :height="themeVars.tabBarHeight"
      />

      <van-tabbar
        v-if="IsShowTabbar"
        v-model="tabActive"
      >
        <van-tabbar-item
          to="/home"
          name="home"
          icon="home-o"
          >首页</van-tabbar-item
        >
        <van-tabbar-item
          to="/moment"
          name="moment"
          icon="circle"
          >圈子</van-tabbar-item
        >
        <div
          class="w-14 aspect-square rounded-full flex justify-center items-center bg-white -translate-y-3"
          @click="showMask = true"
        >
          <div class="flex flex-col items-center">
            <van-icon
              name="add-o"
              size="20"
            ></van-icon>
            <span class="text-xs">发布</span>
          </div>
        </div>
        <van-tabbar-item
          to="/message"
          name="message"
          icon="chat-o"
          >消息</van-tabbar-item
        >
        <van-tabbar-item
          to="/mine"
          name="mine"
          icon="user-circle-o"
          >我的</van-tabbar-item
        >
      </van-tabbar>

      <van-overlay
        :z-index="1000"
        :show="showMask"
        @click="showMask = false"
      >
        <div
          class="relative w-full h-full flex justify-center items-center bd"
          @click.stop
        >
          <div
            @click="router.push('/publishgroup')"
            class="flex flex-col justify-center items-center w-40 h-40 aspect-square mx-5 rounded-3xl border border-blue-300"
          >
            <van-icon
              name="friends-o"
              size="100"
              color="#fff"
            />
            <span class="text-white text-center mt-2"> 发布组队 </span>
          </div>
          <div
            @click="router.push('/publishmoment')"
            class="flex flex-col justify-center items-center w-40 h-40 aspect-square mx-5 rounded-3xl border border-blue-300"
          >
            <van-icon
              name="smile-o"
              size="100"
              color="#fff"
            />
            <span class="text-white text-center mt-2"> 发布动态 </span>
          </div>
          <div class="fixed bottom-0">
            <van-icon
              name="close"
              size="40"
              color="#fff"
              class="absolute top-0 right-0 m-5"
              @click="showMask = false"
            />
          </div>
        </div>
      </van-overlay>
    </van-config-provider>
  </main>
</template>

<style scoped></style>
