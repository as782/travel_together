<script setup lang="ts">
import { ref } from 'vue';
import EffectSwiper from '@/components/carousel/EffectSwiper.vue';
import GroupInfoCard from '@/components/groupcard/GroupInfoCard.vue';
import type { SlideInfo } from '@/components/carousel/types';
import type { GroupCardData } from '@/components/groupcard/types';
import { useRouter } from 'vue-router';
import { debounce } from 'lodash';
import type { PageParams } from '@/api/user/types';
import type { Themes } from '@/api/post/types'
import { getRecommendPosts, getTeamMembers, getTeamPosts } from '@/api/post/index'
import { useThemesStore } from '@/stores/modules/themes';
import { onMounted } from 'vue';
import { watch } from 'vue';


// type PageState = { currentPage: number, pageSize: number, total: number }
type ListState = { loading: boolean, finished: boolean, error: boolean }
// interface ThemeDataStateMap {
//     theme_id: number
//     dataList: GroupCardData[]
//     pageState: PageState
//     isFinished: boolean
// }

onMounted(() => {
    getCategoryList()
    listOnloadHandle()
    getRecomendList()
})

const router = useRouter();
//------------ 轮播图处理 ---------------//
/**  轮播的图片数据， 点击后需要考虑路由跳转 */
const getRecomendList = async () => {
    const result = await getRecommendPosts()
    imgList.value = result.data.map((item: any) => {
        return {
            imgUrl: item.images[0]?.image_url || '',
            id: item.post_id,
            name: item.type + '-' + item.post_id
        }
    })
}

//------------ 组队贴处理 ---------------//

const imgList = ref<SlideInfo[]>([]);

//----------- 组队贴分类筛选-----------//
/**  分类列表 */
const categoryList = ref<Themes[]>([])
/** 当前主题 */
const vanTabActive = ref<number>(0)
/** 主题仓库 */
const themesStore = useThemesStore()

/** 监听tab */
watch(vanTabActive, async (theme_id) => {
    listState.value = {
        loading: false,
        error: false,
        finished: false,
    }
    try {
        const params = {
            theme_id,
            page: 1,
            page_size: 10
        }
        // 获取帖子列表
        const result = await getCardDataList(params)
        const { list, totalCount, currentPage, pageSize } = result.data

        pageState.value.currentPage = currentPage!
        pageState.value.pageSize = pageSize!
        pageState.value.total = totalCount!

        if (cardDataList.value.length >= pageState.value.total) {
            listState.value.finished = true
        }
        cardDataList.value = list

        pageState.value.currentPage++
    } catch (error) {
        console.error(error)
    }
}
)

/** 获取所有主题列表 */
const getCategoryList = async () => {
    await themesStore.getThemes()
    categoryList.value = themesStore.themes
}


/**  数据列表 */
const cardDataList = ref<GroupCardData[]>([])



/** 控制列表下拉状态，方便分页加载 */
const listState = ref<ListState>({
    loading: false,
    error: false,
    finished: false,
})
const pageState = ref({
    currentPage: 1,
    pageSize: 10,
    total: -1
})
/** 获取加入小队的成员 */
const getGroupPeoples = async (post_id: number) => {
    const res = await getTeamMembers(post_id)
    return res.data;
}

/**  获取数据列表 */
const getCardDataList = async (params: PageParams) => {
    try {
        const result = await getTeamPosts(params)
        listState.value.loading = false
        result.data.list = await Promise.all(result.data.list.map(async (item: any) => {
            const { user_info } = item;
            const joinMans = await getGroupPeoples(item.post_id); // 等待异步操作完成
            return {
                userInfo: {
                    user_id: user_info?.user_id ?? 0,
                    nickname: user_info?.nickname ?? 'Unkonw',
                    avatar_url: user_info?.avatar_url ?? "",
                    likeFans: joinMans
                },
                card_id: item.post_id,
                desc: item.title,
                condition: {
                    destination: [item.start_location, item.end_location],
                    time: `${item.duration_day}`
                },
                cover_imgUrl: item.images[0]?.image_url || '',
                createTime: item.created_at || undefined,
            }
        }))
        return result
    } catch (error) {
        listState.value.loading = false
        listState.value.error = true
        throw error
    }
}

/** 下拉列表刷新处理事件 */
const listOnloadHandle = debounce(async () => {
    const theme_id = vanTabActive.value



    const params = {
        theme_id,
        page: pageState.value.currentPage!,
        limit: pageState.value.pageSize!
    }
    try {
        const result = await getCardDataList(params)
        const { list, totalCount, currentPage, pageSize } = result.data

        pageState.value.currentPage = currentPage!
        pageState.value.pageSize = pageSize!
        pageState.value.total = totalCount!

        if (cardDataList.value.length >= pageState.value.total) {
            listState.value.finished = true
        }
        cardDataList.value.push(...list)

        pageState.value.currentPage++

        listState.value.loading = false
    } catch (error) {
        console.log(error);

    }


}, 100);



const handleGotoDetal = (card_id: number) => {

    router.push(`/groupDetail/${card_id}`)
}
</script>

<template>
    <main class="bg-white">
        <EffectSwiper :slideList="imgList"></EffectSwiper>
        <van-sticky :offset-top="40">
            <van-tabs v-model:active="vanTabActive" class="mt-2 ">
                <van-tab v-for="item in categoryList " :name="item.theme_id" :key="item.theme_id"
                    title-inactive-color="#ddd" title-active-color="#000">
                    <template #title>
                        <div class="rounded-md w-3/9 h-8 flex justify-center items-center">
                            <span class="text-sm ">{{ item.theme_name }}</span>
                        </div>
                    </template>
                </van-tab>
            </van-tabs>
        </van-sticky>
        <van-empty v-if="!cardDataList.length" description="没有更多了"></van-empty>

        <van-list v-else class="p-1 lg:columns-2 " offset="100" v-model:loading="listState.loading"
            :finished="listState.finished" finished-text="没有更多了" v-model:error="listState.error"
            error-text="请求失败，点击重新加载" @load="listOnloadHandle">

            <template v-for="(cardinfo) in cardDataList " :key="cardinfo.card_id">
                <GroupInfoCard @click="handleGotoDetal(cardinfo.card_id)" :cardData="cardinfo" class="m-2" />
            </template>

        </van-list>
    </main>
</template>

<style scoped></style>