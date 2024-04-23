<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import { usePostStore } from '@/stores/modules/post'
import { useUserStore } from '@/stores/modules/user'
import { getTeamMembers } from '@/api/post'
import type { GroupCardData } from '@/components/groupcard/types'
import { useRouter } from 'vue-router'
import GroupInfoCard from '@/components/groupcard/GroupInfoCard.vue'
onMounted(() => {
  getJoinedList()
})
const router = useRouter()
const postStore = usePostStore()
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const { myJoinGroupPostDetailList } = storeToRefs(postStore)

// 空状态
interface EmptyState {
  desc: string
  btnText: string
  imgType: 'error' | 'network' | 'search' | 'default'
}
const emptyState = ref<EmptyState>({
  desc: '你还没有关注任何人，快去发现更多精彩内容吧！',
  btnText: '去发现',
  imgType: 'default'
})

// 获取关注列表数据
const cardDataList = ref<GroupCardData[]>([])
/** 获取加入小队的成员 */
const getGroupPeoples = async (post_id: number) => {
  const res = await getTeamMembers(post_id)
  return res.data
}
watch(
  myJoinGroupPostDetailList,
  async (newValue) => {
    cardDataList.value = await Promise.all(
      newValue.data.map(async (item: any) => {
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
  { immediate: true, deep: true }
)
/** 获取加入的小队列表 */
const getJoinedList = async (page = 1, limit = 10) => {
  const user_id = userInfo.value!.user_id
  const config = {
    user_id,
    page,
    limit
  }
  await postStore.getMyJoinedGroupPostDetailList(config)
}

/** 处理点击卡片 */
const handeGroupCardClick = (card_id: number) => {
  router.push(`/groupDetail/${card_id}`)
}
</script>
<template>
  <main class="bg-white">
    <van-list>
      <div
        v-if="!cardDataList.length"
        class="w-full"
      >
        <van-empty
          :image-size="200"
          :description="emptyState.desc"
          :image="emptyState.imgType"
        />
      </div>
      <template v-else>
        <div class="p-2">
          <template
            v-for="cardinfo in cardDataList"
            :key="cardinfo.card_id"
          >
            <GroupInfoCard
              @click="handeGroupCardClick(cardinfo.card_id)"
              :cardData="cardinfo"
              class="my-4"
            />
          </template>
        </div>
      </template>
    </van-list>
  </main>
</template>
<style scoped></style>
