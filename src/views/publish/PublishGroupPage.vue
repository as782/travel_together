<script setup lang="ts">
import { deleteItineraryImage, deleteTeamPostImage } from '@/api/file';
import { getTeamPostDetail, modifyTeamPost, publishTeamPost } from '@/api/post';
import type { PublishGroupParams, Themes, UpdateGroupParams } from '@/api/post/types';
import { uploadImageFile, type UploadImagPlayload } from '@/api/upload';
import { useThemesStore } from '@/stores/modules/themes';
import { useUserStore } from '@/stores/modules/user';
import { areaList } from '@vant/area-data';
import { showToast } from 'vant';
import { computed, onMounted } from 'vue';
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

onMounted(() => {
    // 获取主题
    !useThemes.themes.length && useThemes.getThemes();
    postThemes.value = useThemes.themes;
})

//-------------------- 初始化相关 -------------------//
const route = useRoute()
const router = useRouter()
const useThemes = useThemesStore()
const userStore = useUserStore()
const isEdit = computed(() => Boolean(route.params?.editId))
/**获取帖子详情 */
const getGroupPostDetail = async (postId: number) => {
    try {
        const result = await getTeamPostDetail(postId)
        const { user_id, title, description, duration_day,
            estimated_expense, gender_requirement, payment_method,
            start_location, end_location, team_size, theme_id, images, itinerary } = result.data
        formData.user_id = user_id
        formData.title = title
        formData.description = description
        formData.duration_day = duration_day
        formData.estimated_expense = estimated_expense
        formData.gender_requirement = gender_requirement
        formData.payment_method = payment_method
        formData.start_location = start_location
        formData.end_location = end_location
        formData.team_size = team_size
        formData.theme_id = theme_id
        formData.image_urls = images.map(item => item.image_url)
        formData.itinerary = itinerary

        fileList.value = fileListFactory(images, 'image')
        itineraryFileList.value = fileListFactory([{ image_id: postId, image_url: itinerary }], 'itinerary')
    } catch (error) {
        console.error(error)
    }
}


/** 表单数据 **/
const formData = reactive<PublishGroupParams>({
    user_id: undefined,
    title: "",
    description: "",
    duration_day: undefined,
    estimated_expense: undefined,
    gender_requirement: '',
    payment_method: "",
    start_location: "",
    end_location: "",
    team_size: undefined,
    theme_id: undefined,
    image_urls: [],
    itinerary: '',
})

/** 主题选项列表 */
const postThemes = ref<Themes[]>([])

/** 地址选择控制 */
const addressPopupState = ref({
    showAddressPopup: false,
    flag: 0, // 0 开始地点 1 结束地点
});
/** 地区选择器确认 */
const onConfirmAddress = (area: any) => {
    addressPopupState.value.showAddressPopup = false;
    if (addressPopupState.value.flag == 0) {
        formData.start_location = area.selectedOptions.map((item: any) => item.text).join('/');
    } else {
        formData.end_location = area.selectedOptions.map((item: any) => item.text).join('/');
    }

}

//-------------- 图片文件上传相关逻辑 --------------//
onMounted(() => {
    if (route.params?.editId) {
        getGroupPostDetail(Number(route.params.editId))
    }
})
/** 帖子轮播图预览列表 */
const fileList = ref<any[]>([]);
/** 帖子行程图预览列表 */
const itineraryFileList = ref<any[]>([]);

/** 需要删除的轮播图片ids */
const deleteImgIds = ref<number[]>([])
/** 需要删除的行程图片ids */
const deleteItineraryImgIds = ref<number[]>([])

/**
 * fileList 工厂
 * @param arr images[] {image_id, image_url}
 * @param type itinerary | images
 */
const fileListFactory = (arr: any, type: string) => {
    return arr.map((img: any) => {
        return {
            url: img.image_url,
            beforeDelete: () => {
                if (type == 'itinerary') {
                    deleteItineraryImgIds.value.push(img.image_id)
                } else {
                    deleteImgIds.value.push(img.image_id)
                }
                return true
            }
        }
    })
}

/** 删除图片根据ids */
const deleteImgForIds = async (ids: number[], type: string) => {
    switch (type) {
        case 'images':
            await deleteTeamPostImage(ids)
            break;
        case 'itinerary':
            await deleteItineraryImage(ids)
            break;
        default:
            break;
    }
}



