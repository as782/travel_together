<script setup lang="ts">
import { getTimeDiffString } from '@/utils/tool'
import type { CommentDetail } from './types'

interface Iprops {
  commentList: CommentDetail[]
  handleCommentOnLoad: () => void
}
const { commentList, handleCommentOnLoad } = defineProps<Iprops>()
const loading = defineModel<boolean>('loading', { required: true, default: false })
const finished = defineModel<boolean>('finished', { required: true, default: false })
const error = defineModel<boolean>('error', { required: true, default: false })
</script>
<template>
  <div class="comments-area">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      v-model:error="error"
      error-text="请求失败，点击重新加载"
      @load="handleCommentOnLoad"
    >
      <div
        class="comment flex justify-center items-center my-3"
        v-for="comment in commentList"
        :key="comment.comment_id"
      >
        <van-image
          round
          class="flex-none w-10 h-10 aspect-square mx-2"
          :src="comment.userInfo.avatar_url"
        />
        <div class="comment-right flex-1 ml-3">
          <div class="content-top flex items-center">
            <h6 class="text-sm text-gray-500">{{ comment.userInfo.nickname }}</h6>
            <span class="text-xs text-gray-500 mx-2">{{
              getTimeDiffString(comment.createTime)
            }}</span>
          </div>
          <p class="text-sm font-normal">
            {{ comment.content }}
          </p>
        </div>
      </div>
    </van-list>
  </div>
</template>

<style scoped></style>
