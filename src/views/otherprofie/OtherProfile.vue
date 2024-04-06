<script setup lang="ts">
import { getMomentPostComments, getMomentPostLikes, getTeamMembers, likeMomentPost } from '@/api/post';
import { followOneUser, getUSerCardInfo, getUserPublish } from '@/api/user';
import type { UserShowCard } from '@/api/user/types';
import ChatAndFollowButton from '@/components/chatandfollowbutton/ChatAndFollowButton.vue';
import type { CommentDetail, CommentState } from '@/components/commentplane/types';
import type { GroupCardData } from '@/components/groupcard/types';
import type { MomentCardData } from '@/components/momentsactivitycard/types';
import { SHAREOPTIONS } from '@/config';
import { useUserStore } from '@/stores/modules/user';
import { calculateDiffDate } from '@/utils/tool';
import { debounce } from 'lodash';
import { showToast } from 'vant';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()
const useUser = useUserStore()
const user_id = computed(() => Number(route.params.id))
// handle top 
const topState = reactive({
    isShow: false,
    shareOptions: SHAREOPTIONS
})
const cardShare = reactive({
    isShow: false,
    shareOptions: SHAREOPTIONS
})
const handleTopShare = () => {
    topState.isShow = true;
}

onMounted(() => {
    getUserInfoCardData(user_id.value)
})
/** 用户信息展示 */
const userInfoCardData = ref<UserShowCard>()
/** 获取用户信息 */
const getUserInfoCardData = async (user_id: number) => {
    try {
        let result = await getUSerCardInfo(user_id)
        userInfoCardData.value = result.data
    } catch (error) {
        console.error(error)
    }
}





// ------我的发布数据处理------//
onMounted(() => {
    user_id.value && getMyPublish(user_id.value)
})

const cardData = ref<any>([]);
interface PostData {
    [key: number]: any[];
}

const momentComments = reactive<PostData>({});
const likeUsers = reactive<PostData>({});

/** 获取加入小队的成员 */
const getGroupPeoples = async (post_id: number) => {
    const res = await getTeamMembers(post_id)
    return res.data;
}


/** 获取动态评论 */
const getMomentComments = async () => {
    const post_id = commemtPageState.value.post_id
    const config = {
        page: commemtPageState.value.currentPage,
        limit: commemtPageState.value.pageSize,
        post_id: commemtPageState.value.post_id
    }
    let res = await getMomentPostComments(config)

    const comments = res.data.list.map((item: any) => {
        const { comment_id, user_info, content, created_at, } = item
        return {
            comment_id,
            userInfo: user_info,
            content,
            createTime: created_at,
        }
    });

    if (momentComments[post_id] && momentComments[post_id].length <= commemtPageState.value.total) {
        momentComments[post_id] = momentComments[post_id].concat(comments);
    } else if (!momentComments[post_id]) {
        momentComments[post_id] = comments;
    }

    commentList.value = momentComments[post_id];
    commemtPageState.value.total = res.data.totalCount!;
    commemtPageState.value.pageSize = res.data.pageSize!;
    commemtPageState.value.currentPage = res.data.currentPage!;
    commentState.value.loading = false;
    commentState.value.finished = commentList.value.length >= commemtPageState.value.total!;
}
/** 获取动态点赞用户id列表 */
const getMomentLikes = async (post_id: number) => {
    let res = await getMomentPostLikes(post_id)
    likeUsers[post_id] = res.data;
}
/** 获取他的发布 */
const getMyPublish = async (user_id: number, page: number = 1, limit: number = 10) => {
    let res = await getUserPublish({ user_id, page, limit });

    // 等待所有异步操作完成，再处理返回的数据
    const publichList: any[] = res.data.list.map(async (item: any) => {
        const user_info = userInfoCardData.value?.user_info

        if (item.post_id) {
            const joinMans = await getGroupPeoples(item.post_id); // 等待异步操作完成
            const gropCardData: GroupCardData = {
                card_id: item.post_id,
                userInfo: {
                    user_id: user_info?.user_id ?? 0,
                    nickname: user_info?.nickname ?? 'Unkonw',
                    avatar_url: user_info?.avatar_url ?? "",
                    likeFans: joinMans
                },
                condition: {
                    destination: [item.start_location, item.end_location],
                    time: item.duration_day
                },
                desc: item.title,
                cover_imgUrl: item.images[0].image_url,
                createTime: item.created_at,
            }

            return { type: 'group', data: gropCardData }
        } else {
            await getMomentLikes(item.dynamic_post_id)
            const isLike = likeUsers[item.dynamic_post_id].some((item: any) => item.user_id === user_info?.user_id)
            const momentCardData: MomentCardData = {
                card_id: item.dynamic_post_id,
                userInfo: {
                    user_id: user_info?.user_id ?? 0,
                    nickname: user_info?.nickname ?? 'Unkonw',
                    avatar_url: user_info?.avatar_url ?? "",
                },
                isFollow: false,
                isLike,
                content: {
                    desc: item.content,
                    images: item.images,
                },
                createTime: item.created_at,
                likeCount: item.like_count,
                commentCount: item.comment_count,
            }

            return { type: 'moment', data: momentCardData }
        }
    })

    // 等待所有异步操作完成后，将结果添加到 cardData 中
    const resolvedPublichList = await Promise.all(publichList);
    cardData.value = resolvedPublichList;
}


