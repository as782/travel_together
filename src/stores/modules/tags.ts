import { getTagList } from '@/api/user'
import type { Tags } from '@/api/user/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

//  用于存储标签列表
const useTagsStore = defineStore(
  'tags',
  () => {
    const tags = ref<Tags[]>([])

    function setTags(tagsList: Tags[]) {
      tags.value = tagsList
    }

    async function getTags() {
      try {
        // 获取标签列表
        const res = await getTagList()
        if (res.data) {
          setTags(res.data.list)
        }
      } catch (error) {
        console.error('获取标签列表失败', error)
      }
    }

    return { tags, getTags, setTags }
  },
  {
    // 持久化
    persist: true
  }
)

export { useTagsStore }
