import { baseApi } from '@/services'
import {
  ArgCreateDeck,
  ArgGetDecks,
  CreateDeckResponse,
  DeleteDeckResponse,
} from '@/services/decks/types.ts'
import { GetDecksResponse } from '@/services/types.ts'

export const decksApi = baseApi.injectEndpoints({
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
      deleteDeck: builder.mutation<DeleteDeckResponse, string>({
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

export const {
  useGetDecksQuery,
  useLazyGetDecksQuery,
  useCreateDeckMutation,
  useDeleteDeckMutation,
} = decksApi
