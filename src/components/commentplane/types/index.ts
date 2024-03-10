interface CommentState {
  loading: boolean
  finished: boolean
  error: boolean
}
interface CommentDetail {
  id: number
  content: string
  createTime: string
  user: {
    id: number
    nickname: string
    avatar: string
  }
  reply?: {
    id: number
    content: string
    createTime: string
    user: {
      id: number
      nickname: string
      avatar: string
    }
  }[]
}

export type { CommentState, CommentDetail }
