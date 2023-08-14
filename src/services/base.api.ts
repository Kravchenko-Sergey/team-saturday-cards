import { createApi } from '@reduxjs/toolkit/query/react'

import { customFetchBase } from '@/services/decks/base-api-with-refetch.ts'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Deck', 'Card', 'Me'],
  baseQuery: customFetchBase,
  endpoints: () => ({}),
})
