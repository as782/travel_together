import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { DataState } from '../types'
import type { UserInfo } from '@/api/user/types'
import authHelper from '@/utils/auth/authHelper'
import {
  getFans,
  getFollows,
  getUserInfo,
  getUserLikeGroup,
  getUserLikeMoment,
  type Golike,
  type MoLike
} from '@/api/user'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<UserInfo | null>(null)
    const token = ref<String>('')

    const myFans = ref<DataState<UserInfo[]>>({
      status: 'idle',
      error: null,
      data: []
    })
    const myFollows = ref<DataState<UserInfo[]>>({
      status: 'idle',
      error: null,
      data: []
    })
    const myLikeGroupPostList = ref<DataState<Golike[]>>({
      status: 'idle',
      error: null,
      data: []
    })
    const myLikeMomentPostList = ref<DataState<MoLike[]>>({
      status: 'idle',
      error: null,
      data: []
    })

    function setUserInfo(info: UserInfo) {
      userInfo.value = info
    }

    function setToken(tokenStr: string) {
      token.value = tokenStr
    }

    function isLogin() {
      return token.value !== '' || Boolean(authHelper.getSessionStorage('token'))
    }

    // 修改用户信息后，刷新用户信息，更新本地存储
    async function refreshUserInfo() {
      try {
        const res = await getUserInfo(userInfo.value?.user_id as number)
        if (res.data) {
          userInfo.value = res.data
          authHelper.setSessionStorage('userInfo', res.data)
          return res
        }
      } catch (error) {
        console.error('刷新用户信息失败', error)
      }
    }

    // 获取粉丝
    async function getMyFans() {
      try {
        const userId = userInfo.value?.user_id
        if (!userId) {
          return
        }
        myFans.value.status = 'loading'
        const res = await getFans(userId)
        myFans.value.data = res.data.list
        myFans.value.status = 'succeeded'
      } catch (error) {
        console.error(error)
        myFans.value.status = 'failed'
        return new Error('获取失败')
      }
    }
    // 获取关注
    async function getMyFollows() {
      try {
        const userId = userInfo.value?.user_id
        if (!userId) {
          return
        }
        myFollows.value.status = 'loading'
        const res = await getFollows(userId)
        myFollows.value.data = res.data.list
        myFollows.value.status = 'succeeded'
      } catch (error) {
        console.error(error)
        myFollows.value.status = 'failed'
        return new Error('获取失败')
      }
    }

    // 获取我喜欢的内容列表
    async function getMylikePostList() {
      try {
        const userId = userInfo.value?.user_id
        if (!userId) {
          return
        }
        myLikeGroupPostList.value.status = 'loading'
        myLikeMomentPostList.value.status = 'loading'
        const MomentRes = await getUserLikeMoment(userId)
        const GroupRes = await getUserLikeGroup(userId)

        myLikeGroupPostList.value.data = GroupRes.data.list
        myLikeMomentPostList.value.data = MomentRes.data.list

        myLikeMomentPostList.value.status = 'succeeded'
        myLikeGroupPostList.value.status = 'succeeded'
      } catch (error) {
        console.error(error)
        myLikeGroupPostList.value.status = 'failed'
        myLikeMomentPostList.value.status = 'failed'
        return new Error('获取失败')
      }
    }

    function resetUserSotre() {
      userInfo.value = null
      token.value = ''
      authHelper.removeSessionStorage('token')
      authHelper.removeSessionStorage('userInfo')
    }
    return {
      userInfo,
      token,
      myFans,
      myFollows,
      myLikeGroupPostList,
      myLikeMomentPostList,
      isLogin,
      setUserInfo,
      setToken,
      resetUserSotre,
      refreshUserInfo,
      getMyFans,
      getMyFollows,
      getMylikePostList
    }
  },
  {
    persist: [
      {
        key: 'myLikeGroupPostList',
        storage: sessionStorage,
        paths: ['myLikeGroupPostList']
      },
      {
        key: 'myLikeMomentPostList',
        storage: sessionStorage,
        paths: ['myLikeMomentPostList']
      },
      {
        key: 'myFans',
        storage: sessionStorage,
        paths: ['myFans']
      },
      {
        key: 'myFollows',
        storage: sessionStorage,
        paths: ['myFollows']
      }
    ]
  }
)