//------卡片的交互逻辑处理------//

/** 动态卡片数据 */
const momentCardList = ref<any>([])
watch(cardData, (newValue) => {
    momentCardList.value = newValue.filter((item: any) => item.type === 'moment');
})

/** 评论数据 */
const commentList = ref<CommentDetail[]>([])
/** 评论加载状态 */
const commentState = ref<CommentState>({
    loading: false,
    finished: false,
    error: false,
})
const commemtPageState = ref({
    currentPage: 1,
    pageSize: 10,
    total: -1,
    post_id: -1
})

const innitState = () => {
    commentState.value.loading = false;
    commentState.value.finished = false;
    commentState.value.error = false;
    commemtPageState.value.currentPage = 1;
    commemtPageState.value.pageSize = 10;
    commemtPageState.value.total = -1;
    commemtPageState.value.post_id = -1;
}

/** 显示评论面板状态 */
const commemtPlaneShow = ref(false);

const handleCommentOnLoad = async () => {
    await getMomentComments()
    commemtPageState.value.currentPage++;
}

/** 点击评论 */
const handleClickMomment = async (postId: number) => {
    commemtPlaneShow.value = true;
    innitState();
    commemtPageState.value.post_id = postId;
    commentList.value = [];
    // await getMomentComments()
}
/** 点赞动态 */
const handleClickLike = debounce(async (postId: number) => {
    const user_info = useUser.userInfo
    const config = {
        post_id: postId,
        user_id: user_info?.user_id!,
    }
    try {
        const res = await likeMomentPost(config);

        momentCardList.value.forEach((item: any, index: number) => {
            if (item.data.card_id === postId) {
                momentCardList.value[index].data.likeCount += res.data;
                momentCardList.value[index].data.isLike = !momentCardList.value[index].data.isLike;
            }
        });
        showToast(res.msg);
    } catch (error) {
        showToast("操作失败");
    }
}, 200)
const handleShare = () => {
    topState.isShow = true;
}


/** 点击卡片 */
const handleCardClick = (postId: number, postType: 'moment' | 'group') => {
    if (postType === 'moment') {
        router.push('/momentdetail' + postId)
    }
}


// 判断是否关注

const isMyfollow = computed(() => {
    return useUser.myFollows.data.some((item: any) => item.user_id === user_id.value)
})
const isFollow = ref(isMyfollow.value)

