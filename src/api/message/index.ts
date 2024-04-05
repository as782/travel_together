import { http, type Result } from '@/utils/http/request'
import type {
  GetAdminNotificationsParams,
  GetAdminNotificationsResponse,
  GetInteractiveNotificationsParams,
  GetInteractiveNotificationsResponse,
  GetMessagesParams,
  GetMessagesParamsResponse,
  GetMessagesResponse,
  MsgPageResult,
  SendMessageParams
} from './types'
/** 拉取通知 */
export const getNotification = (user_id: number) => {
  return http.get<Result<GetMessagesResponse>>(`/msg/getNotification/${user_id}`)
}

/** 发送消息 */
export const sendMsg = (data: SendMessageParams) => {
  return http.post<Result<any>>('/msg/sendMessage', data)
}

/** 获取两者之间的消息 */
export const getMessageBetweenForUser = (data: GetMessagesParams) => {
  return http.post<Result<MsgPageResult<GetMessagesParamsResponse>>>(`/msg/getMessagesBetweenUsers`, data)
}

/** 获取互动通知 */
export const getInteractiveNotifications = (data: GetInteractiveNotificationsParams) => {
  return http.post<Result<MsgPageResult<GetInteractiveNotificationsResponse>>>(`/msg/getUserInteractiveNotifications`, data)
}

/** 获取管理员通知 */
export const getAdminNotifications = (data: GetAdminNotificationsParams) => {
  return http.post<Result<MsgPageResult<GetAdminNotificationsResponse>>>(`/msg/getUserAdminNotifications`, data)
}
