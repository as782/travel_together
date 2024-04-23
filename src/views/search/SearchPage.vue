<script setup lang="ts">
import { useSearchStore } from '@/stores/modules/search'
import { type SearchInstance } from 'vant'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const useSeach = useSearchStore()

const searchRef = ref<SearchInstance>()
const searchKey = ref('')

onMounted(() => {
  searchRef.value?.focus()
})

// /** 输入变化 */
// const inputChange = (val: any) => {
//     console.log(val);
// }

/** 选择关键词 */
const handleSelectTag = (e: any) => {
  const tagname = e.target.dataset.tagname
  searchKey.value = tagname
}
onMounted(() => {
  const keys = sessionStorage.getItem('historyKeys')
  historyKeys.value = keys ? JSON.parse(keys) : []
})
const historyKeys = ref<any[]>([])
/** 搜索 */
const handleSearch = async () => {
  await useSeach.getSearchResultData(searchKey.value)
  useSeach.searchResultData.status == 'succeeded' &&
    router.push({
      path: '/searchresult',
      query: {
        key: searchKey.value
      }
    })
  historyKeys.value.push(searchKey.value)
  historyKeys.value = [...new Set(historyKeys.value)]
  searchKey.value = ''
  sessionStorage.setItem('historyKeys', JSON.stringify([...new Set(historyKeys.value)]))
}
</script>
<template>
  <main class="bg-white p-1">
    <div class="flex items-center m-2">
      <van-icon
        name="arrow-left"
        size="20"
        @click="$router.back()"
      />
      <div class="flex-1 flex mx-2 relative">
        <i class="absolute left-2 top-1/2 -translate-y-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </i>
        <input
          type="text"
          ref="searchRef"
          class="w-full rounded-2xl p-1 pl-10 bg-blue-50"
          v-model="searchKey"
          placeholder="搜索组队/动态/用户"
        />
      </div>

      <button
        class="flex-none w-8 p-1 rounded-md bg-blue-300 shadow-xl shadow-orange-100 text-xs text-white"
        @click="handleSearch"
      >
        搜索
      </button>
    </div>

    <!-- 搜索建议 -->
    <div class="">
      <div class="m-2">
        <h4 class="m-2 font-bold">历史搜索</h4>
        <ul
          class="flex w-full flex-wrap"
          @click="handleSelectTag"
        >
          <li
            class="m-2"
            v-for="key in historyKeys"
            :key="key"
          >
            <span
              class="w-full rounded-xl p-1 px-2 bg-slate-400 bg-opacity-20 text-xs"
              :data-tagname="key"
              >{{ key }}</span
            >
          </li>
        </ul>
      </div>
      <!-- <div class="m-2">
                <h4 class="m-2 font-bold">热门搜索</h4>
                <ul class="flex w-full flex-wrap">
                    <span class="rounded-xl  p-1 m-2 bg-slate-400 bg-opacity-20 text-xs">北京</span>
                    <span class="rounded-xl  p-1 m-2 bg-slate-400 bg-opacity-20 text-xs">西藏</span>
                    <span class="rounded-xl  p-1 m-2 bg-slate-400 bg-opacity-20 text-xs">马尔代夫</span>
                </ul>
            </div> -->
    </div>
  </main>
</template>
<style scoped></style>
