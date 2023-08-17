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

export type DeleteDeckResponse = Omit<CreateDeckResponse, 'author'>

export type ArgGetDecks = {
  minCardsCount?: number
  maxCardsCount?: number
  name?: string
  authorId?: string
  orderBy?: string
  currentPage?: number
  itemsPerPage?: number
}
