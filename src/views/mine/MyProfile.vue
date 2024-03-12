<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import BlankSpaceBox from '@/components/blankspacebox/BlankSpaceBox.vue';
import PublishCard from './components/PublishCard.vue';
import type { PublishCardData } from './components/types';
import type { CommentDetail, CommentState } from '@/components/commentplane/types';

const router = useRouter();
const shareOptions = [
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
// handle top 
const topState = reactive({
    isShow: false,
    shareOptions: shareOptions
})
const cardShare = reactive({
    isShow: false,
    shareOptions: shareOptions
})
const handleConnectService = () => {

}
const handleTopShare = () => {
    topState.isShow = true;
}

// tags
const tags = reactive([
    { id: 1, name: '00后' },
    { id: 2, name: '狮子座' },
])

// 卡片 handle
const cardData: PublishCardData[] = []
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
    <main>
        <div class="fixed z-50 top-0 w-full h-10 py-2 bg-transparent">
            <div class="flex justify-between">
                <!-- 客服 -->
                <van-icon @click="handleConnectService" class="mx-2" color="#fff" name="service-o" size="30" />
                <!-- 分享图标 -->
                <van-icon @click="handleTopShare" class="mx-2" color="#fff" name="share-o" size="30" />
            </div>
            <van-share-sheet v-model:show="topState.isShow" title="立即分享给好友" :options="topState.shareOptions" />
        </div>
        <div class="up-bg-img w-full -z-10" style="height: 50vh;">
            <img class="w-full h-full   object-cover"
                src="https://img.pconline.com.cn/images/upload/upc/tx/photoblog/1407/12/c4/36240468_36240468_1405175533420_mthumb.jpg"
                alt="backgrond img">
        </div>

        <div class="down-content p-4 -translate-y-12 ">
            <div class="card-profile rounded-lg  bg-white">
                <div class="profile-top flex flex-row-reverse  w-full p-2">
                    <div
                        class="-translate-y-8 flex flex-none justify-center items-center w-16 h-16 rounded-full  bg-white shadow-lg">
                        <img class="w-4/5 h-4/5 rounded-full"
                            src="https://img.pconline.com.cn/images/upload/upc/tx/photoblog/1407/12/c4/36240468_36240468_1405175533420_mthumb.jpg"
                            alt="avatar">
                    </div>
                    <BlankSpaceBox class="flex-1" />
                    <div class="flex-none">
                        <div class="text-lg font-bold">小明</div>
                        <div class="text-sm">ID:123131</div>
                    </div>
                </div>
                <div class="profile-center  px-2">
                    <div class="w-full">
                        <!-- 个性签名 -->
                        <div class="text-left text-sm text-slate-500">这个人很懒，什么都没有留下</div>
                        <!-- 标签 -->

                        <template v-for="tag in tags" :key="tag.id">
                            <van-tag class="mx-1" round color="#ffe1e1" text-color="#ad0000">
                                <span class="w-6 h-4 text-center" style="font-size: 8px;">
                                    {{ tag.name }}
                                </span>
                            </van-tag>
                        </template>
                    </div>
                </div>
                <div class="proflie-bottom  p-2">
                    <div class="flex justify-between items-center ">
                        <span class="flex-1 text-xs">一起旅行了111天</span>
                        <div class="flex flex-none items-center ">
                            <div class="flex flex-col items-center flex-none mx-2">
                                <div class="text-sm">0</div>
                                <div class="text-xs">关注</div>
                            </div>
                            <div class="flex flex-col items-center flex-none mx-2">
                                <div class="text-sm">0</div>
                                <div class="text-xs">粉丝</div>
                            </div>
                            <div class="flex flex-col items-center flex-none mx-2">
                                <div class="text-sm">0</div>
                                <div class="text-xs">获赞</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 我的组队，设置，个人资料 卡片 -->
            <div class="flex justify-around p-2 my-4 rounded-lg bg-white ">
                <div @click="router.push('/mygroups')"
                    class="flex flex-col justify-center items-center w-20 rounded-sm">
                    <van-icon name="friends-o" size="30"></van-icon>
                    <span class="text-sm text-gray-500"> 我的组队</span>
                </div>
                <div @click="router.push('/setting')" class="flex flex-col justify-center items-center w-20 rounded-sm">
                    <van-icon name="setting-o" size="30" />
                    <span class="text-sm text-gray-500"> 系统设置</span>
                </div>
                <div @click="router.push('/editprofile')"
                    class="flex flex-col justify-center items-center w-20 rounded-sm">
                    <van-icon name="records-o" size="30" />
                    <span class="text-sm text-gray-500">个人资料</span>
                </div>


            </div>
            <div class=" ">
                <h4 class="text-gray-500 text-sm">我的发布</h4>
                <template v-for="moment in cardData" :key="moment.id">
                    <PublishCard class="my-4" :moment-data="moment" @click="() => handleCardClick(moment.id)"
                        @click-like="() => handleClickLike(moment.id)" @click-share="handleShare"
                        @click-comment="() => handleClickMomment(moment.id)" />
                </template>
            </div>
            <van-share-sheet v-model:show="cardShare.isShow" title="立即分享给好友" :options="cardShare.shareOptions" />
            <van-action-sheet v-model:show="commemtPlaneShow" title="评论">
                <CommentPlane v-model:loading="commentState.loading" v-model:finished="commentState.finished"
                    v-model:error="commentState.error" :comment-list="commentList"
                    :handle-comment-on-load="handleCommentOnLoad" />
            </van-action-sheet>
        </div>
    </main>
</template>


<style scoped></style>