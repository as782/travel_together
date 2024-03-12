<script setup lang="ts">
import { reactive, ref } from 'vue';
import { areaList } from '@vant/area-data';
import type {
    UploaderFileListItem
} from 'vant';
import type { Address, Contact, UserInfo } from '@/types/models/user';
const form = reactive<UserInfo>({
    id: '', // 用户ID
    nickname: '', // 昵称
    gender: '男', // 性别
    birthday: '', // 生日
    tags: [], // 标签
    address: {} as Address,  // 地址
    contact: {} as Contact, // 联系方式
    avatar: 'https://img.pconline.com.cn/images/upload/upc/tx/photoblog/1407/12/c4/36240468_36240468_1405175533420_mthumb.jpg',
    signature: '', // 签名
});
// 提交表单
const onSubmit = async (values: any) => {
    console.log('submit', values);
};

// 日期选择
const showCalendar = ref<boolean>(false);
const onConfirmCalendar = (date: any) => {
    console.log(date);

    form.birthday = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    showCalendar.value = false;
}

// 地址选择
const showArea = ref<boolean>(false);
const onConfirmAddress = (area: any) => {
    showArea.value = false;
    console.log(area);

    form.address.name = area.selectedOptions.map((item: any) => item.text).join('/');
    form.address.code = area.selectedOptions.map((item: any) => item.value).join('/');
}
// upload avatar

const fileList = ref<UploaderFileListItem[]>([]);
const afterRead = (file: any) => {
    console.log('loadfile', file);

    file.status = 'uploading';
    file.message = '上传中...';

    setTimeout(() => {
        file.status = 'failed';
        file.message = '上传失败';

    }, 1000);
}
</script>
<template>
    <div class="bg-transparent">
        <!-- 头像上传，展示 -->
        <div class="flex justify-center items-center bg-fixed "
            :style="{ backgroundImage: 'url(' + form.avatar + ')', height: '50vh' }">
            <van-sticky offset-top="80">
                <van-uploader v-model="fileList" :after-read="afterRead">
                    <van-image round class="w-20 aspect-square " :src="form.avatar" />
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
                            <van-radio name="男">男</van-radio>
                            <van-radio name="女">女</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field v-model="form.signature" name="signature" label="签名" input-align="right"
                    placeholder="说点什么再出发吧" class="input" />
                <van-field label="标签" name="tags" class="input" placeholder="请选择标签">
                    <template #input>
                        <van-checkbox-group v-model="form.tags" direction="horizontal">
                            <van-checkbox class="m-2" name="旅行">旅行</van-checkbox>
                            <van-checkbox class="m-2" name="美食">美食</van-checkbox>
                            <van-checkbox class="m-2" name="电影">电影</van-checkbox>
                            <van-checkbox class="m-2" name="运动">运动</van-checkbox>
                            <van-checkbox class="m-2" name="00后">00后</van-checkbox>
                            <van-checkbox class="m-2" name="登山">登山</van-checkbox>

                        </van-checkbox-group>
                    </template>
                </van-field>
                <van-field v-model="form.birthday" is-link readonly name="birthday" label="生日" placeholder="点击选择日期"
                    @click="showCalendar = true" />
                <van-calendar v-model:show="showCalendar" @confirm="onConfirmCalendar" />
                <van-field v-model="form.address.name" is-link readonly name="address" label="地区选择"
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
