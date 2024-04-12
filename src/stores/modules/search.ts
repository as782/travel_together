import { defineStore } from 'pinia'
import type { DataState } from '../types'
import { computed, ref } from 'vue'
import { searchContent } from '@/api/search'
import { calculateAge } from '@/utils/tool'
import type { CardData } from '@/components/usercard/types/intex'

type searchResult = {
  dynamicPosts: any[]
  teamActivityPosts: any[]
  users: any[]
}
const useSearchStore = defineStore('search', () => {
  /** 搜索结果 */
  const searchResultData = ref<DataState<searchResult>>({
    status: 'idle',
    error: null,
    data: {
      dynamicPosts: [],
      teamActivityPosts: [],
      users: []
    }
  })
  /** 搜索结果 相关组队 */
  const groupCardDataList = computed(() => {
    return (
      searchResultData.value.data.teamActivityPosts.map((item) => {
        const { user_info, joinMans } = item
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
          cover_imgUrl: item.images[0]?.image_url || '',
          createTime: item.created_at || undefined
        }
      }) || []
    )
  })
  /** 搜索结果 相关动态 */

  const momentCardDataList = ref<any[]>([])

  /** 搜索结果 相关用户 */
  const userCardDataList = computed(() => {
    return (
      searchResultData.value.data.users.map((item) => {
        const { user_id, avatar_url, nickname, birthday, gender, isFollow } = item
        return {
          user_id: user_id as number,
          avatar: avatar_url as string,
          nickname: nickname as string,
          birthday: `${calculateAge(birthday)}`,
          gender: gender === 'male' ? '男' : gender === 'female' ? '女' : '其他',
          isFollow: isFollow as Boolean
        } as CardData
      }) || []
    )
  })

  const dataConunt = computed(() => {
    return (
      groupCardDataList.value.length +
      momentCardDataList.value.length +
      userCardDataList.value.length
    )
  })

  /** 请求搜索数据 */
  async function getSearchResultData(keyword: string | number) {
    try {
      searchResultData.value.status = 'loading'
      const result = await searchContent(keyword)
      searchResultData.value.data = result.data
      momentCardDataList.value =
        searchResultData.value.data.dynamicPosts.map((item) => {
          return {
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
        }) || []

      searchResultData.value.status = 'succeeded'
    } catch (error) {
      console.error(error)
      searchResultData.value.status = 'failed'
      searchResultData.value.error = '搜索失败'
    }
  }

  return {
    searchResultData,
    groupCardDataList,
    momentCardDataList,
    userCardDataList,
    dataConunt,
    getSearchResultData
  }
})

export { useSearchStore }
