import type { UserCard } from "@/api/user/types"

interface MomentCardData {
  card_id: number
  userInfo:UserCard
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
