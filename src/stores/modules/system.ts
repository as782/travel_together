// 控制整个App 的状态

import { defineStore } from 'pinia'
import { ref } from 'vue'
type RefreshState = {
  lastFresh: string
  state: 'finished' | 'loading' | 'error'
}
export const useSystemStore = defineStore('system', () => {
  /** 页面刷新状态控制 */
  const refreshState = ref<RefreshState>({
    lastFresh: '',
    state: 'finished'
  })

  function setRefreshState(state: RefreshState) {
    refreshState.value = state
  }
  return {
    refreshState,
    setRefreshState
  }
})
