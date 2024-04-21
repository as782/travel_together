<script setup lang="ts">
import { computed } from 'vue';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import type { SlideInfo } from './types';
// Import Swiper styles
import 'swiper/css';

import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { useRouter } from 'vue-router';

const modules = [EffectCoverflow, Autoplay];
const router = useRouter();

interface IProps {
    slideList: SlideInfo[];
}

const props = defineProps<IProps>();

const slideSize = computed(() => {
    return props.slideList.length;
});
const initialSlide = computed(() => {
    return Math.floor(slideSize.value / 2);
})


const handleClickSlide = (item: SlideInfo) => {
    if(item.name?.includes("team")){
        router.push(`/groupDetail/${item.id}`)
    }else{
        router.push(`/momentDetail/${item.id}`)
    }

}
</script>
<template>
    <swiper :effect="'coverflow'" :initialSlide="initialSlide" :centeredSlides="true" :slidesPerView="'auto'"
        :grabCursor="true" loop :autoplay="{
        delay: 2000,
        disableOnInteraction: false,

    }" :coverflowEffect="{
        rotate: 0,
        stretch: -40,
        depth: 200,
        slideShadows: false,
    }" :pagination="true" :modules="modules" class="mySwiper w-full ">
        <swiper-slide @click="() => handleClickSlide(item)" v-for="( item ) in  props.slideList " :key="item.id"
            class="rounded-lg">
            <img :src="item.imgUrl" alt="" class="w-full h-full object-cover  rounded-lg">
        </swiper-slide>
    </swiper>
</template>
<style scoped>
.mySwiper {
    height: 300px;
}

.mySwiper .swiper-slide {
    width: 80%;
    height: 100%;
}
</style>