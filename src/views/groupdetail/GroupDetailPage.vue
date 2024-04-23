<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { showImagePreview, showToast } from 'vant';
import type { SlideInfo } from '@/components/carousel/types';
import type { CommentState, CommentDetail } from '@/components/commentplane/types';
import CommentPlance from '@/components/commentplane/CommentPlane.vue';
import { SHAREOPTIONS } from '@/config';
import { publishTeamPostComment } from '@/api/comment';
import { useUserStore } from '@/stores/modules/user';
import type { GroupDetail, JoinTeamInfo } from '@/api/post/types';
import { getTeamMembers, getTeamPostDetail, likeTeamPost } from '@/api/post';
import type { UserCard } from '@/api/user/types';
import { debounce } from 'lodash';
import { getUSerCardInfo, joinTeam } from '@/api/user';

const router = useRouter();
const route = useRoute();
const post_id = Number(route.params.id)

// 发帖用户 和我的信息
const useUser = useUserStore();
const postUserInfo = ref<UserCard>();

/** 标签 */
const userTags = ref<any[]>();

/** 获取用户信息 */
const getUserInfoCardData = async (user_id: number) => {
    try {
        let result = await getUSerCardInfo(user_id)
        userTags.value = result.data.tags
    } catch (error) {
        console.error(error)
    }
}

const isSelfPost = computed(() => useUser.userInfo?.user_id === postUserInfo.value?.user_id)

//#region 顶部导航相关
const topState = reactive({
    isShow: false,
    shareOptions: SHAREOPTIONS
})
const handleTopGoback = () => {
    router.back();
}
const handleTopShare = () => {
    topState.isShow = true;
}
//#endregion

//#region 帖子主要内容相关
/** 帖子详情 */
const groupPostDetailData = ref<GroupDetail>();
onMounted(() => {
    getGroupPostDetail(post_id).then(() => {
        getUserInfoCardData(postUserInfo.value?.user_id!)
    })

})

/**获取帖子详情 */
const getGroupPostDetail = async (postId: number) => {
    try {
        const result = await getTeamPostDetail(postId)
        groupPostDetailData.value = result.data;
        // 发帖人信息
        postUserInfo.value = result.data.user_info
        // 喜欢点赞
        likeCount.value = result.data.like_userIds?.length
        isLike.value = result.data.like_userIds?.some(e => e === useUser.userInfo?.user_id)
        // 轮播列表
        imgList.value = result.data.images.map(e => ({
            id: e.image_id,
            imgUrl: e.image_url
        }))
    } catch (error) {
        console.error(error)
    }
}
//#endregion

//#region 轮播图相关操作
const imgList = ref<SlideInfo[]>([]);
// 点击预览轮播图片
const handleImgclick = (index: number) => {
    showImagePreview({
        images: imgList.value.map(item => item.imgUrl),
        startPosition: index,

    });
}
//#endregion

//#region 小队的人员信息
/**小队成员信息列表 */
const joinTeamUserList = ref<JoinTeamInfo[]>([]);
onMounted(() => {
    getJoinTeamUserList(post_id)
})
/** 获取加入小队的人员信息 */
const getJoinTeamUserList = async (postId: number) => {
    try {
        const result = await getTeamMembers(postId)
        joinTeamUserList.value = result.data;
    } catch (error) {
        console.error(error)
    }
}

// 去往用户主页
const toUserHome = (userId: number) => {
    if (userId === useUser.userInfo?.user_id) {
        router.push({ path: `/mine` })
        return;
    }
    router.push({ path: `/user/${userId}` })
}
const handleUselistClick = (event: any) => {
    const userId = event.target.getAttribute('data-user_id');
    toUserHome(userId)
}
//#endregion

//#region 评论相关
const commentState = reactive<CommentState>({
    loading: false,
    finished: false,
    error: false,
})
const commentList = ref<CommentDetail[]>([])

