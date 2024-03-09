<template>
    <main>
        <EffectSwiper :slideList="imgList"></EffectSwiper>
        <van-tabs v-model:active="vanTabActive" class="mt-2" sticky :offset-top="50">
            <van-tab v-for="item in  categoryList " :key="item.name" title-inactive-color="#ddd"
                title-active-color="#000">
                <template #title>
                    <div class="rounded-md w-3/9 h-8 flex justify-center items-center">
                        <span class="text-sm ">{{ item.name }}</span>
                    </div>
                </template>
                <!-- 瀑布流布局 -->
                <div class="p-2 mt-2 columns-2 md:columns-6 ">
                    <template v-for="cardinfo in item.data " :key="cardinfo.card_id">
                        <GroupInfoCard @click="handleGotoDetal(cardinfo.card_id)" :cardData="cardinfo" class="my-8" />
                    </template>
                </div>
            </van-tab>
        </van-tabs>
    </main>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import EffectSwiper from '@/components/carousel/EffectSwiper.vue';
import { GroupInfoCard } from './components/index';
import type { SlideInfo } from '@/components/carousel/types';
import type { CardInfo } from './types';
import { useRouter } from 'vue-router';
const router = useRouter();
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
const categoryList = reactive<{ name: string, data: CardInfo[] }[]>([{
    name: '热门推荐',
    data: [
        {
            userInfo: {
                id: '11101',
                name: 'LangGO',
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                likeFans: [{
                    id: '22201',
                    name: "d1",
                    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                }, {
                    id: '22202',
                    name: "d1",
                    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                }]
            },

            card_id: 331,
            desc: 'ddffff,如果准备好了的话！',
            condition: {
                destination: ['', '成都'],
                time: '10'
            },

            cover_imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        },
        {
            userInfo: {
                id: '11102',
                name: 'LangGO',
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                likeFans: [
                    {
                        id: '22201',
                        name: "d1",
                        avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                    },
                    {
                        id: '22202',
                        name: "d1",
                        avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                    }]
            },

            card_id: 12,
            desc: '差不多可以出发了,sa沙发沙发的',
            condition: {
                destination: ['', '成都'],
                time: '10'
            },

            cover_imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        },
        {
            userInfo: {
                id: '11103',
                name: '段誉',
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                likeFans: [{
                    id: '22201',
                    name: "d1",
                    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                }]
            },

            card_id: 111,
            desc: '是的方法,电风扇发射点',
            condition: {
                destination: ['', '成都'],
                time: '10'
            },

            cover_imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        },
        {
            userInfo: {
                id: '11104',
                name: '慕容复',
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                likeFans: [{
                    id: '22201',
                    name: "d1",
                    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                }]
            },

            card_id: 12314,
            desc: '微软微软为,撒阿斯顿',
            condition: {
                destination: ['', '成都'],
                time: '10'
            },

            cover_imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        },
        {
            userInfo: {
                id: '11105',
                name: '北乔峰',
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                likeFans: [{
                    id: '22201',
                    name: "d1",
                    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                }]
            },

            card_id: 132,
            desc: '看了就好看,ui同一天',
            condition: {
                destination: ['', '成都'],
                time: '10'
            },

            cover_imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        }
    ]
},
{
    name: '徒步系列',
    data: [
        {
            userInfo: {
                id: '11101',
                name: 'LangGO',
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                likeFans: [{
                    id: '22201',
                    name: "d1",
                    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                }, {
                    id: '22202',
                    name: "d1",
                    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                }]
            },

            card_id: 112,
            desc: '阿斯顿发生,如果准备好了的话！',
            condition: {
                destination: ['', '成都'],
                time: '10'
            },

            cover_imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        },
        {
            userInfo: {
                id: '11102',
                name: 'LangGO',
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                likeFans: [
                    {
                        id: '22201',
                        name: "d1",
                        avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                    },
                    {
                        id: '22202',
                        name: "d1",
                        avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                    }]
            },

            card_id: 1,
            desc: '差不多可以出发了,如果准备好了的话！',
            condition: {
                destination: ['', '成都'],
                time: '10'
            },

            cover_imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        },
        {
            userInfo: {
                id: '11103',
                name: '段誉',
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                likeFans: [{
                    id: '22201',
                    name: "d1",
                    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                }]
            },

            card_id: 1,
            desc: '差不多可以出发了,如果准备好了的话！',
            condition: {
                destination: ['', '成都'],
                time: '10'
            },

            cover_imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        },
        {
            userInfo: {
                id: '11104',
                name: '慕容复',
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                likeFans: [{
                    id: '22201',
                    name: "d1",
                    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                }]
            },

            card_id: 1,
            desc: '差不多可以出发了,如果准备好了的话！',
            condition: {
                destination: ['', '成都'],
                time: '10'
            },

            cover_imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        },
        {
            userInfo: {
                id: '11105',
                name: '北乔峰',
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                likeFans: [{
                    id: '22201',
                    name: "d1",
                    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                }]
            },

            card_id: 1,
            desc: '差不多可以出发了,如果准备好了的话！',
            condition: {
                destination: ['', '成都'],
                time: '10'
            },

            cover_imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        }
    ]
},
{
    name: '文化系列',
    data: [
        {
            userInfo: {
                id: '11101',
                name: 'LangGO',
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                likeFans: [{
                    id: '22201',
                    name: "d1",
                    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                }, {
                    id: '22202',
                    name: "d1",
                    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                }]
            },

            card_id: 1,
            desc: '差不多可以出发了,如果准备好了的话！',
            condition: {
                destination: ['', '成都'],
                time: '10'
            },

            cover_imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        },
        {
            userInfo: {
                id: '11102',
                name: 'LangGO',
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                likeFans: [
                    {
                        id: '22201',
                        name: "d1",
                        avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                    },
                    {
                        id: '22202',
                        name: "d1",
                        avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                    }]
            },

            card_id: 1,
            desc: '差不多可以出发了,如果准备好了的话！',
            condition: {
                destination: ['', '成都'],
                time: '10'
            },

            cover_imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        },
        {
            userInfo: {
                id: '11103',
                name: '段誉',
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                likeFans: [{
                    id: '22201',
                    name: "d1",
                    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                }]
            },

            card_id: 1,
            desc: '差不多可以出发了,如果准备好了的话！',
            condition: {
                destination: ['', '成都'],
                time: '10'
            },

            cover_imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        },
        {
            userInfo: {
                id: '11104',
                name: '慕容复',
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                likeFans: [{
                    id: '22201',
                    name: "d1",
                    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                }]
            },

            card_id: 1,
            desc: '差不多可以出发了,如果准备好了的话！',
            condition: {
                destination: ['', '成都'],
                time: '10'
            },

            cover_imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        },
        {
            userInfo: {
                id: '11105',
                name: '北乔峰',
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                likeFans: [{
                    id: '22201',
                    name: "d1",
                    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                }]
            },

            card_id: 1,
            desc: '差不多可以出发了,如果准备好了的话！',
            condition: {
                destination: ['', '成都'],
                time: '10'
            },

            cover_imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        }
    ]
},
{
    name: '越野',
    data: [
        {
            userInfo: {
                id: '11101',
                name: 'LangGO',
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                likeFans: [{
                    id: '22201',
                    name: "d1",
                    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                }, {
                    id: '22202',
                    name: "d1",
                    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                }]
            },

            card_id: 1,
            desc: '差不多可以出发了,如果准备好了的话！',
            condition: {
                destination: ['', '成都'],
                time: '10'
            },

            cover_imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        },
        {
            userInfo: {
                id: '11102',
                name: 'LangGO',
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                likeFans: [
                    {
                        id: '22201',
                        name: "d1",
                        avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                    },
                    {
                        id: '22202',
                        name: "d1",
                        avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                    }]
            },

            card_id: 1,
            desc: '差不多可以出发了,如果准备好了的话！',
            condition: {
                destination: ['', '成都'],
                time: '10'
            },

            cover_imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        },
        {
            userInfo: {
                id: '11103',
                name: '段誉',
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                likeFans: [{
                    id: '22201',
                    name: "d1",
                    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                }]
            },

            card_id: 1,
            desc: '差不多可以出发了,如果准备好了的话！',
            condition: {
                destination: ['', '成都'],
                time: '10'
            },

            cover_imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        },
        {
            userInfo: {
                id: '11104',
                name: '慕容复',
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                likeFans: [{
                    id: '22201',
                    name: "d1",
                    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                }]
            },

            card_id: 1,
            desc: '差不多可以出发了,如果准备好了的话！',
            condition: {
                destination: ['', '成都'],
                time: '10'
            },

            cover_imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        },
        {
            userInfo: {
                id: '11105',
                name: '北乔峰',
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                likeFans: [{
                    id: '22201',
                    name: "d1",
                    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                }]
            },

            card_id: 1,
            desc: '差不多可以出发了,如果准备好了的话！',
            condition: {
                destination: ['', '成都'],
                time: '10'
            },

            cover_imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        }
    ]
},
{
    name: '露营',
    data: [
        {
            userInfo: {
                id: '11101',
                name: 'LangGO',
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                likeFans: [{
                    id: '22201',
                    name: "d1",
                    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                }, {
                    id: '22202',
                    name: "d1",
                    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                }]
            },

            card_id: 1,
            desc: 'asdadaasdasdadsa！',
            condition: {
                destination: ['', '成都'],
                time: '10'
            },

            cover_imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        },
        {
            userInfo: {
                id: '11102',
                name: 'LangGO',
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                likeFans: [
                    {
                        id: '22201',
                        name: "d1",
                        avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                    },
                    {
                        id: '22202',
                        name: "d1",
                        avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                    }]
            },

            card_id: 1,
            desc: 'sssssss,如果准备好了的话！',
            condition: {
                destination: ['', '成都'],
                time: '10'
            },

            cover_imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        },
        {
            userInfo: {
                id: '11103',
                name: '段誉',
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                likeFans: [{
                    id: '22201',
                    name: "d1",
                    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                }]
            },

            card_id: 1,
            desc: '密码多少发多少发生,如果准备好了的话！',
            condition: {
                destination: ['', '成都'],
                time: '10'
            },

            cover_imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        },
        {
            userInfo: {
                id: '11104',
                name: '慕容复',
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                likeFans: [{
                    id: '22201',
                    name: "d1",
                    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                }]
            },

            card_id: 1,
            desc: '手动阀沙发ffffewqwea,如果准备好了的话！',
            condition: {
                destination: ['', '成都'],
                time: '10'
            },

            cover_imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        },
        {
            userInfo: {
                id: '11105',
                name: '北乔峰',
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                likeFans: [{
                    id: '22201',
                    name: "d1",
                    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                }]
            },

            card_id: 1,
            desc: 'dsfafd,dsaf',
            condition: {
                destination: ['', '成都'],
                time: '10'
            },

            cover_imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        }
    ]
},
{
    name: '自驾',
    data: [
        {
            userInfo: {
                id: '11101',
                name: 'LangGO',
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                likeFans: [{
                    id: '22201',
                    name: "d1",
                    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                }, {
                    id: '22202',
                    name: "d1",
                    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                }]
            },

            card_id: 1,
            desc: 'sdafy发广告的规划,如果准备好了的话！',
            condition: {
                destination: ['', '成都'],
                time: '10'
            },

            cover_imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        },
        {
            userInfo: {
                id: '11102',
                name: 'LangGO',
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                likeFans: [
                    {
                        id: '22201',
                        name: "d1",
                        avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                    },
                    {
                        id: '22202',
                        name: "d1",
                        avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                    }]
            },

            card_id: 1,
            desc: '差不多可以出发了,如果准备好了的话！',
            condition: {
                destination: ['', '成都'],
                time: '10'
            },

            cover_imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        },
        {
            userInfo: {
                id: '11103',
                name: '段誉',
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                likeFans: [{
                    id: '22201',
                    name: "d1",
                    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                }]
            },

            card_id: 1,
            desc: '差不多可以出发了,如果准备好了的话！',
            condition: {
                destination: ['', '成都'],
                time: '10'
            },

            cover_imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        },
        {
            userInfo: {
                id: '11104',
                name: '慕容复',
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                likeFans: [{
                    id: '22201',
                    name: "d1",
                    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                }]
            },

            card_id: 1,
            desc: '差不多可以出发了,如果准备好了的话！',
            condition: {
                destination: ['', '成都'],
                time: '10'
            },

            cover_imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        },
        {
            userInfo: {
                id: '11105',
                name: '北乔峰',
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                likeFans: [{
                    id: '22201',
                    name: "d1",
                    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                }]
            },

            card_id: 1,
            desc: '差不多可以出发了,如果准备好了的话！',
            condition: {
                destination: ['', '成都'],
                time: '10'
            },

            cover_imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        }
    ]
},
{
    name: '骑行',
    data: [
        {
            userInfo: {
                id: '11101',
                name: 'LangGO',
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                likeFans: [{
                    id: '22201',
                    name: "d1",
                    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                }, {
                    id: '22202',
                    name: "d1",
                    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                }]
            },

            card_id: 1,
            desc: '差不多可以出发了,如果准备好了的话！',
            condition: {
                destination: ['', '成都'],
                time: '10'
            },

            cover_imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        },
        {
            userInfo: {
                id: '11102',
                name: 'LangGO',
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                likeFans: [
                    {
                        id: '22201',
                        name: "d1",
                        avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                    },
                    {
                        id: '22202',
                        name: "d1",
                        avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                    }]
            },

            card_id: 1,
            desc: '差不多可以出发了,如果准备好了的话！',
            condition: {
                destination: ['', '成都'],
                time: '10'
            },

            cover_imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        },
        {
            userInfo: {
                id: '11103',
                name: '段誉',
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                likeFans: [{
                    id: '22201',
                    name: "d1",
                    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                }]
            },

            card_id: 1,
            desc: '差不多可以出发了,如果准备好了的话！',
            condition: {
                destination: ['', '成都'],
                time: '10'
            },

            cover_imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        },
        {
            userInfo: {
                id: '11104',
                name: '慕容复',
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                likeFans: [{
                    id: '22201',
                    name: "d1",
                    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                }]
            },

            card_id: 1,
            desc: '差不多可以出发了,如果准备好了的话！',
            condition: {
                destination: ['', '成都'],
                time: '10'
            },

            cover_imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        },
        {
            userInfo: {
                id: '11105',
                name: '北乔峰',
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                likeFans: [{
                    id: '22201',
                    name: "d1",
                    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                }]
            },

            card_id: 1,
            desc: '差不多可以出发了,如果准备好了的话！',
            condition: {
                destination: ['', '成都'],
                time: '10'
            },

            cover_imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        }
    ]
},
{
    name: '登山',
    data: [
        {
            userInfo: {
                id: '11101',
                name: 'LangGO',
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                likeFans: [{
                    id: '22201',
                    name: "d1",
                    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                }, {
                    id: '22202',
                    name: "d1",
                    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                }]
            },

            card_id: 1,
            desc: '差不多可以出发了,如果准备好了的话！',
            condition: {
                destination: ['', '成都'],
                time: '10'
            },

            cover_imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        },
        {
            userInfo: {
                id: '11102',
                name: 'LangGO',
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                likeFans: [
                    {
                        id: '22201',
                        name: "d1",
                        avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                    },
                    {
                        id: '22202',
                        name: "d1",
                        avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                    }]
            },

            card_id: 1,
            desc: '差不多可以出发了,如果准备好了的话！',
            condition: {
                destination: ['', '成都'],
                time: '10'
            },

            cover_imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        },
        {
            userInfo: {
                id: '11103',
                name: '段誉',
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                likeFans: [{
                    id: '22201',
                    name: "d1",
                    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                }]
            },

            card_id: 1,
            desc: '差不多可以出发了,如果准备好了的话！',
            condition: {
                destination: ['', '成都'],
                time: '10'
            },

            cover_imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        },
        {
            userInfo: {
                id: '11104',
                name: '慕容复',
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                likeFans: [{
                    id: '22201',
                    name: "d1",
                    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                }]
            },

            card_id: 1,
            desc: '差不多可以出发了,如果准备好了的话！',
            condition: {
                destination: ['', '成都'],
                time: '10'
            },

            cover_imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        },
        {
            userInfo: {
                id: '11105',
                name: '北乔峰',
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                likeFans: [{
                    id: '22201',
                    name: "d1",
                    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                }]
            },

            card_id: 1,
            desc: '差不多可以出发了,如果准备好了的话！',
            condition: {
                destination: ['', '成都'],
                time: '10'
            },

            cover_imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        }
    ]
}]);

const vanTabActive = ref<number>(0);

const handleGotoDetal = (card_id: number) => {

    router.push(`/groupDetail/${card_id}`)
}
</script>

<style scoped></style>