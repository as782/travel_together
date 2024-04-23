<script setup lang="ts">
import type { CardData } from './types/intex'

interface IProps {
  cardData: CardData
}
const { cardData } = defineProps<IProps>()
</script>
<template>
  <div class="card-info flex p-2">
    <van-image
      class="flex-none w-12 aspect-square shadow-lg shadow-slate-400"
      round
      fit="cover"
      :src="cardData.avatar"
    />
    <div class="mx-2 flex-1">
      <div class="flex flex-col mb-1">
        <h4 class="text-sm text-left">{{ cardData.nickname }}</h4>
        <div class="flex items-center">
          <van-icon name="user-circle-o" />
          <span class="mx-3 text-sm">{{ cardData.birthday }} 岁</span>
        </div>
      </div>
    </div>
    <van-button
      class="flex-none"
      :disabled="cardData?.isFollow"
      :icon="cardData?.isFollow ? '' : 'plus'"
      type="primary"
      round
      :plain="cardData?.isFollow"
      size="small"
    >
      {{ cardData?.isFollow ? '已关注' : '关注' }}
    </van-button>
  </div>
</template>
<style scoped></style>
