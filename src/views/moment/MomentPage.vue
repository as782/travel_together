<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import TopNav from '@/components/topnav/TopNav.vue'
import type { MomentCardData } from '@/components/momentsactivitycard/types/index'
import MomentsActivityCard from '@/components/momentsactivitycard/MomentsActivityCard.vue'
import { useRouter } from 'vue-router'
import CommentPlane from '@/components/commentplane/CommentPlane.vue'
import type { CommentDetail, CommentState } from '@/components/commentplane/types'
import { SHAREOPTIONS, shareSelect } from '@/config'
import { getMomentPostComments, getMomentPosts, likeMomentPost } from '@/api/post'
import type { PageParams } from '@/api/user/types'
import { useUserStore } from '@/stores/modules/user'
import { debounce } from 'lodash'
import { showToast } from 'vant'
import { followOneUser } from '@/api/user'

const router = useRouter()
const userStore = useUserStore()
const { userInfo } = userStore
const cardDataList = ref<MomentCardData[]>([])

//--------切换tabs处理--------//
const activeTab = ref('focusman')
/** 关注和世界动态 */
const tabs = ['focusman', 'worldman']
const handleSwitchTab = (tabname: string) => {
  if (tabname == 'focusman' && !userInfo) {
    showToast('请先登录')
    router.push('/login')
    return
  }

  activeTab.value = tabname
  cardDataList.value = []
  pageState.value = {
    currentPage: 1,
    pageSize: 10,
    total: -1
  }
  listState.value = {
    loading: false,
    error: false,
    finished: false
  }
}
onMounted(() => {
  handleSwitchTab(tabs[1])
  getDatalist()
})

/** 控制列表下拉状态，方便分页加载 */
const listState = ref({
  loading: false,
  error: false,
  finished: false
})
const pageState = ref({
  currentPage: 1,
  pageSize: 10,
  total: -1
})

/** 获取所需要数据 */
const getDatalist = async (isGetFollow: boolean = false) => {
  // 获取数据

  const config: PageParams = {
    page: pageState.value.currentPage,
    limit: pageState.value.pageSize,
    user_id: userInfo ? userInfo.user_id : -1
  }
  if (isGetFollow) {
    config.follow = true
  }
  try {
    // listState.value.loading = true;
    // 获取动态
    const res = await getMomentPosts(config)
    const cardList = res.data.list.map((item) => {
      const data: MomentCardData = {
        card_id: item.dynamic_post_id,
        userInfo: item.user_info,
        content: {
          desc: item.content,
          images: item.images
        },
        isFollow: item.isFollowed,
        isLike: item.isLiked,
        likeCount: item.like_count,
        commentCount: item.comment_count,
        createTime: item.created_at
      }
      return data
    })

    cardDataList.value.push(...cardList)

    pageState.value.total = res.data.totalCount!

    pageState.value.currentPage = res.data.currentPage!

    listState.value.loading = false
    listState.value.error = false
    listState.value.finished = pageState.value.total <= cardDataList.value.length
  } catch (error) {
    console.log(error)
    listState.value.loading = false
    listState.value.error = true
  }
}
// 下拉列表刷新处理事件
const listOnloadHandle = debounce(async () => {
  if (activeTab.value === 'focusman') {
    await getDatalist(true)
    pageState.value.currentPage++

  } else {
    await getDatalist()
    pageState.value.currentPage++
  }
}, 100)

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

    cardDataList.value.forEach((item, index) => {
      if (item.card_id === postId) {
        cardDataList.value[index].likeCount += res.data
        cardDataList.value[index].isLike = !cardDataList.value[index].isLike
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
  cardDataList.value.forEach((item, index) => {
    if (item.card_id === postId) {
      cardDataList.value[index].isFollow ? (config.action = 0) : (config.action = 1)
    }
  })

  try {
    const res = await followOneUser(config)
    cardDataList.value.forEach((item, index) => {
      if (item.card_id === postId) {
        cardDataList.value[index].isFollow = !cardDataList.value[index].isFollow
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
  if (commentListState.value.finished) return
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
  <main class="p-2">
    <TopNav>
      <template #left>
        <div class="flex justify-center items-center w-full">
          <span :class="`${activeTab === 'focusman' ? 'tabClass active' : 'tabClass mx-3'}`"
            @click="handleSwitchTab('focusman')">关注</span>
          <span :class="`${activeTab === 'worldman' ? 'tabClass active' : 'tabClass mx-3'}`"
            @click="handleSwitchTab('worldman')">世界</span>
        </div>
      </template>
      <template #right>
        <div class="">
          <van-config-provider :theme-vars="{ searchPadding: 0 }">
            <van-search shape="round" @focus="() => router.push('/search')" />
          </van-config-provider>
        </div>
      </template>
    </TopNav>
    <BlankSpaceBox :height="'50px'" />
    <van-tabs v-model:active="activeTab" animated :show-header="false">
      <template v-for="tabname in tabs" :key="tabname">
        <van-tab :name="tabname">
          <van-list v-model:loading="listState.loading" :finished="listState.finished" finished-text="没有更多了"  class="p-1 sm:columns-2 lg:columns-2 xl:columns-4"
            v-model:error="listState.error" error-text="请求失败，点击重新加载" @load="listOnloadHandle">
            <template v-for="moment in cardDataList" :key="moment.card_id">
              <MomentsActivityCard class="my-2" :moment-data="moment" @click="() => handleCardClick(moment.card_id)"
                @click-like="() => handleClickLike(moment.card_id)" @click-share="handleShare"
                @click-comment="() => handleClickMomment(moment.card_id)"
                @click-follow="() => handleClickFollow(moment.userInfo.user_id, moment.card_id)" />
            </template>
          </van-list>
        </van-tab>
      </template>
    </van-tabs>
    <van-share-sheet @select="shareSelect" v-model:show="topState.isShow" title="立即分享给好友"
      :options="topState.shareOptions" />
    <van-action-sheet class="h-96" v-model:show="commemtPlaneShow" title="评论">
      <CommentPlane v-model:loading="commentListState.loading" v-model:finished="commentListState.finished"
        v-model:error="commentListState.error" :comment-list="commentList"
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
