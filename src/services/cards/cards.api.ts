import { baseApi } from '@/services'
import { CreateCardResponse, GetCardsResponse } from '@/services/cards'

export const cardsApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getCards: builder.query<GetCardsResponse, string | undefined>({
        query: id => {
          return {
            url: `v1/decks/${id}/cards`,
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
