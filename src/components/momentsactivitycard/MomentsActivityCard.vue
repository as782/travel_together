<script setup lang="ts">
import type { MomentCardData } from './types';

interface IProps {
    momentData: MomentCardData,
}
defineEmits(['clickShare', 'clickLike', 'clickComment']);
const { momentData } = defineProps<IProps>();

</script>
<template>
    <div class="moment-card  p-2 rounded-md   bg-white  shadow-lg shadow-slate-200">
        <div class="card-top flex  items-center">
            <van-image class="flex-none w-8 aspect-square" round fit="cover" :src="momentData?.userInfo?.avatar_url" />
            <div class="flex flex-col flex-1 ml-2">
                <h4 class="text-sm">{{ momentData?.userInfo?.nickname }}</h4>
                <span class="userInfo-state text-xs text-gray-500">{{ momentData?.createTime }}小时前</span>
            </div>
            <van-button v-if="!momentData?.isFollow" class="flex-none" icon="plus" type="primary" round plain
                size="small">关注</van-button>

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
    </div>
</template>



<style scoped></style>