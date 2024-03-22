<script setup lang="ts">
import { reactive, ref } from 'vue';
import { onMounted } from 'vue';
import { areaList } from '@vant/area-data';
import {
    showToast,
    type UploaderFileListItem
} from 'vant';
import type { UserInfo } from '@/api/user/types';
import { updateUserInfo } from '@/api/user';
import { uploadAvatar } from '@/api/upload';
import { useTagsStore } from '../../stores/modules/tags';
import { useUserStore } from '@/stores/modules/user';
import authHelper from '@/utils/auth/authHelper';

onMounted(() => {
    //  如果tags为空，获取tags
    if (useTags.tags.length === 0) {
        useTags.getTags();
    }
});

const useTags = useTagsStore();
const tagsList = useTags.tags;

// 用户信息处理
const userStore = useUserStore();
const userInfo = userStore.userInfo;
const form = reactive<UserInfo>({ ...userInfo, tags: userInfo?.tags?.map(e => e.tag_id) } as UserInfo);
// 提交表单
const onSubmit = async () => {
    const { user_id, avatar_url, nickname, gender, bio, birthday, tags, address, contact } = form;
    const config = {
        user_id,
        avatar_url: avatarUrls.value[0] || avatar_url,
        nickname,
        gender,
        bio,
        birthday,
        tags,
        region_name: address.name,
        region_code: address.code,
        contact_phone: contact.phone,
        contact_email: contact.email,
    }
    try {
        const res = await updateUserInfo(config)
        userStore.refreshUserInfo()
        if (res.code === 200) {
            authHelper.syncInfoToUserStore()
            showToast({
                type: 'success',
                message: res.msg,
                duration: 1000,
            })

        }
    } catch (error) {
        console.error(error);
        showToast({
            message: '更新失败',
            duration: 1000,
        })
    }
};

// 日期选择
const showCalendar = ref<boolean>(false);
const datePick = {
    minData: new Date(1980, 1, 1),
    maxData: new Date(),
}
const dateData = ref<string>(form.birthday.substring(0, 10));
const onConfirmCalendar = (date: any) => {
    dateData.value = date.selectedValues.join('-');
    const isoStr = new Date(date.selectedValues.join('-')).toISOString()
    form.birthday = isoStr;
    showCalendar.value = false;
}

// 地址选择
const showArea = ref<boolean>(false);
const onConfirmAddress = (area: any) => {
    showArea.value = false;
    form.address.name = area.selectedOptions.map((item: any) => item.text).join('/');
    form.address.code = area.selectedOptions.map((item: any) => item.value).join('/');
}
// upload avatar
const avatarUrls = ref<string[]>([]);
const fileList = ref<UploaderFileListItem[]>([]);
//文件读取后
const afterRead = async (file: any) => {
    console.log('loadfile', file);

    file.status = 'uploading';
    file.message = '上传中...';
    const username = userStore?.userInfo?.username || 'default';
    const formdata = new FormData();
    formdata.append('avatar', file.file);

    try {
        let result = await uploadAvatar(formdata, username);
        avatarUrls.value = result.data.fileUrls
        file.status = 'done';
        file.message = '上传成功';
    } catch (error) {
        file.status = 'failed';
        file.message = '上传失败';
    }

}
// 文件删除前
const beforeDelete = () => {
    avatarUrls.value = [];
    return true;
}
</script>
<template>
    <div class="bg-transparent">
        <!-- 头像上传，展示 -->
        <div class="flex justify-center items-center bg-fixed bg-cover"
            :style="{backgroundRepeat:'no-repeat',  backgroundImage: 'url(' + form.avatar_url + ')', height: '50vh' }">
            <van-sticky offset-top="80">
                <van-uploader v-model="fileList" reupload max-count="1" :after-read="afterRead"
                    :before-delete="beforeDelete">
                    <van-image round class="w-20 aspect-square " :src="form.avatar_url" />
                </van-uploader>
            </van-sticky>
        </div>

        <van-form class="mt-4" @submit="onSubmit">
            <van-cell-group inset>
                <van-field v-model="form.nickname" name="nickname" label="昵称" placeholder="请填写你的昵称" input-align="right"
                    class="input" />
                <van-field label="性别" name="gender" v-model="form.gender" class="input" input-align="right">
                    <template #input>
                        <van-radio-group v-model="form.gender" direction="horizontal">
                            <van-radio name="male">男</van-radio>
                            <van-radio name="female">女</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field v-model="form.bio" name="bio" label="签名" input-align="right" placeholder="说点什么再出发吧"
                    class="input" />
                <van-field label="标签" name="tags" class="input" placeholder="请选择标签">
                    <template #input>
                        <van-checkbox-group v-model="form.tags" direction="horizontal">
                            <van-checkbox class="m-2" v-for="tag in tagsList" :key="tag.tag_id" :name="tag.tag_id">{{
                tag.tag_name }}</van-checkbox>


                        </van-checkbox-group>
                    </template>
                </van-field>
                <van-field v-model="dateData" is-link readonly name="birthday" label="生日" placeholder="点击选择日期"
                    @click="showCalendar = true" />
                <!-- <van-calendar v-model:show="showCalendar" @confirm="onConfirmCalendar" :min-date="datePick.minData"
                    :max-date="datePick.maxData" /> -->
                <van-popup v-model:show="showCalendar" position="bottom">
                    <van-date-picker @confirm="onConfirmCalendar" title="选择日期" :min-date="datePick.minData"
                        :max-date="datePick.maxData" />
                </van-popup>
                <van-field v-model="form.address.name" is-link readonly name="addressName" label="地区选择"
                    placeholder="点击选择省市区" @click="showArea = true" />
                <van-popup v-model:show="showArea" position="bottom">
                    <van-area :area-list="areaList" @confirm="onConfirmAddress" @cancel="showArea = false" />
                </van-popup>

                <van-field v-model="form.contact.phone" name="phone" label="电话" input-align="right"
                    placeholder="为你推荐喜欢的旅行" class="input" />
            </van-cell-group>
            <div class="p-4">
                <van-button block type="primary" native-type="submit" class="btn">
                    保存
                </van-button>
            </div>
        </van-form>
    </div>
</template>



<style scoped></style>
