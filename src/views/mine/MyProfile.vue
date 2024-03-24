<script setup lang="ts">
import { reactive, ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import BlankSpaceBox from '@/components/blankspacebox/BlankSpaceBox.vue';
import PublishCard from '@/components/publishcard/PublishCard.vue';
import type { PublishCardData } from '@/components/publishcard/types';
import type { CommentDetail, CommentState } from '@/components/commentplane/types';
import { useUserStore } from "@/stores/modules/user"
import { calculateDiffDate } from '@/utils/tool';
import { getUserPublish } from '@/api/user';
import {
    getTeamMembers,
    getMomentPostComments,
    getMomentPostLikes
} from '@/api/post';
import type { MomentCardData } from '@/components/momentsactivitycard/types';
import type { GroupCardData } from '@/components/groupcard/types';
import { onActivated } from 'vue';
onMounted(() => {


})
onActivated(() => {
    console.log('mounted');
    // 获取用户发布的列表;
    getMyPublish();
    // 获取用户的喜欢关注, 粉丝, 如果数据状态为idle则执行
    myFans.status === 'idle' && getMyFollows();
    myFollows.status === 'idle' && getMyFans();
    // 获取用户喜欢的帖子列表
    getMylikePostList();
})

const router = useRouter();

const { userInfo, myFans, myFollows, myLikeGroupPostList, myLikeMomentPostList, getMyFans, getMyFollows, getMylikePostList } = useUserStore();
const myFansAndFollowsAndLikesCount = computed(() => {
    const fansCount = myFans.data.length;
    const followCount = myFollows.data.length;
    const likeCount = myLikeGroupPostList.data.length + myLikeMomentPostList.data.length;
    return { fansCount, followCount, likeCount };
});
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
const tags = computed(() => {
    return userInfo?.tags || [];
})


// 卡片 handle
const cardData: { type: 'moment' | 'group', data: PublishCardData }[] = reactive([]);
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
    momentComments[post_id] = res.data;

}
/** 获取动态点赞用户id列表 */
const getMomentLikes = async (post_id: number) => {
    let res = await getMomentPostLikes(post_id)
    likeUsers[post_id] = res.data;
}
/** 获取我的发布 */
const getMyPublish = async () => {
    let res = await getUserPublish({ user_id: 1, page: 1, limit: 10 });

    // 等待所有异步操作完成，再处理返回的数据
    const publichList: Promise<{ type: 'moment' | 'group', data: PublishCardData }>[] = res.data.list.map(async (item: any) => {
        if (item.post_id) {
            const joinMans = await getGroupPeoples(item.post_id); // 等待异步操作完成
            const gropCardData: GroupCardData = {
                card_id: item.post_id,
                userInfo: {
                    user_id: userInfo?.user_id ?? 0,
                    nickname: userInfo?.nickname ?? 'Unkonw',
                    avatar_url: userInfo?.avatar_url ?? "",
                    likeFans: joinMans
                },
                condition: {
                    destination: [item.start_location, item.end_location],
                    time: item.duration_day
                },
                desc: item.title,
                cover_imgUrl: item.images[0],
                createTime: item.create_time,
            }

            return { type: 'group', data: gropCardData } as { type: 'moment' | 'group', data: GroupCardData }
        } else {
            await getMomentComments(item.dynamic_post_id)
            await getMomentLikes(item.dynamic_post_id)
            const isLike = likeUsers[item.dynamic_post_id].some((item: any) => item.user_id === userInfo?.user_id)
            const momentCardData: MomentCardData = {
                card_id: item.dynamic_post_id,
                userInfo: {
                    user_id: userInfo?.user_id ?? 0,
                    nickname: userInfo?.nickname ?? "Unknow",
                    avatar_url: userInfo?.avatar_url ?? "",
                },
                isFollow: false,
                isLike,
                content: {
                    desc: item.content,
                    images: item.images,
                },
                createTime: item.create_time,
                likeCount: likeUsers[item.dynamic_post_id].length,
                commentCount: momentComments[item.dynamic_post_id].length
            }

            return { type: 'moment', data: momentCardData } as { type: 'moment' | 'group', data: MomentCardData }
        }
    })

    // 等待所有异步操作完成后，将结果添加到 cardData 中
    const resolvedPublichList = await Promise.all(publichList);
    cardData.push(...resolvedPublichList);
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
                    <PublishCard class="my-4" :card-data="moment.data" :type="moment.type"
                        @click="() => handleCardClick(moment.data.card_id)"
                        @click-like="() => handleClickLike(moment.data.card_id)" @click-share="handleShare"
                        @click-comment="() => handleClickMomment(moment.data.card_id)" />
                </template>
            </div>
            <van-share-sheet v-model:show="cardShare.isShow" title="立即分享给好友" :options="cardShare.shareOptions" />
            <van-action-sheet v-model:show="commemtPlaneShow" title="评论">
                <CommentPlane class="h-52" v-model:loading="commentState.loading"
                    v-model:finished="commentState.finished" v-model:error="commentState.error"
                    :comment-list="commentList" :handle-comment-on-load="handleCommentOnLoad" />
            </van-action-sheet>
        </div>
    </main>
</template>


<style scoped></style>