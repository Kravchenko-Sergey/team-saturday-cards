import { baseApi } from '../base.api.ts'

const decksApi = baseApi.injectEndpoints({
  endpoints: build => ({
    example: build.query({
      query: () => 'test',
    }),
  }),
})

export const { useExampleQuery } = decksApi
