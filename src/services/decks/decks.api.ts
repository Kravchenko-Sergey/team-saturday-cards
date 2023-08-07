import { baseApi } from '@/services'

export const decksApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createDeck: builder.mutation<CreateDeckResponse, ArgCreateDeck>({
        query: ({ cover, name, isPrivate }) => {
          return {
            method: 'POST',
            url: 'v1/decks',
            body: { cover, name, isPrivate },
          }
        },
        invalidatesTags: ['Deck'],
      }),
    }
  },
})

export const { useCreateDeckMutation } = decksApi

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

type ArgCreateDeck = {
  cover: string
  name: string
  isPrivate: boolean
}
