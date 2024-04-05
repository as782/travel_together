<template>
  <div class="w-full p-2   max-h-80"> 
    <ul @click="handleEmojiClick" class="flex flex-col  max-h-80 overflow-y-scroll">
      <li
      class="flex justify-around my-1"
        v-for="(emojis, row) in EMOJIS"
        :key="row"
      >
        <span
        class="w-8 h-8 text-center text-2xl cursor-pointer"
          v-for="(emoji, col) in emojis"
          :key="col"
          :data-row="row"
          :data-col="col"
          >{{ emoji }}</span
        >
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import EMOJIS from './emoji'
 
const selectEmoji = defineModel()
const emit = defineEmits(['clickEmoji'])
const handleEmojiClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (target.tagName === 'SPAN') {
    const row = parseInt(target.dataset.row || '0')
    const col = parseInt(target.dataset.col || '0')
    emit('clickEmoji', EMOJIS[row][col])
    selectEmoji.value = EMOJIS[row][col]
  }
}
</script>

<style scoped></style>
