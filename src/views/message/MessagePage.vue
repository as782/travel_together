<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { MessageType, type MessageContent } from '@/api/message/types';
import { useUserStore } from '@/stores/modules/user';
import { useMessageStore } from '@/stores/modules/message';
import { watch } from 'vue';
import { getTimeDiffString } from '@/utils/tool';
import { getGonggao } from '@/api/message';

onMounted(() => {
    getNotice()

});

const router = useRouter();
const userStore = useUserStore()
const useMessage = useMessageStore()

const aboutMessage = ref<any>()
const messageCardList = ref<any>([])
const adminNoticeList = ref<any>([])
const interactiveNoticeList = ref<any>([])

watch(aboutMessage, () => {

    // 处理私人消息
    const sendMessage: MessageContent[] = aboutMessage.value.messages.send;
    const receiveMessage: MessageContent[] = aboutMessage.value.messages.received;
    // 合并消息, 将发个同一个人的消息合并， 收到来自同一个的消息合并
    const mergedMessages = mergeMessages(sendMessage, receiveMessage);
    messageCardList.value = mergedMessages.map(message => generateMessageCardInfo(message, userStore.userInfo?.user_id!))

    // 保存联系人信息
    messageCardList.value.map((messageCard: any) => {
        useMessage.setContactedUserMap(messageCard.userInfo.user_id, messageCard.userInfo)
    })

    // 处理互动通知
    const interactiveNotice = aboutMessage.value.interactive;

    interactiveNoticeList.value = interactiveNotice.map((message: any) => generateMessageCardInfo(message, userStore.userInfo?.user_id!))

    // 处理管理员通知
    // const adminNotice = aboutMessage.value.admin_notifications.map((message: any) => generateMessageCardInfo(message, userStore.userInfo?.user_id!))
    // adminNoticeList.value = adminNotice;
})
// 先获取通知
const getNotice = async () => {

    await useMessage.getNotice(userStore.userInfo?.user_id!)

    aboutMessage.value = useMessage.pageNotices.data

   const result =  await getGonggao()
   adminNoticeList.value =  result.data.list.map((item:any) => {
        return {
            id: item.id,
            content: item.content,
            userInfo: {
                user_id: item.admin_id,
                nickname: item.userInfo.nickname,
                avatar_url: item.userInfo.avatar_url
            }
        }
    })

}

/** 刷新 */
const loading = ref(false)
const onRefresh = () => {
    loading.value = true
    useMessage.pageNotices.status = 'idle'
    getNotice().finally(() => {
        setTimeout(() => {
            loading.value = false;
        }, 1000)
    })
}


/** 跳转到对应的聊天界面 */
const handleClickMessage = (message: any) => {
    const { userInfo: { user_id } } = message
    router.push(`chat/${user_id}`);
}


