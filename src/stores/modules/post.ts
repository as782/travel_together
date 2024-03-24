import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { DataState } from '../types'
import type { GroupDetail, MomentDetail } from '@/api/post/types'
import { getMomentPostDetail, getTeamPostDetail } from '@/api/post'

const usePostStore = defineStore('post', () => {
  /** 组队页面 组队帖子详情列表 */
  const goupPagePostList = ref<DataState<GroupDetail[]>>({
    status: 'idle',
    error: null,
    data: []
  })
  /** 动态页面 动态帖子详情列表 */
  const momentPagePostList = ref<DataState<MomentDetail[]>>({
    status: 'idle',
    error: null,
    data: []
  })

  /** 我的页面 我喜欢的组队详情列表 */
  const myLikeGroupPostDetailList = ref<DataState<GroupDetail[]>>({
    status: 'idle',
    error: null,
    data: []
  })
  /** 我的页面 我喜欢动态详情列表 */
  const myLikeMomentPostDetailList = ref<DataState<MomentDetail[]>>({
    status: 'idle',
    error: null,
    data: []
  })

  /**获取组队页面 组队帖子详情列表 */
  const getGoupPagePostList = async () => {}

  /**获取动态页面 动态帖子详情列表 */
  const getMomentPagePostList = async () => {}

  /**获取我的页面 我喜欢的组队详情列表 */
  const getMyLikeGroupPostDetailList = async (postIds: number[]) => {
    //  通过id发起多个请求
    myLikeGroupPostDetailList.value.status = 'loading'
    try {
      const response = await Promise.all(postIds.map((id) => getTeamPostDetail(id)))
        console.log('groupIDs', postIds);
        
      const data = response.map((res) => res.data)
      myLikeGroupPostDetailList.value = {
        status: 'succeeded',
        error: null,
        data
      }
    } catch (error) {
      myLikeGroupPostDetailList.value = {
        status: 'failed',
        error: '获取喜欢组队帖失败',
        data: []
      }
    }
  }
  /**获取我的页面 我喜欢动态详情列表 */
  const getMyLikeMomentPostDetailList = async (postIds: number[]) => {
    console.log('momeids', postIds);
    myLikeMomentPostDetailList.value.status = 'loading'
    try {
      const response = await Promise.all(postIds.map((id) => getMomentPostDetail(id)))
      const data = response.map((res) => res.data)
      myLikeMomentPostDetailList.value = {
        status: 'succeeded',
        error: null,
        data
      }
    } catch (error) {
      myLikeMomentPostDetailList.value = {
        status: 'failed',
        error: '获取喜欢动态帖失败',
        data: []
      }
    }
  }

  return {
    goupPagePostList,
    momentPagePostList,
    myLikeGroupPostDetailList,
    myLikeMomentPostDetailList,
    getGoupPagePostList,
    getMomentPagePostList,
    getMyLikeGroupPostDetailList,
    getMyLikeMomentPostDetailList
  }
})

export { usePostStore }
