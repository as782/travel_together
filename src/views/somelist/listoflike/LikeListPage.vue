<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { MomentCardData } from '@/components/momentsactivitycard/types/index'
import MomentsActivityCard from '@/components/momentsactivitycard/MomentsActivityCard.vue';
import { useRouter } from 'vue-router';
import CommentPlane from '@/components/commentplane/CommentPlane.vue';
import type { CommentDetail, CommentState } from '@/components/commentplane/types';
import GroupInfoCard from '@/views/home/components/GroupInfoCard.vue';
const router = useRouter();

const activeName = ref('group');

// 卡片 handle
const activeCardData: MomentCardData[] = []
for (let i = 0; i < 10; i++) {
    activeCardData.push({
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

// 动态卡片
const groupCardData = reactive([
    {
        userInfo: {
            id: '11101',
            name: 'LangGO',
            avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
            likeFans: [{
                id: '22201',
                name: "d1",
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
            }, {
                id: '22202',
                name: "d1",
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
            }]
        },

        card_id: 331,
        desc: 'ddffff,如果准备好了的话！ddffff,如果准备好了的话！ddffff,如果准备好了的话！ddffff,如果准备好了的话！ddffff,如果准备好了的话！ddffff,如果准备好了的话！',
        condition: {
            destination: ['', '成都'],
            time: '10'
        },

        cover_imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    },
    {
        userInfo: {
            id: '11102',
            name: 'LangGO',
            avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
            likeFans: [
                {
                    id: '22201',
                    name: "d1",
                    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                },
                {
                    id: '22202',
                    name: "d1",
                    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                }]
        },

        card_id: 12,
        desc: '差不多可以出发了,sa沙发沙发的',
        condition: {
            destination: ['', '成都'],
            time: '10'
        },

        cover_imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    },
    {
        userInfo: {
            id: '11103',
            name: '段誉',
            avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
            likeFans: [{
                id: '22201',
                name: "d1",
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
            }]
        },

        card_id: 111,
        desc: '是的方法,电风扇发射点',
        condition: {
            destination: ['', '成都'],
            time: '10'
        },

        cover_imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    },
    {
        userInfo: {
            id: '11104',
            name: '慕容复',
            avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
            likeFans: [{
                id: '22201',
                name: "d1",
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
            }]
        },

        card_id: 12314,
        desc: '微软微软为,撒阿斯顿',
        condition: {
            destination: ['', '成都'],
            time: '10'
        },

        cover_imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    },
    {
        userInfo: {
            id: '11105',
            name: '北乔峰',
            avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
            likeFans: [{
                id: '22201',
                name: "d1",
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
            }]
        },

        card_id: 132,
        desc: '看了就好看,ui同一天',
        condition: {
            destination: ['', '成都'],
            time: '10'
        },

        cover_imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    }
]);
const handleGotoGroupDetal = (card_id: number) => {
    router.push(`/groupDetail/${card_id}`)
}

</script>
<template>
    <div>
        <van-tabs v-model:active="activeName" animated sticky :offset-top="50">
            <van-tab name="group" title="组队">
                <div class="p-2">
                    <template v-for="cardinfo in groupCardData " :key="cardinfo.card_id">
                        <GroupInfoCard @click="handleGotoGroupDetal(cardinfo.card_id)" :cardData="cardinfo"
                            class="my-4" />
                    </template>
                </div>
            </van-tab>
            <van-tab name="moment" title="动态">
                <div class="p-2">
                    <template v-for="moment in activeCardData" :key="moment.id">
                        <MomentsActivityCard class="my-2" :moment-data="moment"
                            @click="() => handleCardClick(moment.id)" @click-like="() => handleClickLike(moment.id)"
                            @click-share="handleShare" @click-comment="() => handleClickMomment(moment.id)" />
                    </template>
                </div>
            </van-tab>
        </van-tabs>
        <van-share-sheet v-model:show="topState.isShow" title="立即分享给好友" :options="topState.shareOptions" />
        <van-action-sheet v-model:show="commemtPlaneShow" title="评论">
            <CommentPlane v-model:loading="commentState.loading" v-model:finished="commentState.finished"
                v-model:error="commentState.error" :comment-list="commentList"
                :handle-comment-on-load="handleCommentOnLoad" />
        </van-action-sheet>
    </div>
</template>


<style scoped></style>