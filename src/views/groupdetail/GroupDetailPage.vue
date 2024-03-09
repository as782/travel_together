<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { SlideInfo } from '@/components/carousel/types';
import { showImagePreview } from 'vant';

const imgList = reactive<SlideInfo[]>([
    {
        imgUrl: 'https://swiperjs.com/demos/images/nature-1.jpg',
        id: 1,
        name: '1'
    },
    {
        imgUrl: 'https://swiperjs.com/demos/images/nature-2.jpg',
        id: 2,
        name: '2'
    },
    {
        imgUrl: 'https://swiperjs.com/demos/images/nature-3.jpg',
        id: 3,
        name: '3'
    },
    {
        imgUrl: 'https://swiperjs.com/demos/images/nature-4.jpg',
        id: 4,
        name: '4'
    },
    {
        imgUrl: 'https://swiperjs.com/demos/images/nature-5.jpg',
        id: 5,
        name: '5'
    },
    {
        imgUrl: 'https://swiperjs.com/demos/images/nature-6.jpg',
        id: 6,
        name: '6'
    },
    {
        imgUrl: 'https://swiperjs.com/demos/images/nature-7.jpg',
        id: 7,
        name: '7'
    },
    {
        imgUrl: 'https://swiperjs.com/demos/images/nature-7.jpg',
        id: 8,
        name: '8'
    }

]);

const handleImgclick = (index: number) => {
    showImagePreview({
        images: imgList.map(item => item.imgUrl),
        startPosition: index,

    });

    console.log(index);

}

const ensureShow = ref(false);
const showPopup = () => {
    ensureShow.value = true;
}

const mycomment = ref(''); // 我的评论
</script>

<template>
    <main class="bg-blue-100">
        <van-config-provider>
            <div class="fixed z-50 top-0 w-full h-10 py-2">
                <div class="flex justify-between">
                    <!-- 返回图标 -->
                    <van-icon class="mx-2" color="#d7d7d799" name="arrow-left" size="30" />
                    <!-- 分享图标 -->
                    <van-icon class="mx-2" color="#d7d7d799" name="share" size="30" />
                </div>
            </div>
            <van-swipe :autoplay="3000" lazy-render>
                <van-swipe-item @click="() => handleImgclick(index)" v-for="(image, index) in imgList" :key="image.id">
                    <img :src="image.imgUrl" />
                </van-swipe-item>
            </van-swipe>
            <div class="desc p-2 bg-white">
                <h4 class="text-sm font-bold">Lorem ipsum dolor sit amet consectetur.</h4>
                <p style="font-size: 12px;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo hic, eius sit
                    adipisci culpa impedit
                    quis rem minima voluptate nesciunt?</p>
                <div class="condition flex flex-col my-2">
                    <div class="destination">
                        <van-icon color="#9d9dff" name="location" />
                        <span class="ml-1 text-gray-400" style="font-size: 12px;">
                            {{ '不限 - 十七例卡' }}
                        </span>
                    </div>
                    <div class="time">
                        <van-icon color="#9d9dff" name="clock" />
                        <span class="ml-1 text-gray-400" style="font-size: 12px;">{{ 10 }}天</span>
                    </div>
                </div>

                <div class="flex justify-around w-full my-2">
                    <div class="flex flex-col justify-center items-center">
                        <h4 class="text-xs">小队人数</h4>
                        <span class="text-sm text-blue-400 font-bold">8人</span>
                    </div>
                    <div class="flex flex-col justify-center items-center">
                        <h4 class="text-xs">预计消费</h4>
                        <span class="text-sm text-blue-400 font-bold">12222元</span>
                    </div>
                    <div class="flex flex-col justify-center items-center">
                        <h4 class="text-xs">性别要求</h4>
                        <span class="text-sm text-blue-400 font-bold">不限</span>
                    </div>
                    <div class="flex flex-col justify-center items-center">
                        <h4 class="text-xs">付费方式</h4>
                        <span class="text-sm text-blue-400 font-bold">AA</span>
                    </div>

                </div>
            </div>
            <div class="w-full p-2 my-3 bg-white">
                <h4 class="text-gray-500">我们的队长</h4>
                <div class="avator flex items-center w-11/12 h-14  mx-auto shadow-md shadow-gray-300 rounded-3xl">
                    <van-image round class="w-8 flex-none aspect-square mx-2"
                        src="https://img.yzcdn.cn/vant/cat.jpeg" />
                    <div class="flex  flex-1 flex-col">
                        <span class="w-3/5 h-full  mx-1 my-1  truncate text-sm text-nowrap text-gray-500 font-bold">
                            队长名字
                        </span>
                        <div class="flex justify-start">
                            <van-tag class="mr-2" round type="primary">标签</van-tag>
                            <van-tag class="mr-2" round type="success">标签</van-tag>
                            <van-tag class="mr-2" round type="warning">标签</van-tag>
                        </div>
                    </div>
                    <van-icon class="flex-none mr-2" color="#9d9dff" name="arrow" size="30" />
                </div>
            </div>

            <div class="w-full my-3 bg-white">
                <van-cell title="展示弹出层" is-link @click="showPopup" />
                <van-popup v-model:show="ensureShow" closeable position="bottom" :style="{ height: '30%' }" />
            </div>

            <div class=" p-2 bg-white">
                <h4 class="text-gray-500">已参加的伙伴</h4>
                <div class="w-full ">
                    <van-list class="flex justify-around">
                        <template v-for="i in 6" :key="i">
                            <div class="flex flex-col justify-center items-center">
                                <van-image round class="w-8 aspect-square mx-2"
                                    src="https://img.yzcdn.cn/vant/cat.jpeg" />
                                <span class="mt-1 text-xs text-gray-500">时空隧道</span>
                            </div>
                        </template>

                    </van-list>
                </div>
            </div>

            <div class="w-full p-2 mt-3 bg-white">
                <h4 class="text-gray-500">评论 （12）</h4>
                <div class="active-comment flex justify-center items-center">
                    <van-image round class="w-10 h-10   aspect-square mx-2" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                    <van-field v-model="mycomment" class=" rounded-xl   bg-cyan-300 " placeholder="喜欢就评论给队长一点支持！" />
                </div>

                <div class="comments-area">
                    <div class="comment flex justify-center items-center my-3" v-for="i in 10 " :key="i">
                        <van-image round class="flex-none w-10 h-10   aspect-square mx-2"
                            src="https://img.yzcdn.cn/vant/cat.jpeg" />
                        <div class="comment-right flex-1 ml-3">
                            <div class="content-top flex items-center  ">
                                <h6 class="text-sm text-gray-500 ">华友从开日</h6>
                                <span class="text-xs text-gray-500 mx-2">2天前</span>
                            </div>
                            <p class="text-sm font-normal">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
                                hic, eius
                                sit adipisci culpa impedit quis rem minima voluptate nesciunt?
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <BlankSpaceBox width="100%" height="50px" />
            <van-action-bar>
                <van-action-bar-icon icon="like-o" text="喜欢" />
                <van-action-bar-icon icon="chat-o" text="11" />
                <van-action-bar-button color="#be99ff" type="warning" text="联系队长" />
                <van-action-bar-button color="#7232dd" type="danger" text="立即加入" />
            </van-action-bar>
        </van-config-provider>
    </main>
</template>



<style scoped></style>