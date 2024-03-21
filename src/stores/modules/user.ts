import type { UserInfo } from '@/api/user/types'
import { defineStore } from 'pinia'
import authHelper from '@/utils/auth/authHelper'
import { ref } from 'vue'

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

  function resetUserSotre() {
    userInfo.value = null
    token.value = ''
    authHelper.removeSessionStorage('token')
    authHelper.removeSessionStorage('userInfo')
  }
  return { userInfo, token, isLogin, setUserInfo, setToken, resetUserSotre }
})
