<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
const route = useRoute();
</script>

<template>
    <main class="p-2 overflow-y-hidden">
        <RouterView>
            <template #default="{ Component }">
                <keep-alive>
                    <component :key="route.name || route.path" v-if="route.meta.keepAlive" :is="Component" />
                </keep-alive>
                <component :key="route.name || route.path" v-if="!route.meta.keepAlive" :is="Component" />
            </template>
        </RouterView>
    </main>
</template>

<style scoped></style>