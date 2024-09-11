<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { showToast } from 'vant'
import { useRoute, useRouter } from 'vue-router'

import BlankSpaceBox from '@/components/blankspacebox/BlankSpaceBox.vue'
import MessageCard from './MessageCard.vue'
import EmojiBorad from '@/components/emoji/EmojiBoard.vue'

// import { useMessageStore } from '@/stores/modules/message'
import { useUserStore } from '@/stores/modules/user'
import { getMessageBetweenForUser, sendMsg } from '@/api/message'
import { type GetMessagesParamsResponse, Role, MessageType } from '@/api/message/types'
import type { UserCard } from '@/api/user/types'
import { getUSerCardInfo } from '@/api/user'

onMounted(() => {
  getChatRecord()

})

const route = useRoute()
const router = useRouter()
// const useMessage = useMessageStore()
const useUser = useUserStore()
/** 获取对方信息 */
const contactInfo = ref<UserCard>()
/** 自己信息 */
const userInfo = computed(() => ({
  user_id: useUser.userInfo?.user_id,
  nickname: useUser.userInfo?.nickname,
  avatar_url: useUser.userInfo?.avatar_url
}))
// 标题是否显示
const IsShowTitle = computed(() => (route.meta?.title ? true : false))
const IsShowNavbar = computed(() => !route.meta?.hideNavbar)

/** 控制聊天记录页 */
const pageState = ref({
  currentPage: 1,
  pageSize: 10,
  total: -1
})
interface ChatRecordListItem {
  id: number
  sender_id: number
  receiver_id: number
  content: string
  created_at: string
  isSender: boolean
  user_info: UserCard
}
/** 两人消息列表 */
const chatRecordList = ref<ChatRecordListItem[]>([])
/** 判断消息是否为我发出 */
const isSend = (send_id: number) => {
  return send_id === userInfo.value.user_id
}
/** 获取用户信息 */
const getUserInfoCardData = async (user_id: number) => {
  try {
    let result = await getUSerCardInfo(user_id)
    contactInfo.value = result.data.user_info as any
  } catch (error) {
    console.error(error)
  }
}
/** 获取聊天记录两人 */
const getChatRecord = async () => {
  if (
    pageState.value.total !== -1 &&
    (pageState.value.currentPage - 1) * pageState.value.pageSize >= pageState.value.total
  ) {
    showToast('没有更多消息了')
    console.log(pageState.value.total, pageState.value.currentPage * pageState.value.pageSize)

    return
  }
  const params = {
    user2_id: Number(route.params.id),
    user1_id: userInfo.value.user_id!,
    page: pageState.value.currentPage,
    limit: pageState.value.pageSize
  }
  try {
    const result = await getMessageBetweenForUser(params)
    await getUserInfoCardData(Number(route.params.id))
    chatRecordList.value.unshift(
      ...result.data.list
        .map((item: GetMessagesParamsResponse) => {
          const issend = isSend(item.sender_id)
          const user_info = issend
            ? {
              user_id: userInfo.value.user_id!,
              nickname: userInfo.value.nickname!,
              avatar_url: userInfo.value.avatar_url!
            }
            : contactInfo.value!
          return {
            ...item,
            isSender: issend,
            user_info
          }
        })
        .reverse()
    )

    pageState.value.total = result.data.totalCount!
    pageState.value.currentPage = result.data.currentPage!
    pageState.value.pageSize = result.data.pageSize!
  } catch (error) {
    console.error(error)
  }
}

//------------ 文本输入发送处理 -------------//
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
  insertPosition.value = e.target.selectionStart
}
/** 点击emoji回调 */
const handleClickEmoji = (emoji: string) => {
  inputContent.value =
    inputContent.value.slice(0, insertPosition.value) +
    emoji +
    inputContent.value.slice(insertPosition.value)
  // 光标位置 到最后
  insertPosition.value = insertPosition.value + emoji.length
}

const sendMessage = async () => {
  if (!inputContent.value) {
    showToast('请输入内容')
    return
  }

  const params = {
    sender_type: Role.USER,
    sender_id: userInfo.value.user_id!,
    receiver_id: Number(route.params.id),
    receiver_type: Role.USER,
    content: inputContent.value,
    type: MessageType.PRIVATE_MESSAGE
  }
  await sendMsg(params)

  const user_info = {
    user_id: userInfo.value.user_id!,
    nickname: userInfo.value.nickname!,
    avatar_url: userInfo.value.avatar_url!
  }
  const issend = true

  const tempMesaage = {
    content: inputContent.value,
    sender_id: user_info.user_id,
    receiver_id: Number(route.params.id),
    created_at: new Date().toISOString(),
    id: new Date().getTime(),
    isSender: issend,
    user_info
  }

  // 创建一个数据插入到列表
  chatRecordList.value.push(tempMesaage)
  inputContent.value = ''
}

const loading = ref(false)
const onRefresh = async () => {
  console.log('下拉刷新')

  pageState.value.currentPage++
  await getChatRecord()
  showToast('刷新成功')
  loading.value = false
}
</script>
<template>
  <main class="bg-white flex flex-col">
    <van-nav-bar fixed :z-index="999" v-if="IsShowNavbar" left-text="返回" left-arrow @click-left="router.back()">
      <template #title>
        <span>
          {{ IsShowTitle ? contactInfo?.nickname : '' }}
        </span>
      </template>
    </van-nav-bar>
    <BlankSpaceBox :height="'50px'" />
    <van-pull-refresh class="flex-1" v-model="loading" @refresh="onRefresh">
      <div>
        <template v-for="chatRecord in chatRecordList" :key="chatRecord.id">
          <MessageCard :user_id="chatRecord.user_info.user_id" :is-send="chatRecord.isSender"
            :content="chatRecord.content" :name="chatRecord.user_info.nickname"
            :avatar="chatRecord.user_info.avatar_url" :createTime="chatRecord.created_at" />
        </template>
      </div>
    </van-pull-refresh>

    <BlankSpaceBox :height="'50px'" />

    <div class="fixed bottom-0 w-full p-2 flex items-center border-t-blue-100 bg-white">
      <div class="flex mx-2">
        <input @blur="onBlur" v-model="inputContent" class="border border-blue-200 rounded-md mx-2 px-1" type="text" />
        <van-button type="primary" size="small" @click="sendMessage">发送</van-button>
      </div>
      <div class="relative flex">
        <van-popover placement="top-end" z-index="999" v-model:show="showEmojiPopover">
          <EmojiBorad v-model="selectEmoji" @click-emoji="handleClickEmoji" />

          <template #reference>
            <van-icon class="mx-2" name="smile-o" size="30" />
          </template>
        </van-popover>

        <van-icon name="add-o" size="30" />
      </div>
    </div>
  </main>
</template>

<style scoped></style>
