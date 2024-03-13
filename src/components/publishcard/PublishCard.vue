<script setup lang="ts">
import type { PublishCardData } from './types';

interface IProps {
    momentData: PublishCardData,
}
defineEmits(['clickShare', 'clickLike', 'clickComment']);
const { momentData } = defineProps<IProps>();
</script>

<template>
    <main class="bg-white p-2 rounded-lg shadow-lg">
        <div class="top-time flex">
            <van-icon name="dot" size="12" />
            <span class="ml-2 text-black text-lg">2024.02</span>
        </div>
        <div class="card-content py-1">
            <div class="content-text">
                <p>
                    {{ momentData?.content?.desc }}
                </p>
            </div>
            <div class="content-resource my-2 columns-2 flex-wrap">
                <template v-for="img in momentData?.content?.images" :key="img">
                    <van-image class="w-full aspect-square rounded-lg" round :radius="8" fit="cover" :src="img" />
                </template>
            </div>
        </div>
        <div class="card-bottom flex">
            <div class="flex-none" @click.stop="$emit('clickComment')">
                <van-icon name="chat-o" class="text-gray-500" />
                <span class="text-gray-500 ml-1">{{ momentData?.likeCount }}</span>
            </div>
            <div class="flex-none" @click.stop="$emit('clickLike')">
                <van-icon name="good-job-o" class="text-gray-500 ml-2" />
                <span class="text-gray-500 ml-1">{{ momentData?.commentCount }}</span>
            </div>
            <div class="flex-1 text-right" @click.stop="$emit('clickShare')">
                <van-icon name="share-o" class="text-gray-500 ml-2" />
            </div>
        </div>
    </main>
</template>



<style scoped></style>