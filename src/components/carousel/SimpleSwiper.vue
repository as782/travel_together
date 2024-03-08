<template>
    <swiper :centeredSlides="true" loop :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
    }" :pagination="{
        clickable: true,
    }" :navigation="true" :modules="modules" class="mySwiper">
        <swiper-slide @click="() => handleClickSlide(item)" v-for="( item ) in  props.slideList " :key="item.id"
            class="rounded-lg">
            <img :src="item.imgUrl" alt="" class="w-full h-full object-cover  rounded-lg">
        </swiper-slide>
    </swiper>
</template>
<script setup lang="ts">
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination } from 'swiper/modules';
import type { SlideInfo } from './types';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

interface IProps {
    slideList: SlideInfo[];
}

const props = defineProps<IProps>();
// import required modules
const modules = [Autoplay, Pagination];

const handleClickSlide = (item: SlideInfo) => {
    console.log(item);
}
</script>