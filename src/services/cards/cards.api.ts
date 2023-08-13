import { baseApi } from '@/services'
import { CreateCardResponse, GetCardsResponse } from '@/services/cards'

export const cardsApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getCards: builder.query<GetCardsResponse, any>({
        query: ({ id, question, currentPage, itemsPerPage, orderBy }) => {
          return {
            url: `v1/decks/${id}/cards`,
            params: { question, currentPage, itemsPerPage, orderBy },
          }
        },
        providesTags: ['Card'],
      }),
      createCard: builder.mutation<CreateCardResponse, ArgCreateCard>({
        query: ({ id, question, answer }) => {
          return {
            method: 'POST',
            url: `v1/decks/${id}/cards`,
            body: {
              question,
              answer,
            },
          }
        },
        invalidatesTags: ['Card'],
      }),
      deleteCard: builder.mutation<any, string | undefined>({
        query: id => {
          return {
            method: 'DELETE',
            url: `v1/cards/${id}`,
          }
        },
        invalidatesTags: ['Card'],
      }),
    }
  },
})

export const {
  useGetCardsQuery,
  useLazyGetCardsQuery,
  useCreateCardMutation,
  useDeleteCardMutation,
} = cardsApi

export type ArgCreateCard = {
  id: string | undefined
  question: string
  answer: string
  questionImg?: string
  answerImg?: string
  questionVideo?: string
  answerVideo?: string
}

export type ArgGetCards = {
  id: string | undefined
  currentPage?: number
  itemsPerPage?: number
}
