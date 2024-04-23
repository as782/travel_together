<script setup lang="ts"></script>
<template>
  <van-config-provider>
    <van-nav-bar
      fixed
      :z-index="999"
    >
      <template #left>
        <slot name="left"></slot>
      </template>
      <slot></slot>
      <template #right>
        <slot name="right"></slot>
      </template>
    </van-nav-bar>
  </van-config-provider>
</template>

<style scoped></style>
