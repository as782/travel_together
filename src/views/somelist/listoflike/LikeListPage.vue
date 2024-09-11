<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import { debounce } from 'lodash'
import type { MomentCardData } from '@/components/momentsactivitycard/types/index'
import MomentsActivityCard from '@/components/momentsactivitycard/MomentsActivityCard.vue'
import GroupInfoCard from '@/components/groupcard/GroupInfoCard.vue'
import { usePostStore } from '@/stores/modules/post'
import { useUserStore } from '@/stores/modules/user'
import { getTeamMembers, likeMomentPost } from '@/api/post/index'
import { followOneUser } from '@/api/user/index'
import type { GroupCardData } from '@/components/groupcard/types'
import { SHAREOPTIONS, shareSelect } from '@/config'
 
const router = useRouter()
const postStore = usePostStore()
const userStore = useUserStore()

const { myLikeGroupPostList, myLikeMomentPostList, myFollows, userInfo } = storeToRefs(userStore)
const { myLikeGroupPostDetailList, myLikeMomentPostDetailList } = storeToRefs(postStore)

const groupPostIds = myLikeGroupPostList.value.data.map((item) => item.post_id)
const momentPostIds = myLikeMomentPostList.value.data.map((item) => item.dynamic_post_id)
const activeName = ref('group')

watch(
  activeName,
  (newValue) => {
    if (newValue === 'group') {
      postStore.getMyLikeGroupPostDetailList(groupPostIds)
    } else if (newValue === 'moment') {
      postStore.getMyLikeMomentPostDetailList(momentPostIds)
    }
  },
  { immediate: true }
)

// -----喜欢动态Tab页处理-----//
/** 喜欢的动态数据列表 */
const momentCardData = ref<MomentCardData[]>([])
const momentlist = computed(() => {
  return myLikeMomentPostDetailList.value.data.map((item) => {
    const isMyfollow = myFollows.value.data.some((user) => user.user_id === item.user_info!.user_id)
    const isMylike = item.like_userIds!.some((id) => id === userInfo.value?.user_id)
    const data: MomentCardData = {
      card_id: item.dynamic_post_id,
      userInfo: item.user_info!,
      content: {
        desc: item.content,
        images: item.images
      },
      isFollow: isMyfollow,
      isLike: isMylike,
      likeCount: item.like_userIds?.length!,
      commentCount: item.comments?.length!,
      createTime: item.created_at
    }
    return data
  })
})
watch(
  momentlist,
  (newValue) => {
    momentCardData.value = newValue
  },
  { deep: true }
)

/** 点击动态卡片 */
const handleMomentCardClick = (id: number) => {
  // console.log('momentCard click', id)
  router.push(`/momentDetail/${id}`);
}

// 动态卡片底部交互处理
/** 分享弹出控制 */
const topState = reactive({
  isShow: false,
  shareOptions: SHAREOPTIONS
})

/** 点击关注 */
const handleClickFollow = debounce(async (followingId: number, postId: number) => {
  const config = {
    follower_id: userInfo.value?.user_id!,
    following_id: followingId,
    action: 1
  }
  momentCardData.value.forEach((item, index) => {
    if (item.card_id === postId) {
      momentCardData.value[index].isFollow ? (config.action = 0) : (config.action = 1)
    }
  })

  try {
    const res = await followOneUser(config)
    momentCardData.value.forEach((item, index) => {
      if (item.card_id === postId) {
        momentCardData.value[index].isFollow = !momentCardData.value[index].isFollow
        console.log(momentCardData.value[index].isFollow)
      }
    })
    showToast(res.msg)
  } catch (error) {
    console.log(error)
    showToast('操作失败')
  }
}, 200)
/** 点击喜欢 */
const handleClickLike = debounce(async (postId: number) => {
  const config = {
    post_id: postId,
    user_id: userInfo.value!.user_id
  }
  try {
    const res = await likeMomentPost(config)

    momentCardData.value.forEach((item, index) => {
      if (item.card_id === postId) {
        momentCardData.value[index].likeCount += res.data
        momentCardData.value[index].isLike = !momentCardData.value[index].isLike
      }
    })
    showToast(res.msg)
  } catch (error) {
    showToast('操作失败')
  }
}, 200)
/** 点击分享 */
const handleShare = () => {
  topState.isShow = true
}

// ------喜欢的组队Tab页处理-----//
/** 组队卡片数据列表 */
const groupCardData = ref<GroupCardData[]>([])

/** 获取加入小队的成员 */
const getGroupPeoples = async (post_id: number) => {
  const res = await getTeamMembers(post_id)
  return res.data
}
watch(
  myLikeGroupPostDetailList,
  async (newValue) => {
    groupCardData.value = await Promise.all(
      newValue.data.map(async (item) => {
        const { user_info } = item
        const joinMans = await getGroupPeoples(item.post_id) // 等待异步操作完成
        return {
          userInfo: {
            user_id: user_info?.user_id ?? 0,
            nickname: user_info?.nickname ?? 'Unkonw',
            avatar_url: user_info?.avatar_url ?? '',
            likeFans: joinMans
          },
          card_id: item.post_id,
          desc: item.title,
          condition: {
            destination: [item.start_location, item.end_location],
            time: `${item.duration_day}`
          },
          cover_imgUrl: item.images[0].image_url,
          createTime: item.created_at || undefined
        }
      })
    )
  },
  { immediate: true }
)

const handeGroupCardClick = (card_id: number) => {
  router.push(`/groupDetail/${card_id}`)
}
</script>
<template>
  <div class="bg-white">
    <van-tabs
      v-model:active="activeName"
      animated
      sticky
      :lazy-render="false"
      :offset-top="50"
    >
      <van-tab
        name="group"
        title="组队"
      >
        <div class="p-2">
          <template
            v-for="cardinfo in groupCardData"
            :key="cardinfo.card_id"
          >
            <GroupInfoCard
              @click="handeGroupCardClick(cardinfo.card_id)"
              :cardData="cardinfo"
              class="my-4"
            />
          </template>
        </div>
      </van-tab>
      <van-tab
        name="moment"
        title="动态"
      >
        <div class="p-2">
          <template
            v-for="moment in momentCardData"
            :key="moment.id"
          >
            <MomentsActivityCard
              class="my-2"
              :moment-data="moment"
              @click="() => handleMomentCardClick(moment.card_id)"
              @click-like="() => handleClickLike(moment.card_id)"
              @click-share="handleShare"
              @click-follow="() => handleClickFollow(moment.userInfo.user_id, moment.card_id)"
            />
          </template>
        </div>
      </van-tab>
    </van-tabs>
    <van-share-sheet
    @select="shareSelect"
      v-model:show="topState.isShow"
      title="立即分享给好友"
      :options="topState.shareOptions"
    />
  </div>
</template>

<style scoped></style>
