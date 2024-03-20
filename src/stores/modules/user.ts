import type { UserInfo } from '@/api/user/types'
import { defineStore } from 'pinia'
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

  function resetUserSotre() {
    userInfo.value = null
    token.value = ''
  }
  return { userInfo, token, setUserInfo, setToken, resetUserSotre }
})
