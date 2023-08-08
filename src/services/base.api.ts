import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { GetDecksResponse } from '@/services/types.ts'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Deck'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.flashcards.andrii.es',
    credentials: 'include',
    prepareHeaders: headers => {
      headers.append('x-auth-skip', 'true')
    },
  }),
  endpoints: builder => {
    return {
      getDecks: builder.query<GetDecksResponse, ArgGetDecks>({
        query: params => {
          return {
            url: 'v1/decks',
            params,
          }
        },
        providesTags: ['Deck'],
      }),
    }
  },
})

export const { useGetDecksQuery } = baseApi

type ArgGetDecks = {
  minCardsCount?: string
  maxCardsCount?: string
  name?: string
  authorId?: string
  orderBy?: string
  currentPage?: string
  itemsPerPage?: string
}
