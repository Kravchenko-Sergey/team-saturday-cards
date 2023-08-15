import { baseApi } from '@/services'

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      me: builder.query<any, void>({
        query: () => {
          return {
            url: 'v1/auth/me',
          }
        },
        extraOptions: {
          maxRetries: 0,
        },
        providesTags: ['Me'],
      }),
      login: builder.mutation<any, any>({
        query: params => {
          return {
            url: 'v1/auth/login',
            method: 'POST',
            params,
          }
        },
        invalidatesTags: ['Me'],
      }),
      logout: builder.mutation({
        query: () => {
          return {
            url: 'v1/auth/logout',
            method: 'POST',
          }
        },
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            authApi.util.updateQueryData('me', undefined, () => {
              return null
            })
          )

          try {
            await queryFulfilled
          } catch {
            patchResult.undo()

            /**
             * Alternatively, on failure you can invalidate the corresponding cache tags
             * to trigger a re-fetch:
             * dispatch(api.util.invalidateTags(['Post']))
             */
          }
        },
        invalidatesTags: ['Me'],
      }),
      sendEmail: builder.mutation<void, { html: string; email: string }>({
        query: ({ html, email }) => {
          return {
            url: 'v1/auth/recover-password',
            method: 'POST',
            body: { html, email },
          }
        },
      }),
      resetPassword: builder.mutation<any, { token?: string; password: string }>({
        query: ({ token, password }) => {
          return {
            url: `v1/auth/reset-password/${token}`,
            method: 'POST',
            body: { password },
          }
        },
      }),
    }
  },
})

export const {
  useMeQuery,
  useLoginMutation,
  useLogoutMutation,
  useSendEmailMutation,
  useResetPasswordMutation,
} = authApi
