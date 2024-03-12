<template>
    <main class="flex flex-col justify-center items-center">
        <h1>404</h1>
        <p>Page not found</p>
        <van-button @click="router.back()" type="warning">go back</van-button>
    </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<style scoped></style>