<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { showImagePreview, showToast } from 'vant';
import type { CommentDetail, CommentState } from '@/components/commentplane/types';
import CommentPlane from '@/components/commentplane/CommentPlane.vue';
import TopNav from '@/components/topnav/TopNav.vue';
import { SHAREOPTIONS } from '@/config';
import type { MomentDetail } from '@/api/post/types';
import { getMomentPostDetail, likeMomentPost } from '@/api/post';
import { useUserStore } from '@/stores/modules/user';
import { debounce } from 'lodash';
import { followOneUser } from '@/api/user';
import { getTimeDiffString } from '@/utils/tool';
import type { UserCard } from '@/api/user/types';
import { publishDynamicPostComment } from '@/api/comment';

const route = useRoute();
const router = useRouter();
const post_id = Number(route.params.id);

// 发帖用户 和我的信息
const useUser = useUserStore();
const postUserInfo = ref<UserCard>();

//#region 关注相关
// 是否我的关注
const isMyFollow = computed(() => {
    return useUser.myFollows.data.some((item) => {
        return item.user_id === postUserInfo.value?.user_id
    })
})
/** 改变关注状态 */
const isFollow = ref(isMyFollow)
/** 点击关注 */
const handleClickFollow = debounce(async () => {

    // 我的信息
    const user_info = useUser.userInfo

    const config = {
        follower_id: user_info?.user_id!,
        following_id: postUserInfo.value?.user_id!,
        action: 1
    }
    try {
        await followOneUser(config)
        useUser.getMyFollows()
        isFollow.value = true


    } catch (error) {
        showToast('操作失败');
    }
}, 200)
//#endregion

// 去往用户主页
const handleGoUserHome = () => {
    const user_id = postUserInfo.value?.user_id
    const myId = useUser.userInfo?.user_id
    if (user_id === myId) return router.push('/mine')

    router.push(`/user/${postUserInfo.value?.user_id}`)
}

onMounted(() => {
    queryMomentDetail(post_id)
})

/** 动态数据 */
let momentData = ref<MomentDetail>()

// img预览
const handleImgclick = (index: number) => {
    showImagePreview({
        images: momentData.value?.images.map(e => e.image_url) || [],
        startPosition: index,
    });

}

/** 查询帖子动态数据 */
const queryMomentDetail = async (postId: number) => {
    try {
        let result = await getMomentPostDetail(postId)
        momentData.value = result.data
        postUserInfo.value = result.data.user_info
        likeCount.value = result.data.like_userIds?.length
        isLike.value = result.data.like_userIds?.some(e => e === useUser.userInfo?.user_id)
    } catch (error) {
        console.error(error);
    }
}

//#region 评论相关
const commentState = reactive<CommentState>({
    loading: false,
    finished: false,
    error: false,
})
const commentList = ref<CommentDetail[]>([])

const handleCommentOnLoad = () => {
    setTimeout(() => {
        commentList.value = momentData.value?.comments?.map(moment => ({
            comment_id: moment.comment_id,
            content: moment.content,
            createTime: moment.created_at,
            userInfo: moment.user_info!
        })).reverse() || []
        commentState.loading = false;
        commentState.finished = true
    }, 1000)
}

// 评论
/** 评论内容*/
const inputTextContent = ref<string>()
/** 发表评论函数 */
const publichComment = async () => {
    if (!inputTextContent.value) {
        showToast('大哥，说点啥再评论吧！')
        return
    }
    try {
        const content = inputTextContent.value
        const user_id = useUser.userInfo?.user_id!
        const params = {
            user_id,
            post_id,
            content
        }
        const result = await publishDynamicPostComment(params)
        showToast(result.msg)
        const date = new Date()
        commentList.value.unshift({
            comment_id: date.getTime(),
            content:inputTextContent.value,
            createTime: date.toISOString(),
            userInfo: useUser.userInfo!
        })
        inputTextContent.value = ''
    } catch (error) {
        console.error(error)
    }

}

//#endregion

// 点赞相关
const likeCount = ref<number>()
const isLike = ref<boolean>()
/** 点赞动态 */
const handleClickLike = debounce(async () => {
    const config = {
        post_id: post_id,
        user_id: useUser.userInfo?.user_id!,
    }
    try {
        const res = await likeMomentPost(config);
        likeCount.value += res.data
        isLike.value = true
        showToast(res.msg);
    } catch (error) {
        showToast("操作失败");
    }
}, 200)


const shareSheet = reactive({
    isShow: false,
    shareOptions: SHAREOPTIONS
})
</script>
<template>
    <main>
        <TopNav>
            <template #left>
                <div class="flex items-center  w-full ">
                    <van-icon name="arrow-left" size="20" @click="router.back()" />
                    <div class="user-info flex  items-center w-52 ml-2" @click="handleGoUserHome">
                        <van-image class="flex-none w-8 aspect-square" round fit="cover"
                            :src="momentData?.user_info?.avatar_url" />
                        <div class="flex flex-col   flex-1 ml-2">
                            <h4 class="text-sm text-left">{{ momentData?.user_info?.nickname }}</h4>
                            <span class="user-state text-xs text-left text-gray-500">
                                {{ getTimeDiffString(momentData?.created_at) }}</span>
                        </div>
                    </div>
                </div>

            </template>
            <template #right>
                <van-button v-if="!isFollow" @click="handleClickFollow" class="w-20" icon="plus" type="primary" round
                    plain size="small">关注</van-button>
                <van-button v-else @click="$router.push(`/chat/${postUserInfo?.user_id}`)" class="w-20" type="success"
                    round plain size="small">私信</van-button>
            </template>
        </TopNav>

        <BlankSpaceBox height="50px" />

        <div class="p-2">
            <div class="moment-content">
                <div class="content-text">
                    {{ momentData?.content }}
                </div>
                <div class="content-resource my-2 columns-2 flex-wrap">
                    <template v-for="(img, index) in momentData?.images" :key="img.image_id">
                        <van-image @click="() => handleImgclick(index)" class="w-full aspect-square rounded-lg" round
                            :radius="8" fit="cover" :src="img.image_url" />
                    </template>
                </div>
            </div>
            <van-divider :style="{ color: '#d3d', borderColor: '#ddf' }">
                <h4>共{{ momentData?.comments?.length }}条评论</h4>
            </van-divider>
            <div class="moment-comment">
                <CommentPlane v-model:loading="commentState.loading" v-model:finished="commentState.finished"
                    v-model:error="commentState.error" :comment-list="commentList"
                    :handle-comment-on-load="handleCommentOnLoad" />
            </div>
        </div>

        <BlankSpaceBox height="50px" />
        <van-action-bar class="p-2">

            <van-field class="flex-1 m-2 rounded-md outline outline-1 outline-blue-300" v-model="inputTextContent"
                left-icon="edit" placeholder="说点啥" />

            <van-button class="flex-none" type="primary" @click="publichComment">发送</van-button>
            <van-action-bar-icon class="flex-none" color="#1989fa" :icon="isLike ? 'like' : 'like-o'"
                :text="`${likeCount}`" @click="handleClickLike" />
            <van-action-bar-icon class="flex-none" icon="share-o" text="分享" @click="() => shareSheet.isShow = true" />

        </van-action-bar>
        <van-share-sheet v-model:show="shareSheet.isShow" title="立即分享给好友" :options="shareSheet.shareOptions" />
    </main>
</template>
<style scoped></style>