//-------------- 表单提交相关逻辑 --------------//
const onSubmit = async () => {
    try {
        const formFileData = new FormData();
        const itineraryFormFileData = new FormData();

        fileList.value.forEach((item: any) => {
            formFileData.append('team_post', item.file);
        })
        itineraryFileList.value.forEach((item: any) => {
            itineraryFormFileData.append('initerary', item.file);
        })

        const playload: UploadImagPlayload = {
            filedata: formFileData,
            flag: "team_post",
            username: userStore.userInfo!.username,
        }
        const itineraryPlayload: UploadImagPlayload = {
            filedata: itineraryFormFileData,
            flag: "initerary",
            username: userStore.userInfo!.username,
        }

        // 删除图片 $$ 在编辑时才需要删除数据库中的图片
        deleteImgIds.value.length && await deleteImgForIds(deleteImgIds.value, 'images')
        deleteItineraryImgIds.value.length && await deleteImgForIds(deleteItineraryImgIds.value, 'itinerary')

        // 上传图片
        let result = await uploadImageFile(playload)
        formData.image_urls = result.data.fileUrls

        // 上传行程图片
        let initeraryResult = await uploadImageFile(itineraryPlayload)
        formData.itinerary = initeraryResult.data.fileUrls[0]

        // 提交表单

        const publishParams: PublishGroupParams = {
            ...formData,
            user_id: userStore.userInfo?.user_id!,
        }

        if (isEdit.value) {
            const params: UpdateGroupParams = {
                post_id: Number(route.params.editId),
                ...formData,
                user_id: userStore.userInfo?.user_id!,
            }
            await modifyTeamPost(params)
            showToast("修改成功")
        } else {

            await publishTeamPost(publishParams)
            showToast("发布成功")
        }
        router.back()
    } catch (error) {
        console.error(error);
        showToast("发布失败，请重试")
    }
}

</script>

<template>
    <main>
        <van-form class="form-area" @submit="onSubmit">
            <!-- 上传图片 -->
            <van-cell-group class="p-2 m-2 border border-blue-200 rounded-md">
                <van-uploader v-model="fileList" multiple
                    class="my-upload flex-nowrap overflow-x-auto max-w-full max-h-80" />
            </van-cell-group>

            <!-- 输入任意文本 -->
            <van-cell-group class="p-1  m-2  border border-blue-200 rounded-md">
                <van-field name="title" v-model="formData.title" label="帖子标题" placeholder="请输入标题">
                    <template #label>
                        <span class="text-xl font-bold ">帖子标题:</span>
                    </template>
                </van-field>
                <van-field name="description" v-model="formData.description" rows="10" :spellcheck="false" autosize
                    type="textarea" placeholder="简单介绍此次旅行" />
            </van-cell-group>

            <!-- 条件 -->
            <van-cell-group class="p-1  m-2  border border-blue-200 rounded-md">
                <van-field name="duration_day" v-model="formData.duration_day" type="text" label="旅行时间:"
                    placeholder="例如: 10 (天)" />
                <van-field name="team_size" v-model="formData.team_size" type="text" label="小队人数:"
                    placeholder="例如: 20 (人)" />
                <van-field name="payment_method" v-model="formData.payment_method" type="text" label="付费方式:"
                    placeholder="例如: AA" />
                <van-field name="estimated_expense" v-model="formData.estimated_expense" type="text" label="预计消费:"
                    placeholder="例如: 8 (元)" />
                <van-field name="gender_requirement" label="性别要求:">
                    <template #input>
                        <van-radio-group v-model="formData.gender_requirement" direction="horizontal">
                            <van-radio name="male">男</van-radio>
                            <van-radio name="female">女</van-radio>
                            <van-radio name="other">其他</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
            </van-cell-group>

            <!-- 地点 -->
            <van-cell-group class="p-1  m-2  border border-blue-200 rounded-md">
                <van-field name="start_location" v-model="formData.start_location" is-link readonly type="text"
                    label="旅行起点:"
                    @click="() => { addressPopupState.showAddressPopup = true; addressPopupState.flag = 0 }"
                    placeholder="例如: xxx" />
                <van-field name="end_location" v-model="formData.end_location" is-link readonly type="text"
                    label="旅行终点:"
                    @click="() => { addressPopupState.showAddressPopup = true; addressPopupState.flag = 1 }"
                    placeholder="例如: xxx" />
                <van-popup v-model:show="addressPopupState.showAddressPopup" position="bottom">
                    <van-area title="标题" :area-list="areaList" @confirm="onConfirmAddress"
                        @cancel="addressPopupState.showAddressPopup = false" />
                </van-popup>
            </van-cell-group>

            <!-- 主题 -->
            <van-cell-group class="p-1  m-2  border border-blue-200 rounded-md">
                <van-field name="theme_id" label="帖子主题">
                    <template #input>
                        <van-radio-group v-model="formData.theme_id" direction="horizontal">
                            <van-radio v-for="theme in postThemes" :key="theme.theme_id" :name="theme.theme_id">{{
                                theme.theme_name }}</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
            </van-cell-group>

            <!-- 图片 -->
            <van-cell-group class="p-1  m-2  border border-blue-200 rounded-md">

                <!-- 详情图片 -->
                <div class="img-upload">
                    <van-field>
                        <!-- 预览 -->
                        <template #input>
                            <van-uploader v-model="itineraryFileList" reupload :max-count="1" />
                        </template>
                    </van-field>
                </div>
            </van-cell-group>

            <van-cell-group class="m-2 rounded-3xl ">
                <van-button class="p-2" round block type="primary" native-type="submit">
                    提交
                </van-button>
            </van-cell-group>
            <div class="w-full h-1 mt-2 "></div>
        </van-form>

    </main>
</template>
<style scoped></style>