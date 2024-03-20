import { http, type Result } from '@/utils/http/request';
import type { LoginData, LoginResult} from './types';
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