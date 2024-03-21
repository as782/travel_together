import type { JoinTeamInfo } from '@/api/post/types'
import type { UserCard } from '@/api/user/types'

interface UserCardInfo extends UserCard {
  likeFans: JoinTeamInfo[]
}
interface GroupCardData {
  userInfo: UserCardInfo
  card_id: number
  desc: string
  condition: {
    destination: string[]
    time: string
  }
  cover_imgUrl: string
  createTime?: string
}

export type { GroupCardData }
