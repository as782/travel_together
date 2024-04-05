<script setup lang="ts">
import { getInteractiveNotifications } from '@/api/message';
import { MessageType, type GetInteractiveNotificationsResponse } from '@/api/message/types';
import type { UserCard } from '@/api/user/types';
import { useUserStore } from '@/stores/modules/user';
import { getTimeDiffString } from '@/utils/tool';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const useUser = useUserStore();

const list = ref<number[]>([]);
const loading = ref(false);
const finished = ref(false);
onMounted(() => {
    getLastNotice()
    list.value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
});

const pageState = ref({
    currentPage: 1,
    pageSize: 10,
    total: -1
})



interface NoticeCardData {
    id: number;
    senderInfo: UserCard
    content: string;
    related_id: number;
    related_type: MessageType;
    image?: string;
    create_time: string;
}
function cickSwicth(type: string) {
    MessageType.DYNAMIC_POST_COMMENT
    switch (type) {
        case MessageType.DYNAMIC_POST_COMMENT:
            return 'dynamic_post'
        case MessageType.DYNAMIC_POST_LIKE:
            return 'dynamic_post'
        case MessageType.TEAM_ACTIVITY_POST_COMMENT:
            return 'team_post'
        case MessageType.TEAM_ACTIVITY_POST_LIKE:
            return 'team_post'
        case MessageType.FOLLOW_NOTIFICATION:
            return 'user'

        default:
            return 'user'
    }
}
const noticeList = ref<NoticeCardData[]>([])

/** 获取通知 */
const getLastNotice = async () => {
    if (pageState.value.total != -1 && pageState.value.total <= (pageState.value.currentPage - 1) * pageState.value.pageSize) {
        return
    }
    const params = {
        page: pageState.value.currentPage,
        limit: pageState.value.pageSize,
        user_id: useUser.userInfo?.user_id!
    }
    const result = await getInteractiveNotifications(params)

    noticeList.value = noticeList.value.concat(result.data.list.map((item) => {
        return {
            id: item.id,
            senderInfo: item.senderInfo,
            content: item.content,
            related_id: item.related_id,
            related_type: item.type,
            image: item.image,
            create_time: getTimeDiffString(item.created_at)
        }
    }).reverse())
    pageState.value.total = result.data.totalCount!
    pageState.value.currentPage = result.data.currentPage!
    pageState.value.pageSize = result.data.pageSize!
    if (pageState.value.total === noticeList.value.length) {
        finished.value = true
    }
}

const onLoad = async () => {
    pageState.value.currentPage++
    await getLastNotice()
    loading.value = false
}
const handleClickMessage = (message: NoticeCardData) => {
    const type = cickSwicth(message.related_type)
    if (type === 'dynamic_post') {
        router.push(`/dynamicDetail/${message.related_id}`)
    } else if (type === 'team_post') {
        router.push(`/groupDetail/${message.related_id}`)
    } else if (type === 'user') {
        router.push(`/user/${message.related_id}`)
    }
}
</script>
<template>
    <main>
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <template v-for="item in noticeList" :key="item.id">
                <van-cell :border="true" size="large">
                    <div class="sys-info flex items-center my-1" @click="handleClickMessage(item)">
                        <span class="flex">
                            <van-image :src="item.senderInfo.avatar_url"
                                class="flex-none w-10 aspect-square shadow-lg shadow-slate-400" round
                                fit="cover"></van-image>
                        </span>
                        <div class="flex-1 p-2 mx-4 rounded-lg  shadow-lg shadow-slate-200">
                            <div class="flex flex-col ">
                                <div class="flex">
                                    <span class="mx-2 text-violet-400">{{ item.senderInfo.nickname }}</span>
                                    <h4 v-if="item.related_type === MessageType.FOLLOW_NOTIFICATION"
                                        class="text-sm text-black font-semibold text-left">
                                        {{ item.content === '关注' ? '关注了你❤️💖' : '取消对你的关注💔' }}
                                    </h4>
                                    <h4 v-else-if="item.related_type === MessageType.TEAM_ACTIVITY_POST_COMMENT"
                                        class="text-sm text-black font-semibold text-left">
                                        评论了你的组队☕
                                    </h4>
                                    <h4 v-else-if="item.related_type === MessageType.DYNAMIC_POST_COMMENT"
                                        class="text-sm text-black font-semibold text-left">
                                        评论了你的动态☕
                                    </h4>
                                    <h4 v-else-if="item.related_type === MessageType.TEAM_ACTIVITY_POST_LIKE"
                                        class="text-sm text-black font-semibold text-left">
                                        点赞了你的组队👍🤩
                                    </h4>
                                    <h4 v-else-if="item.related_type === MessageType.DYNAMIC_POST_LIKE"
                                        class="text-sm text-black font-semibold text-left">
                                        点赞了你的动态👍🤩
                                    </h4>
                                    <h4 v-else class="text-sm text-black font-semibold text-left">
                                        ????
                                    </h4>
                                </div>

                                <div v-if="item.related_type !== MessageType.FOLLOW_NOTIFICATION && item.related_type !== MessageType.TEAM_ACTIVITY_POST_LIKE && item.related_type !== MessageType.DYNAMIC_POST_LIKE"
                                    class="info text-left my-2 active-desc">
                                    <p> {{ item.content }}</p>
                                </div>
                                <span class="user-state text-xs text-right text-gray-500">{{ item.create_time }}</span>
                            </div>

                        </div>
                    </div>
                </van-cell>
            </template>


        </van-list>
    </main>
</template>


<style scoped></style>