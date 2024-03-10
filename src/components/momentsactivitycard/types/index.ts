interface MomentCardData {
  id: number
  user: {
    id: number
    nickName: string
    avatar: string
  }
  isFollow: boolean
  content: {
    desc: string
    images: string[]
  }

  likeCount: number
  commentCount: number
  createTime: string
}

export type { MomentCardData }
