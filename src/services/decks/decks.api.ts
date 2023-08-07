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
      deleteDeck: builder.mutation<DeleteDeckResponse, ArgDeleteDeck>({
        query: id => {
          return {
            method: 'DELETE',
            url: `v1/decks/${id}`,
            params: { id },
          }
        },
        invalidatesTags: ['Deck'],
      }),
    }
  },
})

export const { useCreateDeckMutation, useDeleteDeckMutation } = decksApi

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

export type DeleteDeckResponse = {
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
}

export type ArgDeleteDeck = {
  id: string
}
