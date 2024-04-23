<script setup lang="ts">
import { reactive } from 'vue'
interface Iprops {
  leftBtnType: 'primary' | 'success'
  rightBtnType: 'primary' | 'success'
  isFollow: boolean
}
const props = defineProps<Iprops>()

const emit = defineEmits(['leftBtnClick', 'rightBtnClick'])

const leftBtnColorClass = reactive({
  'btn-color-primary': props.leftBtnType === 'primary',
  'btn-color-success': props.leftBtnType === 'success'
})
const rightBtnColorClass = reactive({
  'btn-color-primary': props.rightBtnType === 'primary',
  'btn-color-success': props.rightBtnType === 'success'
})

const handleClickFollow = () => {
  emit('rightBtnClick')
}
const handleClickChat = () => {
  emit('leftBtnClick')
}
</script>

<template>
  <div class="container">
    <van-button
      class="cos-button"
      :style="{ width: isFollow ? '240px' : '' }"
      :class="leftBtnColorClass"
      @click="handleClickChat"
      >私聊</van-button
    >
    <button
      v-show="!isFollow"
      class="cos-button"
      :class="rightBtnColorClass"
      @click="handleClickFollow"
    >
      关注
    </button>
  </div>
</template>

<style scoped>
.container {
  position: fixed;
  z-index: 999;
  bottom: 40px;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
}

.cos-button {
  width: 180px;
  height: 80%;
  padding: 8px;
  border-radius: 45px;
  margin: 10px;
  color: #fff;
  font-size: 14px;
  transition: 0.4s;
}

.btn-color-primary {
  background-color: #5b5bff;
}

.btn-color-success {
  background-color: #a3913e;
}
</style>
