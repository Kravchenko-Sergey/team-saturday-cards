import { baseApi } from '@/services'
import { GetCardsResponse } from '@/services/cards'

export const cardsApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
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

export const { useGetCardsQuery, useLazyGetCardsQuery } = cardsApi
