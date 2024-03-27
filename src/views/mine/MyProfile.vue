<script setup lang="ts">
import { reactive, ref, computed, onActivated } from 'vue';
import { useRouter } from 'vue-router';
import BlankSpaceBox from '@/components/blankspacebox/BlankSpaceBox.vue';
import PublishCard from '@/components/publishcard/PublishCard.vue';
import type { CommentDetail, CommentState } from '@/components/commentplane/types';
import { useUserStore } from "@/stores/modules/user"
import { calculateDiffDate } from '@/utils/tool';
import { getUserPublish } from '@/api/user';
import {
    getTeamMembers,
    getMomentPostComments,
    getMomentPostLikes,
    likeMomentPost
} from '@/api/post';
import type { MomentCardData } from '@/components/momentsactivitycard/types';
import type { GroupCardData } from '@/components/groupcard/types';
import { SHAREOPTIONS } from '@/config/index'
import { watch } from 'vue';
import { debounce } from 'lodash';
import { storeToRefs } from 'pinia';
import { showToast } from 'vant';
import CommentPlane from '@/components/commentplane/CommentPlane.vue';

onActivated(() => {
    console.log('mounted');
    // 获取用户发布的列表;
    const user_id = userInfo?.value?.user_id;

    user_id && getMyPublish(user_id);
    // 获取用户的喜欢关注, 粉丝, 如果数据状态为idle则执行
    myFans.value.status === 'idle' && getMyFollows();
    myFollows.value.status === 'idle' && getMyFans();
    // 获取用户喜欢的帖子列表
    getMylikePostList();

    console.log(momentCardList.value);
})

const router = useRouter();
const userStore = useUserStore();
const { getMyFans, getMyFollows, getMylikePostList } = userStore;
const { userInfo, myFans, myFollows, myLikeGroupPostList, myLikeMomentPostList } = storeToRefs(userStore);
const myFansAndFollowsAndLikesCount = computed(() => {
    const fansCount = myFans.value.data.length;
    const followCount = myFollows.value.data.length;
    const likeCount = myLikeGroupPostList.value.data.length + myLikeMomentPostList.value.data.length;
    return { fansCount, followCount, likeCount };
});



// handle top 
const topState = reactive({
    isShow: false,
    shareOptions: SHAREOPTIONS
})
const cardShare = reactive({
    isShow: false,
    shareOptions: SHAREOPTIONS
})
const handleConnectService = () => {
    router.push('/chat/12')
}
const handleTopShare = () => {
    topState.isShow = true;
}

// tags
const tags = computed(() => {
    return userInfo?.value?.tags || [];
})


