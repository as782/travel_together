<script setup lang="ts">
import type { CardInfo } from '../types/index';
interface IProps {
    cardData: CardInfo
}
const { cardData } = defineProps<IProps>()
</script>
<template>
    <div class="group-info-card flex flex-col px-2 py-3 rounded-lg shadow shadow-red-200">
        <div class="card-top flex items-center">
            <van-image round class="w-8 aspect-square mx-2" :src="cardData.userInfo.avatar" />
            <span class="w-3/5 h-full  mx-1  truncate text-sm text-nowrap text-gray-500 font-bold">
                {{ cardData.userInfo.name }}
            </span>
        </div>
        <div class="card-center rounded-lg my-1">
            <!-- 宣传image -->
            <img class="w-full aspect-auto rounded-lg" :src="cardData.cover_imgUrl" alt="">
        </div>
        <div class="card-bottom">
            <div class="active-desc w-full ">
                <p class="text-sm font-bold   ">
                    {{ cardData.desc }}
                </p>
                <div class="condition flex flex-col my-2">
                    <div class="destination">
                        <van-icon color="#9d9dff" name="location" />
                        <span class="ml-1 text-gray-400" style="font-size: 12px;">
                            {{ cardData?.condition?.destination.map((e) => e === '' ? '不限' : e).join('-') }}
                        </span>
                    </div>
                    <div class="time">
                        <van-icon color="#9d9dff" name="clock" />
                        <span class="ml-1 text-gray-400" style="font-size: 12px;">{{ cardData?.condition.time }}天</span>
                    </div>
                </div>
            </div>
            <!-- who like this card -->
            <div class="fans-list flex justify-end items-center mt-2">
                <div class="fans flex justify-end items-center w-2/3 ">
                    <van-image v-for="item in cardData?.userInfo?.likeFans" :key="item.id" round
                        class="w-2/12 aspect-square " :src="item.avatar" />
                </div>
                <span class=" mx-1 text-teal-400 text-nowrap" style="font-size: 12px;">
                    {{ cardData?.userInfo?.likeFans.length }}人喜欢
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.active-desc p {
    display: -webkit-box;
    /* 将元素作为弹性伸缩盒子展示 */
    -webkit-line-clamp: 2;
    /* 限制文本行数为 2 行 */
    -webkit-box-orient: vertical;
    /* 设置伸缩盒子为垂直方向 */
    overflow: hidden;
    /* 隐藏溢出文本 */
    text-overflow: ellipsis;
    /* 使用省略号截断溢出文本 */

}
</style>