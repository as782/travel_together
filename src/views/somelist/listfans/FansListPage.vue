<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { CardData } from '@/components/usercard/types/intex';
import UserCard from '@/components/usercard/UserCard.vue';
import { useUserStore } from '@/stores/modules/user';
import type { UserInfo } from '@/api/user/types';
import { calculateAge } from '@/utils/tool'
onMounted(() => {
    getMyFollowList();
})

// 空状态
interface EmptyState {
    desc: string;
    btnText: string;
    imgType: "error" | "network" | "search" | "default";
}
const emptyState = ref<EmptyState>({
    desc: "你还没有粉丝，快去发布更多精彩内容吧！",
    btnText: "去发现",
    imgType: 'default'
});

// 获取关注列表数据
const cardDataList = ref<CardData[]>([]);
const getMyFollowList = async () => {
    const userStore = useUserStore();
    const fans = userStore.myFans; //我的粉丝
    const follows = userStore.myFollows; //我的关注
    const isFollowed = (userId: number) => follows.data.some((item: UserInfo) => item.user_id === userId);
    if (fans.status === 'failed') {
        cardDataList.value = [];
        emptyState.value.desc = "获取粉丝列表失败，请稍后重试！";
        emptyState.value.imgType = 'error';
    }
    cardDataList.value = fans.data.map((item: UserInfo) => {
        const { user_id, avatar_url, nickname, birthday, gender } = item;
        const fansId = user_id;
        return {
            user_id,
            avatar: avatar_url,
            nickname,
            birthday: `${calculateAge(birthday)}`,
            gender: gender === 'male' ? '男' : '女',
            isFollow: isFollowed(fansId),
        }
    })
}
</script>
<template>
    <main class="bg-white">
        <van-list>
            <div v-if="!cardDataList.length" class="w-full ">
                <van-empty :image-size="200" :description="emptyState.desc" :image="emptyState.imgType" />
            </div>
            <template v-else>
                <div class="p-2 " v-for="cardData in cardDataList" :key="cardData.nickname">
                    <UserCard class="rounded-md bg-slate-300 hover:bg-blue-400" :card-data="cardData" />
                </div>
            </template>
        </van-list>
    </main>
</template>


<style scoped></style>