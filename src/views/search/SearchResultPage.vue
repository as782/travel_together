<script setup lang="ts">
import GroupInfoCard from '@/components/groupcard/GroupInfoCard.vue'
import MomentsActivityCard from '@/components/momentsactivitycard/MomentsActivityCard.vue'
import { debounce } from 'lodash'
import { reactive, ref } from 'vue'
import { useVirtualList } from '@vueuse/core'
import UserCard from '@/components/usercard/UserCard.vue'
import { useSearchStore } from '@/stores/modules/search'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'
import { showToast } from 'vant'
import { getMomentPostComments, likeMomentPost } from '@/api/post'
import { followOneUser } from '@/api/user'
import { SHAREOPTIONS,shareSelect } from '@/config'
import { storeToRefs } from 'pinia'
import type { CommentDetail, CommentState } from '@/components/commentplane/types'

const router = useRouter()
const useSeach = useSearchStore()
const { groupCardDataList, userCardDataList, momentCardDataList } = storeToRefs(useSeach)
const userStore = useUserStore()
const { userInfo } = userStore

const activeName = ref('a')

const {
  list: groupList,
  containerProps: containerGroupList,
  wrapperProps: wrapGroupList
} = useVirtualList(groupCardDataList, {
  itemHeight: 300,
  overscan: 2
})
const {
  list: userList,
  containerProps: containerUserList,
  wrapperProps: wrapUserList
} = useVirtualList(userCardDataList, {
  itemHeight: 100,
  overscan: 2
})
const {
  list: momentList,
  containerProps: containerMomentList,
  wrapperProps: wrapMomentList
} = useVirtualList(momentCardDataList, {
  itemHeight: 400,
  overscan: 2
})

const handleGotoDetal = (card_id: any) => {
  router.push(`/groupDetail/${card_id}`)
}

//--------卡片交互处理--------//
const handleCardClick = (id: number) => {
  router.push(`/momentDetail/${id}`)
}

/** 处理点击喜欢 */
const handleClickLike = debounce(async (postId: number) => {
  const config = {
    post_id: postId,
    user_id: userInfo?.user_id!
  }
  try {
    const res = await likeMomentPost(config)

    momentCardDataList.value.forEach((item, index) => {
      if (item.card_id === postId) {
        momentCardDataList.value[index].likeCount += res.data
        momentCardDataList.value[index].isLike = !momentCardDataList.value[index].isLike
      }
    })
    showToast(res.msg)
  } catch (error) {
    showToast('操作失败')
  }
}, 200)

/** 点击关注 */
const handleClickFollow = debounce(async (followingId: number, postId: number) => {
  const config = {
    follower_id: userInfo?.user_id!,
    following_id: followingId,
    action: 1
  }
  momentCardDataList.value.forEach((item, index) => {
    if (item.card_id === postId) {
      momentCardDataList.value[index].isFollow ? (config.action = 0) : (config.action = 1)
    }
  })

  try {
    const res = await followOneUser(config)
    momentCardDataList.value.forEach((item, index) => {
      if (item.card_id === postId) {
        momentCardDataList.value[index].isFollow = !momentCardDataList.value[index].isFollow
      }
    })
    showToast(res.msg)
  } catch (error) {
    console.log(error)
    showToast('操作失败')
  }
}, 200)

/** 处理分享 */
const topState = reactive({
  isShow: false,
  shareOptions: SHAREOPTIONS
})
const handleShare = () => {
  topState.isShow = true
}

/** 评论相关 */
const commentList = ref<CommentDetail[]>([])

const commemtPlaneShow = ref(false)
const commentListState = ref<CommentState>({
  loading: false,
  finished: false,
  error: false
})
const commemtPageState = ref({
  currentPage: 1,
  pageSize: 10,
  total: -1,
  post_id: -1
})

const innitState = () => {
  commentListState.value.loading = false
  commentListState.value.finished = false
  commentListState.value.error = false
  commemtPageState.value.currentPage = 1
  commemtPageState.value.pageSize = 10
  commemtPageState.value.total = -1
  commemtPageState.value.post_id = -1
}

