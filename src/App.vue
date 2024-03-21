<script setup lang="ts">
import { RouterView } from 'vue-router';
import authHelper from './utils/auth/authHelper';
// 同步用户信息到pinia
authHelper.syncInfoToUserStore()

</script>
<template>
  <RouterView />
</template>

<style scoped></style>
