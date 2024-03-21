import { http, type Result } from '@/utils/http/request'
import type { GetUserPostsParams, LoginData, LoginResult, PageResult } from './types'
import type { GroupDetail, MomentDetail } from '../post/types'
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
  return http.post<Result<PageResult<GroupDetail, MomentDetail>>>('/users/getMyposts', data)
}