/** 定义一个辅助函数，用于按照发送者或接收者ID将消息分组 */
function groupMessagesByUserId(messages: MessageContent[], bySender: boolean) {
    const groups = new Map<number, MessageContent[]>();

    messages.forEach(message => {
        const key = bySender ? message.sender_id : message.receiver_id;
        const group = groups.get(key) || [];
        group.push(message);
        groups.set(key, group);
    });
    console.log('groups', groups);

    return groups;
}
/** 合并消息并获取最新消息 */
function mergeMessages(sentMessages: MessageContent[], receivedMessages: MessageContent[]) {
    const mergedMessages = new Map<number, MessageContent>();

    // 合并发送的消息
    const sentGroups = groupMessagesByUserId(sentMessages, false);
    sentGroups.forEach((messages, userId) => {
        const latestMessage = messages.reduce((prev, current) =>
            new Date(current.created_at) > new Date(prev.created_at) ? current : prev
        );

        mergedMessages.set(userId, latestMessage);
        // 更新最新消息

    });

    // 合并接收的消息
    const receivedGroups = groupMessagesByUserId(receivedMessages, true);

    receivedGroups.forEach((messages, userId) => {
        const latestMessage = messages.reduce((prev, current) =>
            new Date(current.created_at) > new Date(prev.created_at) ? current : prev
        );
        // 合并的消息中已经存在发的最新消息，还需要和收到的最新消息进行比较，取最新的消息
        const existingMessage = mergedMessages.get(userId);
        if (existingMessage) {
            mergedMessages.set(userId, existingMessage.created_at > latestMessage.created_at ? existingMessage : latestMessage);
        }
        else {
            mergedMessages.set(userId, latestMessage);
        }

    });


    return Array.from(mergedMessages.values());
}
/** 生成用于展示聊天记录卡片信息 */
function generateMessageCardInfo(message: MessageContent, userId: number) {
    // 通过判断 接受消息的用户id ,如果id为自己说明发送者是一个用户需要展示该用户的信息以及他发的消息
    // 如果消息是自己发的，则显示接受者的信息
    const idSelf = userId === message.receiver_id;
    const userInfo = {
        user_id: idSelf ? message.sender_id : message.receiver_id,
        nickname: idSelf ? message.sender_nickname : message.receiver_nickname,
        avatar_url: idSelf ? message.sender_avatar : message.receiver_avatar
    }
    return {
        id: message.id,
        userInfo,
        isRev: idSelf,
        content: message.content,
        type: message.type,
        created_at: getTimeDiffString(message.created_at)
    }
}
</script>
<template>
    <main class="bg-white">
        <van-sticky :offset-top="50">
            <van-notice-bar class="notice-bar" left-icon="volume-o" background="#ecf9ff" :scrollable="false">
                <van-swipe vertical :autoplay="3000" :touchable="false" :show-indicators="false">
                    <template v-for="adminNotice in adminNoticeList" :key="adminNotice.id">
                        <van-swipe-item class="w-full flex items-center">
                            <div class="w-full flex justify-between " style="width: 100%;">
                                <span>{{ adminNotice.content }}</span>
                                <div class="flex justify-center items-center">
                                    <span class="text-xs text-blue-500 mx-2">------{{ adminNotice.userInfo.nickname
                                        }}</span>
                                    <van-image class="flex-none w-5 aspect-square shadow-lg shadow-slate-400" round
                                        fit="cover" :src="adminNotice.userInfo.avatar_url" />
                                </div>
                            </div>
                        </van-swipe-item>
                    </template>

                </van-swipe>
            </van-notice-bar>
        </van-sticky>
        <van-pull-refresh class="flex-1" v-model="loading" @refresh="onRefresh">
            <div class="system-info flex  p-2 m-2 border shadow-md" @click="router.push('/aboutmoment')">
                <van-icon name="bell" class="flex-none " size="40" color="#7fab50" />
                <div class="mx-2 flex-1">
                    <div class="flex justify-between mb-1">
                        <h4 class="text-sm text-left font-black">{{ '最新动态' }}</h4>
                        <span class="user-state text-xs text-left text-gray-500">
                            {{ interactiveNoticeList[0]?.created_at || '' }}
                        </span>
                    </div>
                    <p v-if="!interactiveNoticeList.length" class="text-xs truncate text-left text-gray-500">
                        无动态
                    </p>
                    <p v-if="interactiveNoticeList[0]?.type === MessageType.TEAM_ACTIVITY_POST_COMMENT"
                        class="text-xs truncate text-left text-gray-500">
                        <span class="text-blue-300">{{ interactiveNoticeList[0]?.userInfo?.nickname }}</span> 评论了你的组队：{{
                            interactiveNoticeList[0]?.content }}
                    </p>
                    <p v-if="interactiveNoticeList[0]?.type === MessageType.DYNAMIC_POST_COMMENT"
                        class="text-xs truncate text-left text-gray-500">
                        <span class="text-blue-300">{{ interactiveNoticeList[0]?.userInfo?.nickname }}</span> 评论了你的动态：{{
                            interactiveNoticeList[0]?.content }}
                    </p>
                    <p v-if="interactiveNoticeList[0]?.type === MessageType.TEAM_ACTIVITY_POST_LIKE"
                        class="text-xs truncate text-left text-gray-500">
                        <span class="text-blue-300">{{ interactiveNoticeList[0]?.userInfo?.nickname }}</span> 点赞了你的组队
                    </p>
                    <p v-if="interactiveNoticeList[0]?.type === MessageType.DYNAMIC_POST_LIKE"
                        class="text-xs truncate text-left text-gray-500">
                        <span class="text-blue-300">{{ interactiveNoticeList[0]?.userInfo?.nickname }}</span> 点赞了你的动态
                    </p>
                    <p v-if="interactiveNoticeList[0]?.type === MessageType.FOLLOW_NOTIFICATION"
                        class="text-xs truncate text-left text-gray-500">
                        <span class="text-blue-300">{{ interactiveNoticeList[0]?.userInfo?.nickname }}</span> 关注了你
                    </p>



                </div>
            </div>
            <van-list>
                <div v-for="message in messageCardList" :key="message.id"
                    class="user-info flex  p-2 m-2 shadow-md border rounded-md border-gray-300"
                    @click="handleClickMessage(message)">
                    <van-image class="flex-none w-12 aspect-square shadow-lg shadow-slate-400" round fit="cover"
                        :src="message.userInfo.avatar_url" />
                    <div class="mx-2 flex-1">
                        <div class="flex justify-between mb-1">
                            <h4 class="text-sm text-left">{{ message.userInfo.nickname }}</h4>
                            <span class="user-state text-xs text-left text-gray-500">{{ message.created_at }}</span>
                        </div>
                        <div class="flex">
                            <van-tag v-if="!message.isRev" class="mx-2" mark type="success">我说</van-tag>
                            <p class="text-xs truncate text-left text-gray-500">{{ message.content }}</p>
                        </div>
                    </div>
                </div>

            </van-list>
        </van-pull-refresh>
    </main>
</template>



<style scoped>
:deep(.van-notice-bar__content) {
    width: 100%;
}

:deep(.van-notice-bar__content .van-swipe) {
    height: 80px;

}
</style>