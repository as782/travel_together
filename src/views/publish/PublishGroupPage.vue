<script setup lang="ts">
import { areaList } from '@vant/area-data';
import { reactive, ref } from 'vue';

// 地址选择显示
const showAddressPopup = ref(false);

// 表单数据
const formData = reactive({
    title: "快和我一起去南昌",
    description: "豫章故郡，洪都新府，落霞与孤鹜齐飞，秋水共长天一色。",
    travel_time: "30天",
    expected_attendees: "10",
    budget_per_person: "10",
    target_audience: "大学生",
    payment_method: "AA",
    travel_address: "南昌市",
    category: [],// 选中的数据
    tags: [],// 选中的数据
    details: '',
    carouselUrls: [],// 轮播图片地址集合
})
const tagAngCategory = {
    categoryGroup: [
        {
            "_id": "6503b64b58b5e9441f590d00",
            "name": "热门",
            "code": "0",
            "createdAt": "2023-09-15T01:41:31.652Z",
            "updatedAt": "2023-09-15T01:41:31.652Z",
            "__v": 0
        },

    ]
}

</script>
<template>
    <div class="container" style="margin-bottom: 65px;">
        <van-form class="form-area" @submit="() => { }">
            <div class="img-upload">
                <van-field name="uploader">
                    <!-- 预览 -->
                    <template #input>
                        <van-uploader multiple :max-size="500 * 1024" :max-count="8" />
                    </template>
                </van-field>
            </div>
            <div class="post-info-area">
                <van-cell-group>
                    <!-- 输入任意文本 -->
                    <van-field v-model="formData.title" label="帖子标题" placeholder="请输入标题" />
                    <van-field v-model="formData.description" rows="2" autosize type="textarea" maxlength="200"
                        placeholder="简单介绍此次旅行" show-word-limit />

                    <van-field v-model="formData.travel_time" type="text" label="旅行时间" placeholder="例如：10天或立即出发" />
                    <van-field v-model="formData.expected_attendees" type="text" label="期望人数" placeholder="例如：8人" />
                    <van-field v-model="formData.budget_per_person" type="text" label="人均预算" placeholder="例如：2000/人" />
                    <van-field v-model="formData.target_audience" type="text" label="合适人群" placeholder="例如：越野一族" />
                    <van-field v-model="formData.payment_method" type="text" label="付费方式" placeholder="例如：AA" />
                    <van-field v-model="formData.travel_address" type="text" label="旅行地址"
                        @click="showAddressPopup = true" placeholder="例如：xxx" />

                    <!-- 选择旅行地点 -->
                    <van-popup v-model:show="showAddressPopup" position="bottom"  >
                        <van-area title="标题" :area-list="areaList" @confirm="() => { }" />
                    </van-popup>
                    <!-- 选择帖子分类 -->
                    <van-field name="checkboxGroup" label="帖子分类">
                        <template #input>
                            <van-checkbox-group v-model="formData.category" :max="3" direction="horizontal">
                                <template v-for="category in tagAngCategory.categoryGroup" :key="category._id">
                                    <van-checkbox shape="round" :name="category._id">{{ category.name }}</van-checkbox>
                                </template>
                            </van-checkbox-group>
                        </template>
                    </van-field>

                </van-cell-group>



            </div>
            <!-- 详情图片 -->
            <div class="img-upload">
                <van-field name="uploader">
                    <!-- 预览 -->
                    <template #input>
                        <van-uploader reupload :max-count="1" />
                    </template>
                </van-field>
            </div>

            <!-- <van-sticky :offset-bottom="50" position="bottom"> -->
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
            <!-- </van-sticky> -->

        </van-form>

    </div>
</template>
<style scoped></style>