import { http, type Result } from '@/utils/http/request'
import type { GroupDetail, JoinTeamInfo, MomentDetail } from './types'
import type { PageParams, PageResult } from '../user/types'

// 获取小队成员
export const getTeamMembers = (postId: number) => {
  return http.get<Result<JoinTeamInfo[]>>(`post/getJoinTeamUsers/${postId}`)
}

/** 获取动态评论 */
export const getMomentPostComments = (data: PageParams) => {
  return http.post<Result<PageResult<Comment>>>(`/comment/getPostDynamicComments/`, data)
}

/** 获取动态点赞用户id列表 */
export const getMomentPostLikes = (postId: number) => {
  return http.get<Result<any[]>>(`/like/getLikeDynamicPostUsers/${postId}`)
}

/** 根据ID 获取组队帖子详情 */
export const getTeamPostDetail = (postId: number) => {
  return http.get<Result<GroupDetail>>(`/post/getTeamPost/${postId}`)
}

/** 根据ID 获取动态帖子详情 */
export const getMomentPostDetail = (postId: number) => {
  return http.get<Result<MomentDetail>>(`/post/getDynamicPost/${postId}`)
}

/** 获取组队页的组队帖子列表 theme_id 需要传入 */
export const getTeamPosts = (data: PageParams) => {
  return http.post<Result<PageResult<GroupDetail>>>('/post/getTeamPostsForPage', data)
}

/** 获取动态页的动态帖子列表 user_id 需要传入则获取关注用户的 */
export const getMomentPosts = (data: PageParams) => {
  return http.post<Result<PageResult<any>>>('/post/getDynamicPostsForPage', data)
}

/** 点赞动态 */
export const likeMomentPost = (data: { post_id: number; user_id: number }) => {
  return http.post<Result<any>>(`/like/likeDynamicPost`, data)
}
/** 点赞组队 */
export const likeTeamPost = (data: { post_id: number; user_id: number }) => {
  return http.post<Result<any>>(`/like/likeTeamPost`, data)
}
