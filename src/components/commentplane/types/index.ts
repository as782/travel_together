import type { UserCard } from '@/api/user/types'

interface CommentState {
  loading: boolean
  finished: boolean
  error: boolean
}
interface CommentDetail {
  comment_id: number
  userInfo: UserCard
  content: string
  createTime: string
  reply?: {
    id: number
    user: UserCard
    content: string
    createTime: string
  }[]
}

export type { CommentState, CommentDetail }
