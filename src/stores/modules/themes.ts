import { getTeamPostThemes } from '@/api/post'
import type { Themes } from '@/api/post/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

//  用于存储标签列表
const useThemesStore = defineStore(
  'themes',
  () => {
    const themes = ref<Themes[]>([])

    function setThemes(themesList: Themes[]) {
      themes.value = themesList
    }

    async function getThemes() {
      try {
        // 获取标签列表
        const res = await getTeamPostThemes()
        if (res.data) {
          setThemes(res.data)
        }
      } catch (error) {
        console.error('获取主题列表失败', error)
      }
    }

    return { themes, getThemes, setThemes }
  },
  {
    // 持久化
    persist: true
  }
)

export { useThemesStore }
