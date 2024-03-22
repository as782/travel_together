import type { UserInfo } from '@/api/user/types'
import { defineStore } from 'pinia'
import authHelper from '@/utils/auth/authHelper'
import { ref } from 'vue'
import { getUserInfo } from '@/api/user'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo | null>(null)
  const token = ref<String>('')

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

  function resetUserSotre() {
    userInfo.value = null
    token.value = ''
    authHelper.removeSessionStorage('token')
    authHelper.removeSessionStorage('userInfo')
  }
  return { userInfo, token, isLogin, setUserInfo, setToken, resetUserSotre, refreshUserInfo }
})
