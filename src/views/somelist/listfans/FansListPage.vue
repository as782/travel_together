<script setup lang="ts">

</script>
<template>
    <div>
        <van-list>
            <van-cell v-for="item in 10" :key="item" :title="item" />
        </van-list>
    </div>
</template>


<style scoped></style>