/** 角色类型 */
export enum Role {
  ADMIN = 'admin',
  USER = 'user'
}
/** 消息类型 */
// enum('private_message','dynamic_post_comment','dynamic_post_like','team_activity_post_comment','team_activity_post_like','admin_notification','follow_notification')
export enum MessageType {
  /** 私人消息 */
  PRIVATE_MESSAGE = 'private_message',
  /** 动态评论消息 */
  DYNAMIC_POST_COMMENT = 'dynamic_post_comment',
  /** 动态点赞消息 */
  DYNAMIC_POST_LIKE = 'dynamic_post_like',
  /** 组队评论消息 */
  TEAM_ACTIVITY_POST_COMMENT = 'team_activity_post_comment',
  /** 组队点赞消息 */
  TEAM_ACTIVITY_POST_LIKE = 'team_activity_post_like',
  /** 管理员消息 */
  ADMIN_NOTIFICATION = 'admin_notification',
  /** 关注消息 */
  FOLLOW_NOTIFICATION = 'follow_notification'
}

/** 类型的中文名称映射 */
export const MessageTypeNameMap = {
  [MessageType.PRIVATE_MESSAGE]: '私人消息',
  [MessageType.ADMIN_NOTIFICATION]: '管理员消息',
  [MessageType.FOLLOW_NOTIFICATION]: '关注消息',
  [MessageType.DYNAMIC_POST_COMMENT]: '动态评论消息',
  [MessageType.DYNAMIC_POST_LIKE]: '动态点赞消息',
  [MessageType.TEAM_ACTIVITY_POST_COMMENT]: '组队评论消息',
  [MessageType.TEAM_ACTIVITY_POST_LIKE]: '组队点赞消息'
}

/**  列表参数 */
export interface MsgPageParams {
  page: number
  limit: number
}

export interface MsgPageResult<T> {
  list: T[]
  pageSize?: number
  totalCount?: number
  totalPages?: number
  currentPage?: number
}

/** 发送消息接口参数 */
export interface SendMessageParams {
  sender_type: Role
  sender_id: number
  receiver_type: Role
  receiver_id: number
  content: string
  type: MessageType
}

/** 获取两人之间的消息参数 */
export interface GetMessagesParams extends MsgPageParams {
  user_id1: number
  user_id2: number
}

/** 获取管理员通知 */
export interface GetAdminNotificationsParams extends MsgPageParams {
  user_id: number
}

/** 获取互动消息 */
export interface GetInteractiveNotificationsParams extends MsgPageParams {
  user_id: number
}

/** 消息内容类型 */
export interface MessageContent {
  id: number
  sender_type: Role
  sender_id: number
  receiver_type: Role
  receiver_id: number
  content: string
  type: MessageType
  related_id: number
  comment_id: number
  like_id: number
  created_at: string
  sender_avatar: string
  sender_nickname: string
  receiver_avatar: string
  receiver_nickname: string
}

/** 拉取消息返回类型 */
export interface GetMessagesResponse {
  messages: {
    send: MessageContent[]
    received: MessageContent[]
  }
  admin_notifications: MessageContent[]
  interactive: MessageContent[]
}

/** 获取两人之间消息返回类型 */
export interface GetMessagesParamsResponse
  extends Pick<MessageContent, 'content' | 'sender_id' | 'receiver_id' | 'created_at'> {}

/** 获取管理员通知返回类型 */
export interface GetAdminNotificationsResponse extends MessageContent {}

/** 获取互动通知返回类型 */
export interface GetInteractiveNotificationsResponse extends MessageContent {}
