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
// user_info
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