/** 获取动态评论列表 */
const getCommentDataList = async () => {
  const config = {
    page: commemtPageState.value.currentPage,
    limit: commemtPageState.value.pageSize,
    post_id: commemtPageState.value.post_id
  }
  try {
    let res = await getMomentPostComments(config)
    const comments = res.data.list.map((item: any) => {
      const { comment_id, user_info, content, created_at } = item
      return {
        comment_id,
        userInfo: user_info,
        content,
        createTime: created_at
      }
    })
    commentList.value.push(...comments)
    commemtPageState.value.total = res.data.totalCount!
    commemtPageState.value.pageSize = res.data.pageSize!
    commemtPageState.value.currentPage = res.data.currentPage!

    commentListState.value.loading = false
    commentListState.value.finished = commentList.value.length >= commemtPageState.value.total!
  } catch (error) {
    commentListState.value.error = true
    commentListState.value.loading = false
  }
}

const handleCommentOnLoad = debounce(async () => {
  await getCommentDataList()
  commemtPageState.value.currentPage++
}, 1000)

const handleClickMomment = async (post_id: number) => {
  commemtPlaneShow.value = true
  innitState()
  commemtPageState.value.post_id = post_id
  commentList.value = []
  await getCommentDataList()
}
</script>
<template>
  <main class="bg-white p-1 h-screen">
    <van-nav-bar
      fixed
      :z-index="999"
      left-arrow
      @click-left="$router.back()"
    >
      <template #title>
        <h4 class="text-sm">
          关于： <span>{{ $route.query.key ? $route.query.key : '空' }}</span> 共
          <em class="text-blue-300">{{ useSeach.dataConunt }}</em> 条结果
        </h4>
      </template>
    </van-nav-bar>
    <BlankSpaceBox :height="'50px'" />
    <van-tabs
      v-model:active="activeName"
      animated
      sticky
    >
      <van-tab
        title="组队"
        name="a"
      >
        <van-empty
          v-if="!groupList.length"
          description="没有更多了"
        ></van-empty>
        <div
          v-bind="containerGroupList"
          style="height: 100vh"
        >
          <div v-bind="wrapGroupList">
            <template
              v-for="cardinfo in groupList"
              :key="cardinfo.data.card_id"
            >
              <GroupInfoCard
                @click="handleGotoDetal(cardinfo.data.card_id)"
                :cardData="cardinfo.data"
                class="m-2"
              />
            </template>
          </div>
        </div>
      </van-tab>
      <van-tab
        title="动态"
        name="b"
      >
        <van-empty
          v-if="!momentList.length"
          description="没有更多了"
        ></van-empty>
        <div
          v-bind="containerMomentList"
          style="height: 100vh"
        >
          <div v-bind="wrapMomentList">
            <template
              v-for="moment in momentList"
              :key="moment.card_id"
            >
              <MomentsActivityCard
                class="my-2"
                :moment-data="moment.data"
                @click="() => handleCardClick(moment.data.card_id)"
                @click-like="() => handleClickLike(moment.data.card_id)"
                @click-share="handleShare"
                @click-comment="() => handleClickMomment(moment.data.card_id)"
                @click-follow="
                  () => handleClickFollow(moment.data.userInfo.user_id, moment.data.card_id)
                "
              />
            </template>
          </div>
        </div>
      </van-tab>
      <van-tab
        title="用户"
        name="c"
      >
        <van-empty
          v-if="!userList.length"
          description="没有更多了"
        ></van-empty>

        <div
          v-bind="containerUserList"
          style="height: 100vh"
        >
          <div v-bind="wrapUserList">
            <div
              class="p-2"
              v-for="cardData in userList"
              :key="cardData.data.nickname"
            >
              <UserCard
                @click="$router.push(`/user/${cardData.data.user_id}`)"
                class="rounded-md bg-slate-300 hover:bg-blue-400"
                :card-data="cardData.data"
              />
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <van-share-sheet
    @select="shareSelect"
      v-model:show="topState.isShow"
      title="立即分享给好友"
      :options="topState.shareOptions"
    />
    <van-action-sheet
      class="h-96"
      v-model:show="commemtPlaneShow"
      title="评论"
    >
      <CommentPlane
        v-model:loading="commentListState.loading"
        v-model:finished="commentListState.finished"
        v-model:error="commentListState.error"
        :comment-list="commentList"
        :handle-comment-on-load="handleCommentOnLoad"
      />
    </van-action-sheet>
  </main>
</template>
<style scoped></style>
