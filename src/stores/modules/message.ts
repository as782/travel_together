import type { GetMessagesResponse } from '@/api/message/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { DataState } from '../types'
import { getNotification } from '@/api/message'
import type { UserCard } from '@/api/user/types'

export const useMessageStore = defineStore(
  'message',
  () => {
    /** 消息页需要展示的通知 */
    const pageNotices = ref<DataState<GetMessagesResponse>>({
      status: 'idle',
      error: null,
      data: {
        messages: {
          send: [],
          received: []
        },
        admin_notifications: [],
        interactive: []
      }
    })

    /** 记录联系过的用户的信息  {user_id,nickname,avatar_url} */
    const contactedUserMap = ref<[number, UserCard][]>([])

    /** 获取消息通知 */
    const getNotice = async (user_id: number) => {
      try {
        pageNotices.value.status = 'loading'
        const res = await getNotification(user_id)
        pageNotices.value.data = res.data
        pageNotices.value.status = 'succeeded'
      } catch (error) {
        pageNotices.value.error = 'error'
        pageNotices.value.status = 'failed'
      }
    }

    /** 设置用户信息 */
    const setContactedUserMap = (user_id: number, user_card: UserCard) => {
      // 存在
      if (contactedUserMap.value.find(([id]) => id === user_id)) {
        return
      }
      // 不存在
      contactedUserMap.value.push([user_id, user_card])
    }
    /** 获取联系过的用户信息 */
    const getContactedUserMap = (user_id: number) => {
      const res = contactedUserMap.value.find(([id]) => id === user_id) || []
      return res[1]
    }

    return {
      pageNotices,
      contactedUserMap,
      getNotice,
      setContactedUserMap,
      getContactedUserMap
    }
  },
  {
    persist: [
      {
        // 缓存联系过的信息
        key: 'contactedUserMap',
        storage: sessionStorage,
        paths: ['contactedUserMap']
      },
      {
        // 缓存消息通知
        key: 'pageNotices',
        storage: sessionStorage,
        paths: ['pageNotices']
      }
    ]
  }
)
