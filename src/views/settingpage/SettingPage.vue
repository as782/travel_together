<script setup lang="ts">
import { useUserStore } from '@/stores/modules/user'
import { useRouter } from 'vue-router'
const router = useRouter()
const LogOut = () => {
  useUserStore().resetUserSotre()
  router.push('/login')
}
</script>

<template>
  <main>
    <van-cell-group class="my-2">
      <van-cell
        v-for="i in 4"
        :key="i"
        title="单元格"
        value="内容"
      />
    </van-cell-group>
    <van-cell-group class="my-2">
      <van-cell
        v-for="i in 4"
        :key="i"
        title="单元格"
        value="内容"
      />
    </van-cell-group>
    <van-cell-group class="my-2">
      <van-cell
        v-for="i in 3"
        :key="i"
        title="单元格"
        value="内容"
      />
    </van-cell-group>
    <div class="bg-white mt-4 py-4 flex justify-center items-center">
      <van-button
        class="w-full"
        type="primary"
        @click="LogOut"
        >退出登录</van-button
      >
    </div>
  </main>
</template>

<style scoped></style>
