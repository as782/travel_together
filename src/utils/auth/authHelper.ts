// 本地存储持久化化
import { useUserStore } from '@/stores/modules/user'

/**
 * 获取会话存储
 * @param key
 * @returns object | null
 */
function getSessionStorage(key: string) {
  try {
    return JSON.parse(sessionStorage.getItem(key) || 'null')
  } catch (error) {
    return null
  }
}
/**
 *  设置会话存储
 * @param key
 * @param value
 *
 */
function setSessionStorage(key: string, value: any) {
  sessionStorage.setItem(key, JSON.stringify(value))
}
/**
 * 移除单个
 * @param key
 */
function removeSessionStorage(key: string) {
  sessionStorage.removeItem(key)
}

function clearSessionStorage() {
  sessionStorage.clear()
}

/**
 * 同步storage中数据到userStore
 */
function syncInfoToUserStore() {
  const userInfo = getSessionStorage('userInfo')
  const token = getSessionStorage('token')
  const userStore = useUserStore()
  userInfo && userStore.setUserInfo(userInfo)
  token && userStore.setToken(token)
}

function getToken(keyname: string = 'token') {
  return getSessionStorage(keyname)
}
function setToken(token: string, keyname: string = 'token') {
  setSessionStorage(keyname, token)
}
export default {
  getSessionStorage,
  setSessionStorage,
  removeSessionStorage,
  clearSessionStorage,
  syncInfoToUserStore,
  getToken,
  setToken
}
