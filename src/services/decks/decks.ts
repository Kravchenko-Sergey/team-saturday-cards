import { baseApi } from '@/services/base-api.ts'
import { DecksResponse, GetDecksArgs } from '@/services/decks/types.ts'

const decksApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDecks: builder.query<DecksResponse, GetDecksArgs>({
        query: args => {
          return {
            url: `v1/decks`,
            method: 'GET',
            params: args,
          }
        },
      }),
    }
  },
})

export const { useGetDecksQuery } = decksApi
