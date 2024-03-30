<script setup lang="ts">
import { reactive, ref } from 'vue';
import EffectSwiper from '@/components/carousel/EffectSwiper.vue';
import GroupInfoCard from '@/components/groupcard/GroupInfoCard.vue';
import type { SlideInfo } from '@/components/carousel/types';
import type { GroupCardData } from '@/components/groupcard/types';
import { useRouter } from 'vue-router';
import { debounce } from 'lodash';
import type { PageParams } from '@/api/user/types';
import type { Themes } from '@/api/post/types'
import { getTeamMembers, getTeamPosts } from '@/api/post/index'
import { useThemesStore } from '@/stores/modules/themes';
import { onMounted } from 'vue';
import { watch } from 'vue';

type PageState = { currentPage: number, pageSize: number, total: number }
type ListState = { loading: boolean, finished: boolean, error: boolean }
interface ThemeDataStateMap {
    theme_id: number
    dataList: GroupCardData[]
    pageState: PageState
    isFinished: boolean
}

onMounted(() => {
    getCategoryList()
    listOnloadHandle()
})

const router = useRouter();
//------------ 轮播图处理 ---------------//
/**  轮播的图片数据， 点击后需要考虑路由跳转 */
const imgList = reactive<SlideInfo[]>([
    {
        imgUrl: 'https://swiperjs.com/demos/images/nature-1.jpg',
        id: 1,
        name: '1'
    },
    {
        imgUrl: 'https://swiperjs.com/demos/images/nature-2.jpg',
        id: 2,
        name: '2'
    },
    {
        imgUrl: 'https://swiperjs.com/demos/images/nature-3.jpg',
        id: 3,
        name: '3'
    },
    {
        imgUrl: 'https://swiperjs.com/demos/images/nature-4.jpg',
        id: 4,
        name: '4'
    },
    {
        imgUrl: 'https://swiperjs.com/demos/images/nature-5.jpg',
        id: 5,
        name: '5'
    },
    {
        imgUrl: 'https://swiperjs.com/demos/images/nature-6.jpg',
        id: 6,
        name: '6'
    },
    {
        imgUrl: 'https://swiperjs.com/demos/images/nature-7.jpg',
        id: 7,
        name: '7'
    },
    {
        imgUrl: 'https://swiperjs.com/demos/images/nature-7.jpg',
        id: 8,
        name: '8'
    }

]);

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


    let filterArr = cardDataThemeMap.value.filter(item => item.theme_id == theme_id)


    if (filterArr.length > 0) {

        listState.value.finished = filterArr[0].isFinished
        cardDataList.value = filterArr[0].dataList
    } else {
        // 没有该主题的数据，则发起请求
        const params = {
            theme_id,
            page: 1,
            limit: 10
        }
        try {
            let result = await getCardDataList(params)
            const { list, totalCount, currentPage, pageSize } = result.data
            cardDataThemeMap.value.push({
                theme_id,
                pageState: {
                    currentPage: currentPage!,
                    pageSize: pageSize!,
                    total: totalCount!,
                },
                dataList: list,
                isFinished: false
            })
            cardDataList.value = list

            listState.value.loading = false
        } catch (error) {
            console.log(error)
        }
    }
})

/** 获取所有主题列表 */
const getCategoryList = async () => {
    await themesStore.getThemes()
    categoryList.value = themesStore.themes
}

/**  缓存： 主题-->数据列表 */
const cardDataThemeMap = ref<ThemeDataStateMap[]>([])
/**  数据列表 */
const cardDataList = ref<GroupCardData[]>([])

/** 控制列表下拉状态，方便分页加载 */
const listState = ref<ListState>({
    loading: false,
    error: false,
    finished: false,
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
                cover_imgUrl: item.images[0].image_url,
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
    const filterArr = cardDataThemeMap.value.filter(item => item.theme_id === theme_id)

    if (!filterArr[0].isFinished) {

        if (filterArr.length > 0) {

            const { currentPage, pageSize } = filterArr[0].pageState
            filterArr[0].pageState.currentPage = currentPage! + 1
            const params = {
                theme_id,
                page: filterArr[0].pageState.currentPage!,
                limit: pageSize!
            }
            try {
                const result = await getCardDataList(params)
                const { list, totalCount, currentPage, pageSize } = result.data
                filterArr[0].dataList = [...filterArr[0].dataList, ...list]
                filterArr[0].pageState.currentPage = currentPage!
                filterArr[0].pageState.pageSize = pageSize!
                filterArr[0].pageState.total = totalCount!

                if (filterArr[0].dataList.length >= filterArr[0].pageState.total) {
                    filterArr[0].isFinished = true
                }
                console.log(filterArr[0].dataList.length, filterArr[0].pageState.total);

                cardDataList.value = filterArr[0].dataList
                listState.value.finished = filterArr[0].isFinished
                listState.value.loading = false
            } catch (error) {
                console.log(error);

            }
        }
    }

}, 100);



const handleGotoDetal = (card_id: number) => {

    router.push(`/groupDetail/${card_id}`)
}
</script>

<template>
    <main class="bg-white">
        <EffectSwiper :slideList="imgList"></EffectSwiper>

        <van-tabs v-model:active="vanTabActive" class="mt-2 " animated sticky :offset-top="50">
            <van-tab v-for="item in  categoryList " :name="item.theme_id" :key="item.theme_id"
                title-inactive-color="#ddd" title-active-color="#000">
                <template #title>
                    <div class="rounded-md w-3/9 h-8 flex justify-center items-center">
                        <span class="text-sm ">{{ item.theme_name }}</span>
                    </div>
                </template>

                <van-empty v-if="!cardDataList.length && listState.finished" description="没有更多了"></van-empty>
                <van-list v-else class="p-1 lg:columns-2 " offset="100" :immediate-check="false"
                    v-model:loading="listState.loading" :finished="listState.finished" finished-text="没有更多了"
                    v-model:error="listState.error" error-text="请求失败，点击重新加载" @load="listOnloadHandle">
                    <template v-for="(cardinfo) in cardDataList " :key="cardinfo.card_id">
                        <GroupInfoCard @click="handleGotoDetal(cardinfo.card_id)" :cardData="cardinfo" class="m-2" />
                    </template>
                </van-list>
            </van-tab>
        </van-tabs>

    </main>
</template>

<style scoped></style>