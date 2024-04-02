<script setup lang="ts">
import BlankSpaceBox from '@/components/blankspacebox/BlankSpaceBox.vue';
import MessageCard from './MessageCard.vue';

import EmojiBorad from '@/components/emoji/EmojiBoard.vue';
import { showToast } from 'vant';
import { ref } from 'vue';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { watch } from 'vue';



const route = useRoute();
const router = useRouter();
// 标题是否显示
const IsShowTitle = computed(() => route.meta?.title ? true : false);
const IsShowNavbar = computed(() => !route.meta?.hideNavbar);

/** 文本内容 */
const inputContent = ref('')
/** 当前emoji */
const selectEmoji = ref('')
/** 打开emoji面板 */
const showEmojiPopover = ref(false)
// 插入位置
const insertPosition = ref(0)
/** 失去焦点记录光标位置 */
const onBlur = (e: any) => {
    insertPosition.value = e.target.selectionStart;
    console.log(e.target.selectionStart);

}
/** 点击emoji回调 */
const handleClickEmoji = (emoji: string) => {
    inputContent.value = inputContent.value.slice(0, insertPosition.value) + emoji + inputContent.value.slice(insertPosition.value)
    // 光标位置 到最后
    insertPosition.value = insertPosition.value + emoji.length;
}


const count = ref(0);
const loading = ref(false);
const onRefresh = () => {
    setTimeout(() => {
        showToast('刷新成功');
        loading.value = false;
        count.value++;
    }, 1000);
};
</script>
<template>
    <main class="bg-white">
        <van-nav-bar fixed :z-index="999" v-if="IsShowNavbar" left-text="返回" left-arrow @click-left="router.back()">
            <template #title>
                <span>
                    {{ IsShowTitle ? route.meta?.title : '' }}
                </span>
            </template>
        </van-nav-bar>
        <BlankSpaceBox :height="'50px'" />
        <div>
            <van-pull-refresh v-model="loading" @refresh="onRefresh">
                <p>刷新次数: {{ count }}</p>
                <MessageCard />
                <MessageCard :is-send="true" />
                <MessageCard />
                <MessageCard />
                <MessageCard />
                <MessageCard />
                <MessageCard />
                <MessageCard :is-send="true" />
                <MessageCard :is-send="true" />
                <MessageCard :is-send="true" />
                <MessageCard :is-send="true" />
            </van-pull-refresh>
        </div>

        <BlankSpaceBox :height="'50px'" />
        <BlankSpaceBox :height="'50px'" />

        <div class="fixed bottom-0 w-full p-2  flex items-center  border-t-blue-100 bg-white ">
            <div class="flex   mx-2 ">
                <input @blur="onBlur" v-model="inputContent" class="border border-blue-200 rounded-md mx-2 px-1"
                    type="text" />
                <van-button type="primary" size="small">发送</van-button>
            </div>
            <div class="relative flex">
                <van-popover placement="top-end" z-index="999" v-model:show="showEmojiPopover">
                    <EmojiBorad v-model="selectEmoji" @click-emoji="handleClickEmoji" />

                    <template #reference>
                        <van-icon class="mx-2" name="smile-o" size="30" />
                    </template>
                </van-popover>

                <van-icon class="mx-2" name="add-o" size="30" />
            </div>
        </div>
    </main>
</template>



<style scoped></style>