import { http, type Result } from '@/utils/http/request'

// 搜索内容通过关键字
export const searchContent = (keyword: string | number) => {
  return http.get<Result<any>>(`/search?keyword=${keyword}`)
}
