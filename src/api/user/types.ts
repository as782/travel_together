/* 登录接口参数类型 */
export interface LoginData {
  username: string
  password: string
}

/* 登录接口返回值类型 */
export interface LoginResult {
  token: string
  user_info: UserInfo
}

export interface Address {
  name?: string // 地址名称
  code?: string // 地址代码或邮政编码
}

export interface Contact {
  email?: string // 电子邮箱
  phone?: string // 联系电话
}

export interface Tags {
  tag_id?: number // 标签ID
  tag_name?: string // 标签名称
}
/**user_info**/
export interface UserInfo {
  user_id: number
  avatar_url: string
  nickname: string
  username: string
  gender: string
  bio: string
  birthday: string
  contact: Contact
  address: Address
  tags: Tags[]
  created_at: string
}

/** 用户卡片 */
export interface UserCard extends Pick<UserInfo, 'user_id' | 'avatar_url' | 'nickname'> {}

/**分页查询参数 */
export interface PageParams {
  page?: number
  limit?: number
  theme_id?: number // 分主题查询
  user_id?: number 
  post_id?: number // 用于区分用户发布的内容
  follow?:boolean //  用于区分世界，和关注的动态
}
/**分页查询返回结果 */
export interface PageResult<T> {
  list: T[]
  pageSize?: number
  totalCount?: number
  totalPages?: number
  currentPage?: number
}

 

/** 获取用户发布参数 */
export interface GetUserPostsParams extends PageParams {
  user_id: number
}

/** 标签列表返回 */
export interface TagResult {
  list: Tags[]
}

/** 点赞帖子关联数据类型 */
export interface LikePostRelative {
  user_id?: number
  post_id?: number
  dynamic_post_id?: number
  created_at?: string
}
