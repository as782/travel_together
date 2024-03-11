<script setup lang="ts">
import BlankSpaceBox from '@/components/blankspacebox/BlankSpaceBox.vue';
import { computed } from 'vue';
import { useRoute,useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
// 标题是否显示
const IsShowTitle = computed(() => route.meta?.title ? true : false);
const IsShowNavbar = computed(() => !route.meta?.hideNavbar);
</script>
<template>
    <main class="bg-white">
        <van-nav-bar fixed :z-index="999" v-if="IsShowNavbar" left-text="返回" left-arrow @click-left="router.back()">
            <template #title>
                <span>
                    {{ IsShowTitle ? route.meta?.title : '' }}
                </span>
            </template>
        </van-nav-bar>
        <BlankSpaceBox :height="'50px'" />
        <div class="bg-gray-400">

        </div>
        <van-action-bar>

            <van-field placeholder="请输入" :border="true">
                <template #extra>
                    <van-button type="primary" size="small">发送</van-button>
                </template>
            </van-field>

            <van-icon class="mx-2" name="smile-o" size="30" />
            <van-icon class="mx-2" name="add-o" size="30" />
        </van-action-bar>
    </main>
</template>



<style scoped></style>