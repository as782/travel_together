<script setup lang="ts">
import { ref } from 'vue';

const activeName = ref('group')
</script>
<template>
    <div>
        <van-tabs v-model:active="activeName" animated>
            <van-tab name="group" title="组队">
                内容
            </van-tab>
            <van-tab name="moment" title="动态">
                动态
            </van-tab>
        </van-tabs>
    </div>
</template>


<style scoped></style>