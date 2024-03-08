<template>
    <main>
        <EffectSwiper :slideList="imgList"></EffectSwiper>

    </main>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import EffectSwiper from '@/components/carousel/EffectSwiper.vue';
import type { SlideInfo } from '@/components/carousel/types';

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

])
</script>

<style scoped></style>