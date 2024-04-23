<script setup lang="ts">
import { showToast } from 'vant'
import { computed, onMounted } from 'vue'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { uploadImageFile, type UploadImagPlayload } from '@/api/upload/index'
import { deleteDynamicPostImage } from '@/api/file/index'
import { getMomentPostDetail, modifyMomentPost, publishMomentPost } from '@/api/post/index'
import { useUserStore } from '@/stores/modules/user'
import type { MomentDetail } from '@/api/post/types'

onMounted(() => {
  if (route.params?.editId) {
    queryMomentDetail(Number(route.params.editId))
  }
})

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const momentData = ref<MomentDetail>()

const isEdit = computed(() => Boolean(route.params?.editId))
/** 查询帖子动态数据 */
const queryMomentDetail = async (postId: number) => {
  try {
    let result = await getMomentPostDetail(postId)
    momentData.value = result.data
    fileList.value = momentData.value.images.map((e) => {
      return {
        url: e.image_url,
        beforeDelete: () => {
          deleteImgIds.value.push(e.image_id)
          return true
        }
      }
    })
    textarea.value = momentData.value.content
  } catch (error) {
    console.error(error)
  }
}

/** 删除图片根据ids */
const deleteImgForIds = async (ids: number[]) => {
  await deleteDynamicPostImage(ids)
}

/** 提交的表单数据 */
const textarea = ref<string>('')

/** 需要从数据库中删除的图片id */
const deleteImgIds = ref<number[]>([])

/** 文件预览列表 */
const fileList = ref<any[]>([])

const onSubmit = async () => {
  try {
    const formFileData = new FormData()

    fileList.value.forEach((item: any) => {
      formFileData.append('moment_post', item.file)
    })

    const playload: UploadImagPlayload = {
      filedata: formFileData,
      flag: 'moment_post',
      username: userStore.userInfo!.username
    }

    // 删除图片 $$ 在编辑时才需要删除数据库中的图片
    deleteImgIds.value.length && (await deleteImgForIds(deleteImgIds.value))

    let image_urls: string[] = []
    // 上传图片

    let result = await uploadImageFile(playload)
    image_urls = result.data.fileUrls

    const publishParams = {
      user_id: userStore.userInfo?.user_id!,
      content: textarea.value,
      image_urls
    }
    if (isEdit.value) {
      const params = {
        user_id: userStore.userInfo?.user_id!,
        content: textarea.value,
        image_urls,
        dynamic_post_id: Number(route.params.editId)
      }
      await modifyMomentPost(params)
      showToast('修改成功')
    } else {
      // 提交发布
      await publishMomentPost(publishParams)
      showToast('发布成功')
    }
    router.back()
  } catch (error) {
    console.error(error)
    showToast('发布失败，请重试')
  }
}
</script>
<template>
  <main class="container flex flex-col bg-white">
    <van-form @submit="onSubmit">
      <van-cell-group class="p-1 m-2 border border-blue-200 rounded-md">
        <van-field
          v-model="textarea"
          rows="10"
          :spellcheck="false"
          autosize
          type="textarea"
          placeholder="请输入用户名"
        />
      </van-cell-group>
      <van-cell-group class="p-2 m-2 border border-blue-200 rounded-md">
        <!-- 上传图片 -->
        <van-uploader
          v-model="fileList"
          multiple
          class="my-upload flex-nowrap overflow-x-auto max-w-full max-h-80"
        />
      </van-cell-group>
      <!-- 提交按钮 -->
      <van-cell-group class="p-2 m-2">
        <van-button
          type="primary"
          round
          native-type="submit"
          block
          >提交</van-button
        >
      </van-cell-group>
    </van-form>
  </main>
</template>
<style scoped>
.my-upload :deep(.van-uploader__wrapper) {
  flex-wrap: nowrap;
  overflow-x: auto;
}

.my-upload :deep(.van-uploader__wrapper .van-uploader__upload) {
  aspect-ratio: 1/1;
}
</style>
