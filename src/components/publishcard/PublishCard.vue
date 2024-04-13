<script setup lang="ts">
import GroupInfoCard from '../groupcard/GroupInfoCard.vue';
import type { GroupCardData } from '../groupcard/types';


interface IProps {
    type: 'group' | 'moment',
    cardData: any,
}
defineEmits(['clickShare', 'clickLike', 'clickComment']);
const { cardData, type } = defineProps<IProps>();

</script>

<template>
    <main class="bg-white p-2 rounded-lg shadow-lg">
        <div class="top-time flex items-center relative">
            <i class="w-2 h-2 rounded-full bg-black"></i>
            <span class="ml-2 text-black text-lg">{{ cardData?.createTime.slice(0, 10) }}</span>
            <div class="flex absolute right-0">
                <slot name="edit"></slot>
            </div>
        </div>
        <template v-if="type === 'moment'">
            <div class="card-content py-1">
                <div class="content-text">
                    <p>
                        {{ cardData?.content?.desc }}
                    </p>
                </div>
                <div class="content-resource my-2 columns-2 flex-wrap">
                    <template v-for="img in cardData?.content?.images" :key="img.image_id">
                        <van-image class="w-full aspect-square rounded-lg" round :radius="8" fit="cover"
                            :src="img.image_url" />
                    </template>
                </div>
            </div>
            <div class="card-bottom flex">
                <div class="flex-none" @click.stop="$emit('clickComment')">
                    <van-icon name="chat-o" class="text-gray-500" />
                    <span class="text-gray-500 ml-1">{{ cardData?.commentCount }}</span>
                </div>
                <div class="flex-none" @click.stop="$emit('clickLike')">
                    <van-icon v-if="!cardData.isLike" name="good-job-o" class="text-gray-500 ml-2" />
                    <van-icon v-else name="good-job" class="text-gray-500 ml-2" :color="'#1989fa'" />
                    <span class="text-gray-500 ml-1">{{ cardData?.likeCount }}</span>
                </div>
                <div class="flex-1 text-right" @click.stop="$emit('clickShare')">
                    <van-icon name="share-o" class="text-gray-500 ml-2" />
                </div>
            </div>
        </template>
        <template v-else-if="type === 'group'">
            <GroupInfoCard :card-data="cardData as GroupCardData" />
        </template>
        <span v-else>empty</span>
    </main>
</template>



<style scoped></style>