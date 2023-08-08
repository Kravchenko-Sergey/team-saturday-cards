import { RatingValue } from 'components/ui/grade'

export type Pagination = {
  totalPages: number
  currentPage: number
  itemsPerPage: number
  totalItems: number
}

export type Card = {
  id: string
  question: string
  answer: string
  deckId: string
  questionImg?: any
  answerImg?: any
  questionVideo?: any
  answerVideo?: any
  created: string
  updated: string
  shots: number
  grade: RatingValue
}

export type GetCardsResponse = {
  pagination: Pagination
  items: Card[]
}