const handleCommentOnLoad = () => {
    setTimeout(() => {
        commentList.value = groupPostDetailData.value?.comments?.map(moment => ({
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
        const result = await publishTeamPostComment(params)
        showToast(result.msg)
        const date = new Date()
        commentList.value.unshift({
            comment_id: date.getTime(),
            content: inputTextContent.value,
            createTime: date.toISOString(),
            userInfo: useUser.userInfo!
        })
        inputTextContent.value = ''
    } catch (error) {
        console.error(error)
    }

}

//#endregion

//#region 点赞相关
const likeCount = ref<number>()
const isLike = ref<boolean>()
/** 点赞动态 */
const handleClickLike = debounce(async () => {
    const config = {
        post_id: post_id,
        user_id: useUser.userInfo?.user_id!,
    }
    try {
        const res = await likeTeamPost(config);
        likeCount.value += res.data
        isLike.value = res.data > 0
        showToast(res.msg);
    } catch (error) {
        showToast("操作失败");
    }
}, 200)
//#endregion

// 加入小队
const handleJoinThisTeam = async () => {

    try {
        const params = {
            user_id: useUser.userInfo?.user_id!,
            post_id: post_id
        }
        await joinTeam(params)
        showToast("加入成功")
    } catch (error) {
        console.error(error)
        showToast("加入失败")
    }
}
</script>

<template>
    <main class="bg-blue-100">
        <van-config-provider>
            <div class="fixed z-50 top-0 w-full h-10 py-2">
                <div class="flex justify-between">
                    <!-- 返回图标 -->
                    <div
                        class=" bg-gray-600 bg-opacity-20 m-2 rounded-full w-12 aspect-square flex items-center justify-center">
                        <van-icon @click="handleTopGoback" class="mx-2" color="#fff" name="arrow-left" size="30" />
                    </div>
                    <!-- 分享图标 -->
                    <div
                        class=" bg-gray-600 bg-opacity-20 m-2 rounded-full w-12 aspect-square flex items-center justify-center">
                        <van-icon @click="handleTopShare" class="mx-2" color="#fff" name="share" size="30" />
                    </div>
                </div>
                <van-share-sheet v-model:show="topState.isShow" title="立即分享给好友" :options="topState.shareOptions" />
            </div>
            <van-swipe :autoplay="3000" lazy-render>
                <van-swipe-item class="h-96" @click="() => handleImgclick(index)" v-for="(image, index) in imgList" :key="image.id">
                    <img :src="image.imgUrl" class="w-96 h-96 object-cover" />
                </van-swipe-item>
            </van-swipe>
            <div class="desc p-2 bg-white">
                <h4 class="text-sm font-bold">{{ groupPostDetailData?.title }}</h4>
                <p style="font-size: 12px;">
                    {{ groupPostDetailData?.description }}
                </p>
                <div class="condition flex flex-col my-2">
                    <div class="destination">
                        <van-icon color="#9d9dff" name="location" />
                        <span class="ml-1 text-gray-400" style="font-size: 12px;">
                            {{ groupPostDetailData?.start_location }} - {{ groupPostDetailData?.end_location }}
                        </span>
                    </div>
                    <div class="time">
                        <van-icon color="#9d9dff" name="clock" />
                        <span class="ml-1 text-gray-400" style="font-size: 12px;">
                            {{ groupPostDetailData?.duration_day }}天
                        </span>
                    </div>
                </div>

                <div class="flex justify-around w-full my-2">
                    <div class="flex flex-col justify-center items-center">
                        <h4 class="text-xs">小队人数</h4>
                        <span class="text-sm text-blue-400 font-bold">{{ groupPostDetailData?.team_size }}人</span>
                    </div>
                    <div class="flex flex-col justify-center items-center">
                        <h4 class="text-xs">预计消费</h4>
                        <span class="text-sm text-blue-400 font-bold">{{ groupPostDetailData?.estimated_expense
                            }}元</span>
                    </div>
                    <div class="flex flex-col justify-center items-center">
                        <h4 class="text-xs">性别要求</h4>
                        <span class="text-sm text-blue-400 font-bold">
                            {{ groupPostDetailData?.gender_requirement == 'male' ? '男'
                                : groupPostDetailData?.gender_requirement == 'female' ? '女' : '不限' }}
                        </span>
                    </div>
                    <div class="flex flex-col justify-center items-center">
                        <h4 class="text-xs">付费方式</h4>
                        <span class="text-sm text-blue-400 font-bold">{{ groupPostDetailData?.payment_method }}</span>
                    </div>

                </div>
            </div>
            <div class="w-full p-2 my-3 bg-white">
                <h4 class="text-gray-500">我们的队长</h4>
                <div class="avator flex items-center w-11/12 h-14  mx-auto shadow-md shadow-gray-300 rounded-3xl">
                    <van-image round class="w-8 flex-none aspect-square mx-2" :src="postUserInfo?.avatar_url" />
                    <div class="flex  flex-1 flex-col">
                        <span class="w-3/5 h-full  mx-1 my-1  truncate text-sm text-nowrap text-gray-500 font-bold">
                            {{ postUserInfo?.nickname }}
                        </span>
                        <div class="flex justify-start">
                            <van-tag class="mr-2" v-for="(tag, i) in userTags" :key="tag" round
                                :type="i % 2 ? 'primary' : 'success'">{{
                                    tag.tag_name }}</van-tag>

                        </div>
                    </div>
                    <van-icon class="flex-none mr-2" color="#9d9dff" name="arrow"
                        @click="() => toUserHome(postUserInfo?.user_id!)" size="30" />
                </div>
            </div>

            <div class="p-2 bg-white">
                <h4 class="text-gray-500  ">已参加的伙伴</h4>
                <div class="w-full my-2">
                    <ul class="flex p-1 overflow-x-auto" @click="handleUselistClick">
                        <template v-for="joinedUser in joinTeamUserList" :key="joinedUser.user_id">
                            <div class="flex flex-col mx-1 justify-center items-center"
                                :data-user_id="joinedUser.user_id">
                                <img class="w-8 aspect-square mx-2 rounded-full" :src="joinedUser.avatar_url"
                                    :data-user_id="joinedUser.user_id" />
                                <span class="mt-1 text-xs text-gray-500" :data-user_id="joinedUser.user_id">{{
                                    joinedUser.nickname }}</span>
                            </div>

                        </template>

                    </ul>
                </div>
            </div>
            <div class="plan w-full p-2 mt-3 bg-white">
                <h4 class="text-gray-500">行程安排</h4>
                <div class="img-content">
                    <img v-if="groupPostDetailData?.itinerary" :src="groupPostDetailData?.itinerary" alt="行程安排">
                    <span v-else class="w-full mx-auto">没有行程安排</span>
                </div>
            </div>
            <!-- 评论区 -->
            <div class="w-full p-2 mt-3 bg-white">
                <h4 class="text-gray-500 m-2">评论 {{ commentList.length }} 条</h4>
                <div class="active-comment flex justify-center items-center">
                    <van-image round class="flex-none w-10  aspect-square mx-2" :src="useUser.userInfo?.avatar_url" />
                    <input v-model="inputTextContent"
                        class="flex-1 rounded-2xl p-1 px-2 mx-2 border border-blue-300 placeholder:text-xs"
                        placeholder="发表一下你的看法" />
                    <van-button type="primary" size="small" @click="publichComment">发送</van-button>
                </div>

                <CommentPlance v-model:loading="commentState.loading" v-model:finished="commentState.finished"
                    v-model:error="commentState.error" :comment-list="commentList"
                    :handle-comment-on-load="handleCommentOnLoad" />
            </div>

            <BlankSpaceBox width="100%" height="50px" />
            <van-action-bar>
                <van-action-bar-icon :icon="isLike ? 'like' : 'like-o'" color="#1989fa" :text="`${likeCount}`"
                    @click="handleClickLike" />
                <van-action-bar-icon icon="chat-o" :text="`${commentList.length}`" />
                <div v-if="!isSelfPost" class="flex flex-1">
                    <van-action-bar-button color="#be99ff" type="warning" :to="`/chat/${postUserInfo?.user_id}`"
                        text="联系队长" />
                    <van-action-bar-button color="#7232dd" type="danger" @click="handleJoinThisTeam" text="立即加入" />
                </div>
                <van-action-bar-button v-else color="#9d9dff" type="danger"
                    :to="`/publishgroup/${groupPostDetailData?.post_id}`" text="去编辑" />

            </van-action-bar>
        </van-config-provider>
    </main>
</template>



<style scoped></style>