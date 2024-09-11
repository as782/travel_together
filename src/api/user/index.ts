import { http, type Result } from '@/utils/http/request'
import type {
  GetUserPostsParams,
  LikePostRelative,
  LoginData,
  LoginResult,
  PageResult,
  TagResult,
  UserInfo,
  UserShowCard
} from './types'
import type { GroupDetail } from '../post/types'

/**
 * 实现登录
 */
export const login = (data: LoginData) => {
  return http.post<Result<LoginResult>>('/login', data)
}

/**
 * 实现注册
 */
export const register = (data: LoginData) => {
  return http.post<Result>('/register', data)
}

/**
 * 获取用户发布 post
 * @param data
 * @returns
 */
export const getUserPublish = (data: GetUserPostsParams) => {
  return http.post<Result<PageResult<any>>>('/users/getMyposts', data)
}

/** 修改个人信息 */
export const updateUserInfo = (data: any) => {
  return http.post<Result>('/users/update', data)
}

/** 修改密码 */
export const changeUserPassword = (data: any) => {
  return http.post<any>('/users/changePassword', data)
}

/** 获取用户信息 */
export const getUserInfo = (userId: number) => {
  return http.get<Result<UserInfo>>(`/users/getUserInfo/${userId}`, {
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache'
    }
  })
}

/** 获取用户卡片信息 */
export const getUSerCardInfo = (userId: number) => {
  return http.get<Result<UserShowCard>>('users/getUserCardInfo/' + userId)
}

/** 标签列表 */
export const getTagList = () => {
  return http.get<Result<TagResult>>('/tags/getTagsList')
}

/** 获取粉丝 */
export const getFans = (userId: number) => {
  return http.get<Result<PageResult<UserInfo>>>('/users/getFans/' + userId)
}

/** 获取关注的人 */
export const getFollows = (userId: number) => {
  return http.get<Result<PageResult<UserInfo>>>('/users/getFollows/' + userId)
}

/**  关注 or 取消  
 * {
    "follower_id": number,  关注者
    "following_id": number, 被关注者
    "action": 1 | 0 1表示关注 0 取消关注
} */
export type FollowData = {
  follower_id: number
  following_id: number
  action: number
}
/** 关注 or 取消 */
export const followOneUser = (data: FollowData) => {
  return http.post<Result>('/users/follow', data)
}

export type MoLike = Partial<LikePostRelative> & Required<Pick<LikePostRelative, 'dynamic_post_id'>>
export type Golike = Partial<LikePostRelative> & Required<Pick<LikePostRelative, 'post_id'>>

/** 用户喜欢的动态 */
export const getUserLikeMoment = (userId: number) => {
  return http.get<Result<PageResult<MoLike>>>('/like/getUserLikedDynamicPosts/' + userId)
}

/** 用户喜欢的组队 */
export const getUserLikeGroup = (userId: number) => {
  return http.get<Result<PageResult<Golike>>>('/like/getUserLikedTeamPosts/' + userId)
}

/** 用户加入的小队 */
export const getUserJoinedGroups = (data: { user_id: number; page: number; limit: number }) => {
  return http.post<Result<PageResult<GroupDetail>>>('/users/getJoinedTeams', data)
}

/** 加入小队 */
export const joinTeam = (data: { user_id: number; post_id: number }) => {
  return http.post<Result<any>>(`/users/joinTeam`, data)
}
/** 退出小队 */
export const quitTeam = (data: { user_id: number; post_id: number }) => {
  return http.post<Result<any>>(`/users/quitTeam`, data)
}
