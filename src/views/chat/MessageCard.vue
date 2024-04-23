<script setup lang="ts">
import { computed } from 'vue'

interface IProps {
  name?: string
  avatar?: string
  content?: string
  createTime?: string
  isSend?: boolean
  isShowName?: boolean
}
// 判断是接收还是发送决定添加不同样式
const { name, avatar, content, isSend, isShowName } = defineProps<IProps>()

const classname = computed(() => {
  return {
    'send-message': isSend
  }
})
const classnamePop = computed(() => {
  return {
    'msg-pop-left': !isSend,
    'msg-pop': isSend
  }
})
</script>
<template>
  <div class="flex flex-col mb-2">
    <span class="mx-auto my-1 text-xs">{{ createTime }}</span>
    <div
      class="flex"
      :class="classname"
    >
      <van-image
        class="w-10 h-10 aspect-square rounded-md mx-1"
        fit="cover"
        :src="avatar"
      />
      <div class="flex flex-col justify-end">
        <div
          v-if="!isShowName"
          class="text-xs font-bold"
          :class="{ 'text-right': isSend }"
        >
          {{ name || '' }}
        </div>
        <!-- 气泡内容 -->
        <div
          class="max-w-60 text-xs text-gray-500 p-2"
          :class="classnamePop"
        >
          {{ content }}
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.send-message {
  @apply flex-row-reverse;
}

.text-right {
  text-align: right;
}

.msg-pop {
  position: relative;
  border-radius: 8px;
  background-color: #acb2bd;
  color: #fff;
}

.msg-pop::after {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px 10px 10px 10px;
  border-color: transparent transparent transparent #acb2bd;
  left: 100%;
  top: 35px;
  transform: translateY(-50%);
}

.msg-pop-left {
  position: relative;
  border-radius: 8px;
  background-color: #2b64cc;
  color: #fff;
}

.msg-pop-left::before {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px 10px 10px 10px;
  border-color: transparent #2b64cc transparent transparent;
  right: 100%;
  top: 35px;
  transform: translateY(-50%);
}
</style>
