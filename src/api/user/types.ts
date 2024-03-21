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

interface Address {
  name?: string // 地址名称
  code?: string // 地址代码或邮政编码
}

interface Contact {
  email?: string // 电子邮箱
  phone?: string // 联系电话
}

interface Tags {
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
}
/**分页查询返回结果 */
export interface PageResult<T, R> {
  list: (T | R)[]
  pageSize: number
  totalCount: number
  totalPages: number
  currentPage: number
}

/** 获取用户发布参数 */
export interface GetUserPostsParams extends PageParams {
  user_id: number
}
