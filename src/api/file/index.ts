import { http, type Result } from '@/utils/http/request'

/** 删除组队帖子中的图片 */
export const deleteTeamPostImage = (imageIds: number[]) => {
  return http.post<Result>('/file/deleteTeamPostImage', { image_ids: imageIds })
}

/** 删除行程图片 */
export const deleteItineraryImage = (imageIds: number[]) => {
  return http.post<Result>('/file/deleteItinerary', { image_ids: imageIds })
}

/** 删除动态帖子中的图片 */
export const deleteDynamicPostImage = (imageIds: number[]) => {
  return http.post<Result>('/file/deleteDynamicPostImage', { image_ids: imageIds })
}