const handleClickChat = () => {
    const user_info = useUser.userInfo
    if (!user_info) {
        showToast('请先登录')
        router.push('/login')
        return
    }
    router.push('/chat/' + user_id.value)
}
/** 点击关注 */
const handleClickFollow = debounce(async () => {

    // 我的信息
    const user_info = useUser.userInfo
    if (!user_info) {
        showToast('请先登录')
        router.push('/login')
        return
    }
    const config = {
        follower_id: user_info?.user_id!,
        following_id: user_id.value,
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

</script>
<template>
    <main>
        <div class="fixed z-50 top-0 w-full h-10 py-2 bg-transparent">
            <div class="flex justify-between">
                <!-- 客服 -->
                <van-icon @click="router.back()" class="mx-2" color="#fff" name="arrow-left" size="30" />
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
                        <img class="w-4/5 h-4/5 rounded-full" :src="userInfoCardData?.user_info.avatar_url"
                            alt="avatar">
                    </div>
                    <BlankSpaceBox class="flex-1" />
                    <div class="flex-none">
                        <div class="text-lg font-bold">{{ userInfoCardData?.user_info.nickname }}</div>
                        <div class="text-sm">ID:{{ userInfoCardData?.user_info.user_id }}</div>
                    </div>
                </div>
                <div class="profile-center  px-2">
                    <div class="w-full">
                        <!-- 个性签名 -->
                        <div class="text-left text-sm text-slate-500">{{ userInfoCardData?.bio }}</div>
                        <!-- 标签 -->

                        <template v-for="tag in userInfoCardData?.tags" :key="tag.tag_id">
                            <van-tag class="mx-1" round color="#ffe1e1" text-color="#ad0000">
                                <span class=" h-4 text-center" style="font-size: 8px;">
                                    {{ tag.tag_name }}
                                </span>
                            </van-tag>
                        </template>
                    </div>
                </div>
                <div class="proflie-bottom  p-2">
                    <div class="flex justify-between items-center ">
                        <span class="flex-1 text-xs">
                            一起旅行了
                            <strong class="text-blue-500">
                                {{ calculateDiffDate(userInfoCardData?.created_at) }}
                            </strong>
                            天
                        </span>
                        <div class="flex flex-none items-center ">
                            <div class="flex flex-col items-center flex-none mx-2">
                                <div class="text-sm">{{ userInfoCardData?.followCount }}</div>
                                <div class="text-xs">关注</div>
                            </div>
                            <div class="flex flex-col items-center flex-none mx-2">
                                <div class="text-sm">{{ userInfoCardData?.fansCount }}</div>
                                <div class="text-xs">粉丝</div>
                            </div>
                            <div class="flex flex-col items-center flex-none mx-2">
                                <div class="text-sm">{{ userInfoCardData?.likeCount }}</div>
                                <div class="text-xs">喜欢</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 我的组队，设置，个人资料 卡片 -->

            <div class="my-2">
                <h4 class="text-gray-500 text-sm">我的发布</h4>
                <van-empty class="my-4 bg-white rounded-md" v-if="!cardData.length" description="未发布任何内容" />
                <template v-for="moment in cardData" :key="moment.id">
                    <PublishCard class="my-4" :card-data="moment.data" :type="moment.type"
                        @click="() => handleCardClick(moment.data.card_id, moment.type)"
                        @click-like="() => handleClickLike(moment.data.card_id)" @click-share="handleShare"
                        @click-comment="() => handleClickMomment(moment.data.card_id)" />
                </template>
            </div>
            <van-share-sheet v-model:show="cardShare.isShow" title="立即分享给好友" :options="cardShare.shareOptions" />
        </div>
        <van-action-sheet class="h-screen" v-model:show="commemtPlaneShow" title="评论">
            <CommentPlane v-model:loading="commentState.loading" v-model:finished="commentState.finished"
                v-model:error="commentState.error" :comment-list="commentList"
                :handle-comment-on-load="handleCommentOnLoad" />
        </van-action-sheet>

        <ChatAndFollowButton left-btn-type="primary" right-btn-type="success" :is-follow="isFollow"
            @left-btn-click="handleClickChat" @right-btn-click="handleClickFollow" />
    </main>
</template>
<style scoped></style>