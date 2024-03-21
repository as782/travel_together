import { http, type Result } from '@/utils/http/request'
import type {  JoinTeamInfo, MomentComment } from './types'

// 获取小队成员
export const getTeamMembers = (postId: number) => {
  return http.get<Result<JoinTeamInfo[]>>(`post/getJoinTeamUsers/${postId}`)
}

/** 获取动态评论 */
export const getMomentPostComments = (postId: number) => {
    return http.get<Result<MomentComment[]>>(`/comment/getPostDynamicComments/${postId}`)
}

/** 获取动态点赞 */
export const getMomentPostLikes = (postId: number) => {
    return http.get<Result<any[]>>(`/like/getLikeDynamicPostUsers/${postId}`)
}

 