<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
 
 
// 是否显示顶部导航栏
const IsShowNavbar = computed(() => !route.meta?.hideNavbar);
// 标题是否显示
const IsShowTitle = computed(() => route.meta?.title ? true : false);

const themeVars = reactive({
    navBarHeight: '50px',
    navBarIconColor: '#333',
    navBarTitleTextColor: '#333',
    navBarBackgroundColor: route.params.navTransparent ? "transparent" : "#fff",
});
</script>
<template>
    <main class="bg-slate-200">
        <van-config-provider :theme-vars="themeVars">
            <van-nav-bar v-if="IsShowNavbar" fixed :z-index="999" left-arrow @click-left="router.back()">
                <template #title>
                    <span>
                        {{ IsShowTitle ? route.meta?.title : '' }}
                    </span>
                </template>
            </van-nav-bar>

            <BlankSpaceBox v-if="IsShowNavbar" :height="themeVars.navBarHeight" />

            <RouterView />

        </van-config-provider>
    </main>
</template>



<style scoped></style>