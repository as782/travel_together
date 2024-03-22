// 上传文件

import { CONTENT_TYPE } from '@/config/http'
import { http, type Result } from '@/utils/http/request'
import type { UploadResult } from './types'

export const uploadAvatar = (filedata: any, usename: string) => {
  return http.post<Result<UploadResult>>(`/upload/avatar/${usename}`, filedata, {
    headers: { 'Content-Type': CONTENT_TYPE.form_data }
  })
}
