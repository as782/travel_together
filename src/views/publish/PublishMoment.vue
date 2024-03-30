<script setup lang="ts">
import { showToast } from 'vant';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { uploadImageFile, type UploadImagPlayload } from '@/api/upload/index';
import { deleteDynamicPostImage } from '@/api/file/index';
import { publishMomentPost } from '@/api/post/index';
import { useUserStore } from '@/stores/modules/user';


onMounted(() => {
    if (route.params?.editId) {

        fileList.value = [{ images_id: 1, image_url: 'https://images.dog.ceo/breeds/weimaraner/n02092339_7224.jpg' }].map((e) => {
            return {
                url: e.image_url,
                beforeDelete: () => {
                    deleteImgIds.value.push(e.images_id)
                    return true
                }
            }
        })
    }
})
const route = useRoute()
const userStore = useUserStore()

/** 删除图片根据ids */
const deleteImgForIds = async (ids: number[]) => {
    await deleteDynamicPostImage(ids)

}

/** 提交的表单数据 */
const textarea = ref<string>('')

/** 需要从数据库中删除的图片id */
const deleteImgIds = ref<number[]>([])

/** 文件预览列表 */
const fileList = ref<any[]>([]);

const onSubmit = async () => {

    try {
        const formFileData = new FormData();

        fileList.value.forEach((item: any) => {
            formFileData.append('moment_post', item.file);
        })

        const playload: UploadImagPlayload = {
            filedata: formFileData,
            flag: "moment_post",
            username: userStore.userInfo!.username,
        }

        // 删除图片 $$ 在编辑时才需要删除数据库中的图片
        deleteImgIds.value.length && await deleteImgForIds(deleteImgIds.value)

        // 上传图片
        let result = await uploadImageFile(playload)
        const image_urls = result.data.fileUrls

        const publishParams = {
            user_id: userStore.userInfo?.user_id!,
            content: textarea.value,
            image_urls,
        }

        // 提交发布
        await publishMomentPost(publishParams)
        showToast("发布成功")

    } catch (error) {
        console.log(error);
        showToast("发布失败，请重试")
    }

}
</script>
<template>
    <main class="container flex flex-col bg-white">
        <van-form @submit="onSubmit">
            <van-cell-group class="p-1  m-2  border border-blue-200 rounded-md">
                <van-field v-model="textarea" rows="10" :spellcheck="false" autosize type="textarea"
                    placeholder="请输入用户名" />
            </van-cell-group>
            <van-cell-group class="p-2 m-2 border border-blue-200 rounded-md">
                <!-- 上传图片 -->
                <van-uploader v-model="fileList" multiple
                    class="my-upload flex-nowrap overflow-x-auto max-w-full max-h-80" />
            </van-cell-group>
            <!-- 提交按钮 -->
            <van-cell-group class="p-2 m-2">
                <van-button type="primary" round native-type="submit" block>提交</van-button>
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