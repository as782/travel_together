<script setup lang="ts">
import { reactive, ref } from 'vue';
import TopNav from '@/components/topnav/TopNav.vue';
import type { MomentCardData } from '@/components/momentsactivitycard/types/index'
import MomentsActivityCard from '@/components/momentsactivitycard/MomentsActivityCard.vue';
import { useRouter } from 'vue-router';
import CommentPlane from '@/components/commentplane/CommentPlane.vue';
import type { CommentDetail, CommentState } from '@/components/commentplane/types';
const router = useRouter();

// tab switch
const activeTab = ref('focusman');
const handleSwitchTab = (tabname: string) => {
    activeTab.value = tabname;

}

// 卡片 handle
const cardData: MomentCardData[] = []
for (let i = 0; i < 10; i++) {
    cardData.push({
        id: i,
        user: {
            id: i,
            nickName: `张${i}三`,
            avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        },
        isFollow: false,
        content: {
            desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis fugiat iusto accusantium officiis doloremque culpa perferendis quis veritatis eum provident!',
            images: [
                'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
                'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
                'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
            ]
        },

        createTime: '1689992122',
        likeCount: i * 21,
        commentCount: i * 76
    },)
}
const handleCardClick = (id: number) => {
    console.log('card click', id);
    router.push(`/momentDetail/${id}`);
}

// card bottom button handle
const topState = reactive({
    isShow: false,
    shareOptions: [
        [
            { name: '微信', icon: 'wechat' },
            { name: '朋友圈', icon: 'wechat-moments' },
            { name: '微博', icon: 'weibo' },
            { name: 'QQ', icon: 'qq' },
        ],
        [
            { name: '复制链接', icon: 'link' },
            { name: '分享海报', icon: 'poster' },
            { name: '二维码', icon: 'qrcode' },
            { name: '小程序码', icon: 'weapp-qrcode' },
        ],
    ]
})
const commentState = reactive<CommentState>({
    loading: false,
    finished: false,
    error: false,
})
const commentList = reactive<CommentDetail[]>([])

const commemtPlaneShow = ref(false);

const handleCommentOnLoad = () => {
    setTimeout(() => {
        for (let i = 0; i < 10; i++) {
            commentList.push({
                id: i + Math.random(),
                user: {
                    id: i + Math.random(),
                    nickname: `平台用户${i % 2 + Math.random().toFixed(2)}`,
                    avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',

                },
                createTime: new Date().getTime().toFixed(2).toString().substring(0, 2),
                content: '星宿老仙派别，无量剑派？'
            });
        }

        commentState.loading = false;

        if (commentList.length > 40) {
            commentState.finished = true;
        }
    }, 1000)
}
const handleClickLike = (id: number) => {
    console.log("like", id);

}
const handleShare = () => {
    topState.isShow = true;
}
const handleClickMomment = (id: number) => {
    commemtPlaneShow.value = true;
    console.log("momment", id);

    for (let i = 0; i < 10; i++) {
        commentList.push({
            id: i + Math.random(),
            user: {
                id: i + Math.random(),
                nickname: `平台用户${i % 2 + Math.random().toFixed(2)}`,
                avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',

            },
            createTime: new Date().getTime().toFixed(2).toString().substring(0, 2),
            content: '星宿老仙派别，无量剑派？'
        })
    }
}

</script>
<template>
    <main class="p-2 bg-slate-200">
        <TopNav>
            <template #left>
                <div class="flex  justify-center items-center  w-full ">
                    <span :class="`${activeTab === 'focusman' ? 'tabClass active' : 'tabClass mx-3'}`"
                        @click="handleSwitchTab('focusman')">关注</span>
                    <span :class="`${activeTab === 'worldman' ? 'tabClass active' : 'tabClass mx-3'}`"
                        @click="handleSwitchTab('worldman')">世界</span>
                </div>
            </template>
            <template #right>
                <div class="">
                    <van-config-provider :theme-vars="{ searchPadding: 0 }">
                        <van-search shape="round" />
                    </van-config-provider>
                </div>
            </template>
        </TopNav>
        <BlankSpaceBox :height="'50px'" />
        <van-tabs v-model:active="activeTab" animated :show-header="false">
            <van-tab name="focusman">
                <template v-for="moment in cardData" :key="moment.id">
                    <MomentsActivityCard class="my-2" :moment-data="moment"
                        @click="() => handleCardClick(moment.id)" @click-like="() => handleClickLike(moment.id)"
                        @click-share="handleShare" @click-comment="() => handleClickMomment(moment.id)" />
                </template>
            </van-tab>
            <van-tab name="worldman">
                <template v-for="moment in cardData" :key="moment.id">
                    <MomentsActivityCard class="my-2" :moment-data="{ ...moment, isFollow: Boolean(moment.id % 2) }"
                        @click="() => handleCardClick(moment.id)" @click-like="() => handleClickLike(moment.id)"
                        @click-share="handleShare" @click-comment="() => handleClickMomment(moment.id)" />
                </template>
            </van-tab>
        </van-tabs>
        <van-share-sheet v-model:show="topState.isShow" title="立即分享给好友" :options="topState.shareOptions" />
        <van-action-sheet v-model:show="commemtPlaneShow" title="评论">
            <CommentPlane v-model:loading="commentState.loading" v-model:finished="commentState.finished"
                v-model:error="commentState.error" :comment-list="commentList"
                :handle-comment-on-load="handleCommentOnLoad" />
        </van-action-sheet>
    </main>
</template>



<style scoped>
.tabclass {
    font-size: 14px;
    color: #ddd;
}

.active {
    color: #333;
    font-weight: 700;
    font-size: 16px;
}
</style>