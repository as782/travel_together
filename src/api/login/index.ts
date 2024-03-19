import { http } from '@/utils/http/request';
import type { LoginData } from './types';
/**
 * 实现登录
 */
export const login = (data: LoginData) => {
  return http.post('/login', data)
}
