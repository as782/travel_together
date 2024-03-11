<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
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
    router.push(`chat/${id}`);
}
</script>
<template>
    <main class="bg-white">
        <van-sticky :offset-top="50">
            <van-notice-bar left-icon="volume-o" background="#ecf9ff" :scrollable="false">
                <van-swipe vertical class="notice-swipe" :autoplay="3000" :touchable="false" :show-indicators="false">
                    <van-swipe-item>明月直入，无心可猜。</van-swipe-item>
                    <van-swipe-item>仙人抚我顶，结发受长生。</van-swipe-item>
                    <van-swipe-item>今人不见古时月，今月曾经照古人。</van-swipe-item>
                </van-swipe>
            </van-notice-bar>
        </van-sticky>
        <div class="system-info flex  p-2 m-2" @click="router.push('/sysinfo')">
            <van-icon name="bell" class="flex-none " size="40" color="#7fab50" />
            <div class="mx-2 flex-1">
                <div class="flex justify-between mb-1">
                    <h4 class="text-sm text-left font-black">{{ '最新动态' }}</h4>
                    <span class="user-state text-xs text-left text-gray-500">{{ 1 }}小时前</span>
                </div>
                <p class="text-xs truncate text-left text-gray-500">{{ '两岸三地发生的事士大夫首发式' }}</p>
            </div>
        </div>
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div v-for="item in list" :key="item" class="user-info flex  p-2 m-2" @click="handleClickMessage(item)">
                <van-image class="flex-none w-12 aspect-square shadow-lg shadow-slate-400" round fit="cover"
                    src="https://img.yzcdn.cn/vant/cat.jpeg" />
                <div class="mx-2 flex-1">
                    <div class="flex justify-between mb-1">
                        <h4 class="text-sm text-left">{{ '阿松大sdsa' }}</h4>
                        <span class="user-state text-xs text-left text-gray-500">{{ 1 }}小时前</span>
                    </div>
                    <p class="text-xs truncate text-left text-gray-500">{{ '两岸三地发生的事士大夫首发式' }}</p>
                </div>
            </div>

        </van-list>
    </main>
</template>



<style scoped>
.notice-swipe {
    height: 40px;
    line-height: 40px;
}
</style>