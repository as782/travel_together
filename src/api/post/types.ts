import type { UserCard } from '../user/types'
export interface Images {
  image_id: number
  image_url: string
}
/** 组队贴详情类型 */
export interface GroupDetail {
  post_id: number
  user_id: number
  title: string
  description: string
  duration_day: number
  estimated_expense: number
  gender_requirement: string
  payment_method: string
  start_location: string
  end_location: string
  team_size: number
  images: Images[]
  theme_id: number
  created_at: string
  itinerary?: string
  user_info?: UserCard
  comments?: Comment[]
  like_userIds?: number[]
}

/** 动态帖详情类型 */
export interface MomentDetail {
  dynamic_post_id: number
  user_id: number
  content: string
  images: Images[]
  created_at: string
  user_info?: UserCard
  comments?: Comment[]
  like_userIds?: number[]
}

/** 加入小队人员信息类型 */
export interface JoinTeamInfo extends UserCard {
  joined_at: string
}

/** 评论 */
export interface Comment {
  comment_id: number
  user_id: number
  user_info?: UserCard
  content: string
  created_at: string
}
/** 动态评论类型 */
export interface MomentComment extends Comment {
  dynamic_post_id: number
}
/** 组队评论类型 */
export interface GroupComment extends Comment {
  post_id: number
}

/** 主题 */
export interface Themes {
  theme_id: number
  theme_name: string
}

/** 发布动态参数类型 */
export interface PublishMomentParams extends Pick<MomentDetail, 'user_id' | 'content'> {
  image_urls: string[]
}

/** 修改动态参数类型 */
export interface UpdateMomentParams extends PublishMomentParams {
  dynamic_post_id: number
}

/** 发布组队帖子参数类型 */
export interface PublishGroupParams
  extends Omit<
    GroupDetail,
    'post_id' | 'images' | 'created_at' | 'user_info' | 'comments' | 'like_userIds'
  > {
  image_urls: string[]
}
/** 修改组队帖子参数类型 */
export interface UpdateGroupParams extends PublishGroupParams {
  post_id: number
  image_urls: string[]
}
