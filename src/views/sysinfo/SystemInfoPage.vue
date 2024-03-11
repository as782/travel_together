<script setup lang="ts">
import BlankSpaceBox from '@/components/blankspacebox/BlankSpaceBox.vue';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const list = ref<number[]>([]);
const loading = ref(false);
const finished = ref(false);
onMounted(() => {
    list.value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
});
const onLoad = () => {
    // 异步更新数据
    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    setTimeout(() => {
        for (let i = 0; i < 10; i++) {
            list.value.push(list.value.length + 1);
        }

        // 加载状态结束
        loading.value = false;

        // 数据全部加载完成
        if (list.value.length >= 40) {
            finished.value = true;
        }
    }, 1000);
}
const handleClickMessage = (id: number) => {
    router.push(`groupDetail/${id}`);
}
</script>
<template>
    <main>
        <van-nav-bar fixed :z-index="999" left-text="返回" left-arrow @click-left="router.back()">
            <template #title>
                <span>
                    {{ route.meta?.title }}
                </span>
            </template>
        </van-nav-bar>
        <BlankSpaceBox :height="'50px'" />
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <template v-for="item in list" :key="item">
                <van-cell :border="true" size="large">
                    <div class="sys-info flex items-center my-1" @click="handleClickMessage(item)">
                        <span class="flex flex-none justify-center items-center w-14 aspect-square rounded-full bg-green-500">
                            <van-icon name="volume" size="40" color="#fff" />
                        </span>
                        <div class="flex-1 p-2 mx-4 rounded-lg  shadow-lg shadow-slate-200">
                            <div class="flex flex-col ">
                                <h4 class="text-sm text-black font-semibold text-left">{{ '一起旅行' }}</h4>
                                <div class="info text-left my-2">
                                    🎈90后一起去土耳其千里海滨自驾， 住遍异国风情海滨民宿 出演属于自己的花儿与少年🎈
                                </div>
                                <span class="user-state text-xs text-right text-gray-500">{{ 1 }}小时前</span>
                            </div>

                        </div>
                    </div>
                </van-cell>
            </template>


        </van-list>
    </main>
</template>


<style scoped></style>