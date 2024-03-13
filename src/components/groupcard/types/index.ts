type FansInfo = {
  id: string
  name: string
  avatar: string
}
interface CardInfo {
  userInfo: {
    id: string
    name: string
    avatar: string
    likeFans: FansInfo[]
  }

  card_id: number
  desc: string
  condition: {
    destination: string[]
    time: string
  }

  cover_imgUrl: string
}

export type { CardInfo }
