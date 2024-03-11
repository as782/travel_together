<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { showImagePreview } from 'vant';
import type { CommentDetail, CommentState } from '@/components/commentplane/types';
import type { MomentCardData } from '@/components/momentsactivitycard/types';

const route = useRoute();
const router = useRouter();

onMounted(() => {
    queryMomentDetail(Number(route.params.id))
})

let momentData = ref<MomentCardData>({
    id: 0,
    user: {
        id: 0,
        nickName: '',
        avatar: '',
    },
    content: {
        desc: '',
        images: [],
    },
    createTime: '',
    commentCount: 0,
    likeCount: 0,
    isFollow: true,
})

// img预览
const handleImgclick = (index: number) => {
    showImagePreview({
        images: momentData.value.content.images,
        startPosition: index,
    });
    console.log(index);
}

const queryMomentDetail = async (momentId: number) => {
    let data = {
        id: momentId,
        user: {
            id: 1,
            nickName: 'user1',
            avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
        },
        content: {
            desc: `这是一条动态---${momentId}`,
            images: [
                'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
                'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
                'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
            ]
        },
        createTime: '169120120102',
        commentCount: 10,
        likeCount: 20,
        isFollow: false,
    }
    let res: MomentCardData = await new Promise((resolve) => {
        setTimeout(() => {
            resolve(data)
        }, 200);
    })
    momentData.value = res;
}

const commentState = reactive<CommentState>({
    loading: false,
    finished: false,
    error: false,
})
const commentList = reactive<CommentDetail[]>([])

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


const shareSheet = reactive({
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
</script>
<template>
    <main>
        <TopNav>
            <template #left>
                <div class="flex items-center  w-full ">
                    <van-icon name="arrow-left" size="20" @click="router.back()" />
                    <div class="user-info flex  items-center w-52 ml-2">
                        <van-image class="flex-none w-8 aspect-square" round fit="cover"
                            :src="momentData?.user?.avatar" />
                        <div class="flex flex-col   flex-1 ml-2">
                            <h4 class="text-sm text-left">{{ momentData?.user?.nickName }}</h4>
                            <span class="user-state text-xs text-left text-gray-500">{{ momentData?.createTime
                                }}小时前</span>
                        </div>
                    </div>
                </div>

            </template>
            <template #right>
                <van-button v-if="!momentData?.isFollow" class="w-20" icon="plus" type="primary" round plain
                    size="small">关注</van-button>
                <van-button v-else class="w-20" type="success" round plain size="small">私信</van-button>
            </template>
        </TopNav>

        <BlankSpaceBox height="50px" />

        <div class="p-2">
            <div class="moment-content">
                <div class="content-text">
                    {{ momentData?.content?.desc }}
                </div>
                <div class="content-resource my-2 columns-2 flex-wrap">
                    <template v-for="(img, index) in momentData?.content?.images" :key="img">
                        <van-image @click="() => handleImgclick(index)" class="w-full aspect-square rounded-lg" round
                            :radius="8" fit="cover" :src="img" />
                    </template>
                </div>
            </div>
            <van-divider :style="{ color: '#d3d', borderColor: '#ddf' }">
                <h4>共40条评论</h4>
            </van-divider>
            <div class="moment-comment">
                <CommentPlane v-model:loading="commentState.loading" v-model:finished="commentState.finished"
                    v-model:error="commentState.error" :comment-list="commentList"
                    :handle-comment-on-load="handleCommentOnLoad" />
            </div>
        </div>

        <BlankSpaceBox height="50px" />
        <van-action-bar>

            <van-field class="flex-1" left-icon="edit" placeholder="说点啥" />
            <van-action-bar-icon class="flex-none" icon="like-o" text="喜欢" @click="() => { console.log('d') }" />
            <van-action-bar-icon class="flex-none" icon="share-o" text="分享" @click="() => shareSheet.isShow = true" />

        </van-action-bar>
        <van-share-sheet v-model:show="shareSheet.isShow" title="立即分享给好友" :options="shareSheet.shareOptions" />
    </main>
</template>
<style scoped></style>