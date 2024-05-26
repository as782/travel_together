import { http, type Result } from '@/utils/http/request'
import type {
  GroupDetail,
  JoinTeamInfo,
  MomentDetail,
  PublishGroupParams,
  PublishMomentParams,
  Themes,
  UpdateGroupParams,
  UpdateMomentParams
} from './types'
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

/** 获取组队帖主题列表 */
export const getTeamPostThemes = () => {
  return http.get<Result<Themes[]>>('/theme/getThemes')
}

/** 获取组队页的组队帖子列表 theme_id 需要传入 */
export const getTeamPosts = (data: PageParams) => {
  return http.post<Result<PageResult<any>>>('/post/getTeamPostsForPage', data)
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

/** 发布动态 */
export const publishMomentPost = (data: PublishMomentParams) => {
  return http.post<Result<any>>('/post/publishDynamicPost', data)
}
/** 修改动态 */
export const modifyMomentPost = (data: UpdateMomentParams) => {
  return http.post<Result<any>>('/post/updateDynamicPost', data)
}

/** 发布组队 */
export const publishTeamPost = (data: PublishGroupParams) => {
  return http.post<Result<any>>('/post/publishTeamPost', data)
}

/** 修改组队 */
export const modifyTeamPost = (data: UpdateGroupParams) => {
  return http.post<Result<any>>('/post/updateTeamPost', data)
}

// /** 删除动态 */
// export const deleteMomentPost = (postId: number) => {
//   return http.post<Result<any>>(`/post/deleteDynamicPost/`, { dynamic_post_id: postId })
// }

// /** 删除组队 */
// export const deleteTeamPost = (postId: number) => {
//   return http.post<Result<any>>(`/post/deleteTeamPost/`, { post_id: postId })
// }

/** 删除组队帖 */
export const deletePostRequest = async (data: { ids: number[] }) => {
  return http.post<Result<any>>('/admin/deletePost', data)
}

/** 删除动态帖 */
export const deleteMomentRequest = async (data: { ids: number[] }) => {
  return http.post<Result<any>>('/admin/deleteDynamicPost', data)
}

/** 获取首页推荐 */
export const getRecommendPosts = () => {
  return http.get<Result<any[]>>('/post/getRecommendPosts')
}
