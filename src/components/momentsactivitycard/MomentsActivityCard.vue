<script setup lang="ts">
import type { MomentCardData } from './types';

interface IProps {
    momentData: MomentCardData,

}
defineEmits(['clickShare', 'clickLike', 'clickComment', 'clickFollow']);
const { momentData } = defineProps<IProps>();

</script>
<template>
    <div class="moment-card  p-2 rounded-md   bg-white  shadow-md shadow-gray-300">
        <div class="card-top flex  items-center">
            <van-image class="flex-none w-8 aspect-square" round fit="cover" :src="momentData?.userInfo?.avatar_url" />
            <div class="flex flex-col flex-1 ml-2">
                <h4 class="text-sm">{{ momentData?.userInfo?.nickname }}</h4>
                <span class="userInfo-state text-xs text-gray-500">{{ momentData?.createTime.slice(0, 10) }}
                    {{ momentData?.createTime.slice(11, 16) }}</span>
            </div>
            
            <van-button class="flex-none" @click.stop="$emit('clickFollow')" :icon="momentData?.isFollow ? '' : 'plus'"
                type="primary" round :plain="momentData?.isFollow" size="small">
                {{ momentData?.isFollow ? "已关注" : "关注" }}
            </van-button>
        </div>
        <div class="card-content py-1">
            <div class="content-text">
                <van-text-ellipsis :content="momentData?.content?.desc" rows="2" expand-text="展开" @click.stop
                    collapse-text="收起" />
            </div>
            <div class="content-resource my-2 columns-2 flex-wrap">
                <template v-for="img in momentData?.content?.images" :key="img.image_id">
                    <van-image class="w-full aspect-square rounded-lg" round :radius="8" fit="cover"
                        :src="img.image_url" />
                </template>
            </div>
        </div>
        <div class="card-bottom flex">
            <div class="flex-none" @click.stop="$emit('clickComment')">
                <van-icon name="chat-o" class="text-gray-500" />
                <span class="text-gray-500 ml-1">{{ momentData?.commentCount }}</span>
            </div>
            <div class="flex-none" @click.stop="$emit('clickLike')">
                <van-icon v-if="!momentData.isLike" name="good-job-o" class="text-gray-500 ml-2" />
                <van-icon v-else name="good-job" class="text-gray-500 ml-2" :color="'#1989fa'" />
                <span class="text-gray-500 ml-1">{{ momentData?.likeCount }}</span>
            </div>
            <div class="flex-1 text-right" @click.stop="$emit('clickShare')">
                <van-icon name="share-o" class="text-gray-500 ml-2" />
            </div>
        </div>
    </div>
</template>



<style scoped></style>