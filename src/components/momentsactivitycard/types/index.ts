import type { Images } from '@/api/post/types'
import type { UserCard } from '@/api/user/types'

interface MomentCardData {
  card_id: number
  userInfo: UserCard
  isFollow: boolean
  isLike: boolean
  content: {
    desc: string
    images: Images[]
  }

  likeCount: number
  commentCount: number
  createTime: string
}

export type { MomentCardData }
