// 用户基本信息类型
interface UserInfo {
  id: string // 用户ID
  nickname: string // 昵称
  gender: '男' | '女' | '其他' // 性别
  birthday: string // 生日，以 Unix 时间戳形式表示
  tags: string[] // 标签列表
  signature: string // 个性签名
  address: Address // 地址信息
  contact: Contact // 联系方式
  avatar: string // 头像 URL
}

// 地址类型
interface Address {
  name?: string // 地址名称
  code?: string // 地址代码或邮政编码
}

// 联系方式类型
interface Contact {
  email?: string // 电子邮箱
  phone?: string // 联系电话
}

export type { UserInfo, Address, Contact }