// ------我的发布数据处理------//
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
const getMomentComments = async (post_id: number) => {
    let res = await getMomentPostComments(post_id)
    const comments = res.data.list.map((item: any) => {
        const { comment_id, user_info, content, created_at, } = item
        return {
            comment_id,
            userInfo: user_info,
            content,
            createTime: created_at,
        }
    });
    momentComments[post_id] = comments;

}
/** 获取动态点赞用户id列表 */
const getMomentLikes = async (post_id: number) => {
    let res = await getMomentPostLikes(post_id)
    likeUsers[post_id] = res.data;
}
/** 获取我的发布 */
const getMyPublish = async (user_id: number, page: number = 1, limit: number = 10) => {
    let res = await getUserPublish({ user_id, page, limit });

    // 等待所有异步操作完成，再处理返回的数据
    const publichList: any[] = res.data.list.map(async (item: any) => {
        if (item.post_id) {
            const joinMans = await getGroupPeoples(item.post_id); // 等待异步操作完成
            const gropCardData: GroupCardData = {
                card_id: item.post_id,
                userInfo: {
                    user_id: userInfo?.value!.user_id ?? 0,
                    nickname: userInfo?.value!.nickname ?? 'Unkonw',
                    avatar_url: userInfo?.value!.avatar_url ?? "",
                    likeFans: joinMans
                },
                condition: {
                    destination: [item.start_location, item.end_location],
                    time: item.duration_day
                },
                desc: item.title,
                cover_imgUrl: item.images[0].image_url,
                createTime: item.create_time,
            }

            return { type: 'group', data: gropCardData }
        } else {
            await getMomentComments(item.dynamic_post_id)
            await getMomentLikes(item.dynamic_post_id)
            const isLike = likeUsers[item.dynamic_post_id].some((item: any) => item.user_id === userInfo?.value!.user_id)
            const momentCardData: MomentCardData = {
                card_id: item.dynamic_post_id,
                userInfo: {
                    user_id: userInfo?.value!.user_id ?? 0,
                    nickname: userInfo?.value!.nickname ?? "Unknow",
                    avatar_url: userInfo?.value!.avatar_url ?? "",
                },
                isFollow: false,
                isLike,
                content: {
                    desc: item.content,
                    images: item.images,
                },
                createTime: item.create_time,
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
const commentState = reactive<CommentState>({
    loading: false,
    finished: false,
    error: false,
})
/** 显示评论面板状态 */
const commemtPlaneShow = ref(false);

const handleCommentOnLoad = () => {
    commentState.loading = false;
}

/** 点击评论 */
const handleClickMomment = async (postId: number) => {
    commemtPlaneShow.value = true;
    commentList.value = momentComments[postId];
    commentState.finished = true;
}
/** 点赞动态 */
const handleClickLike = debounce(async (postId: number) => {
    const config = {
        post_id: postId,
        user_id: userInfo.value!.user_id,
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
                        <img class="w-4/5 h-4/5 rounded-full" :src="userInfo?.avatar_url" alt="avatar">
                    </div>
                    <BlankSpaceBox class="flex-1" />
                    <div class="flex-none">
                        <div class="text-lg font-bold">{{ userInfo?.nickname }}</div>
                        <div class="text-sm">ID:{{ userInfo?.user_id }}</div>
                    </div>
                </div>
                <div class="profile-center  px-2">
                    <div class="w-full">
                        <!-- 个性签名 -->
                        <div class="text-left text-sm text-slate-500">{{ userInfo?.bio || '这个人很懒，什么都没有留下' }}</div>
                        <!-- 标签 -->

                        <template v-for="tag in tags" :key="tag.id">
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
                                {{ calculateDiffDate(userInfo?.created_at) }}
                            </strong>
                            天
                        </span>
                        <div class="flex flex-none items-center ">
                            <div @click="router.push('/follow')" class="flex flex-col items-center flex-none mx-2">
                                <div class="text-sm">{{ myFansAndFollowsAndLikesCount.followCount }}</div>
                                <div class="text-xs">关注</div>
                            </div>
                            <div @click="router.push('/fans')" class="flex flex-col items-center flex-none mx-2">
                                <div class="text-sm">{{ myFansAndFollowsAndLikesCount.fansCount }}</div>
                                <div class="text-xs">粉丝</div>
                            </div>
                            <div @click="router.push('/like')" class="flex flex-col items-center flex-none mx-2">
                                <div class="text-sm">{{ myFansAndFollowsAndLikesCount.likeCount }}</div>
                                <div class="text-xs">喜欢</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 我的组队，设置，个人资料 卡片 -->
            <div class="flex justify-around p-2 my-4 rounded-lg bg-white ">
                <div @click="router.push('/myjoinedgroups')"
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
            <div>
                <h4 class="text-gray-500 text-sm">我的发布</h4>
                <van-empty class="my-4" v-if="!cardData.length" description="未发布任何内容" />
                <template v-for="moment in cardData" :key="moment.id">
                    <PublishCard class="my-4" :card-data="moment.data" :type="moment.type"
                        @click="() => handleCardClick(moment.data.card_id, moment.type)"
                        @click-like="() => handleClickLike(moment.data.card_id)" @click-share="handleShare"
                        @click-comment="() => handleClickMomment(moment.data.card_id)" />
                </template>
            </div>
            <van-share-sheet v-model:show="cardShare.isShow" title="立即分享给好友" :options="cardShare.shareOptions" />
        </div>
        <van-action-sheet class="h-screen"   v-model:show="commemtPlaneShow" title="评论">
            <CommentPlane v-model:loading="commentState.loading"
                v-model:finished="commentState.finished" v-model:error="commentState.error"
                :comment-list="commentList" :handle-comment-on-load="handleCommentOnLoad" />
        </van-action-sheet>
    </main>
</template>


<style scoped></style>