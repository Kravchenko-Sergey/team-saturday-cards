export type Deck = {}

export type Author = {
  id: string
  name: string
}

export type CreateDeckResponse = {
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover?: any
  rating: number
  isDeleted?: any
  isBlocked?: any
  created: string
  updated: string
  cardsCount: number
  author: Author
}

export type ArgCreateDeck = {
  cover: string
  name: string
  isPrivate: boolean
}

export type DeleteDeckResponse = Omit<CreateDeckResponse, 'author'>
