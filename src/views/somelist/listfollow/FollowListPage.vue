<script setup lang="ts">
import { ref } from 'vue';
import type { CardData } from '@/components/usercard/types/intex';
import UserCard from '@/components/usercard/UserCard.vue';
const cardData = ref<CardData>({
    avatar: 'https://i.pravatar.cc/150?img=1',
    nickname: '张三',
    birthday: '129102912',
    gender: '男',
    isFollow: true,

});
</script>
<template>
    <main>
        <van-list>
            <van-cell v-for="item in 10" :key="item">
                <UserCard :card-data="cardData" />
            </van-cell>
        </van-list>
    </main>
</template>


<style scoped></style>