// 上传文件

import { CONTENT_TYPE } from '@/config/http'
import { http, type Result } from '@/utils/http/request'
import type { UploadResult } from './types'

export const uploadAvatar = (filedata: any, usename: string) => {
  return http.post<Result<UploadResult>>(`/upload/avatar/${usename}`, filedata, {
    headers: { 'Content-Type': CONTENT_TYPE.form_data }
  })
}
export interface UploadImagPlayload {
  filedata: any
  username: string
  flag: 'profile_bg' | 'avatar' | 'moment_post' | 'team_post' | 'initerary'
}
/**
 * 上传图片
 * @param filedata
 * @param username
 * @param flag profile_bg | avatar | moment_post | team_post |initerary
 */
export const uploadImageFile = (playload: UploadImagPlayload) => {
  return http.post<Result<UploadResult>>(
    `/upload/${playload.flag}/${playload.username}`,
    playload.filedata,
    {
      headers: { 'Content-Type': CONTENT_TYPE.form_data }
    }
  )
}
