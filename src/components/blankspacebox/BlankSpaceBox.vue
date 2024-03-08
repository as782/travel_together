<script setup lang="ts">
import { computed } from 'vue';

// 可以传入宽高属性属性单位，决定实在那个方向上占据空间
interface IProps {
    width?: number | string
    height?: number | string
}
const props = defineProps<IProps>();

const style = computed(() => {
    return {
        width: props.width,
        height: props.height
    }
});
</script>
<template>
    <div class="cont-box" :style="style">

    </div>
</template>
<style scoped>
.cont-box {
    width: 100%;
    height: 50px;
}
</style>