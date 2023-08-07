import { baseApi } from '@/services'
import {
  ArgCreateDeck,
  CreateDeckResponse,
  DeleteDeckResponse,
  GetCardsResponse,
} from '@/services/decks/types.ts'

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
      getCards: builder.query<GetCardsResponse, string | undefined>({
        query: id => {
          console.log(id)

          return {
            url: `v1/decks/${id}/cards`,
          }
        },
      }),
    }
  },
})

export const {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetCardsQuery,
  useLazyGetCardsQuery,
} = decksApi
