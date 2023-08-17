import { baseApi, RootState } from '@/services'
import { ArgGetLearn, ArgSaveGrade, GetLearnResponse, SaveGradeResponse } from '@/services/cards'
import { ArgGetDecks, CreateDeckResponse, DeleteDeckResponse } from '@/services/decks/types.ts'
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
      createDeck: builder.mutation<CreateDeckResponse, FormData>({
        query: formData => {
          return {
            method: 'POST',
            url: 'v1/decks',
            body: formData,
          }
        },
        async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
          const state = getState() as RootState
          const {
            searchByName,
            orderBy,
            maxCardsCount,
            minCardsCount,
            authorId,
            itemsPerPage,
            currentPage,
          } = state.decks

          try {
            const res = await queryFulfilled

            dispatch(
              decksApi.util.updateQueryData(
                'getDecks',
                {
                  name: searchByName,
                  orderBy,
                  maxCardsCount,
                  minCardsCount,
                  authorId,
                  itemsPerPage,
                  currentPage,
                },
                draft => {
                  draft.items.push()
                  draft.items.unshift(res.data)
                }
              )
            )
          } catch {
            // patchResult.undo()
            /**
             * Alternatively, on failure you can invalidate the corresponding cache tags
             * to trigger a re-fetch:
             * dispatch(api.util.invalidateTags(['Post']))
             */
          }
        },
        invalidatesTags: ['Deck'],
      }),
      updateDeck: builder.mutation<DeleteDeckResponse, any>({
        query: ({ id, form }) => {
          return {
            method: 'PATCH',
            url: `v1/decks/${id}`,
            body: form,
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
        async onQueryStarted(id, { dispatch, getState, queryFulfilled }) {
          const state = getState() as RootState
          const {
            searchByName,
            orderBy,
            maxCardsCount,
            minCardsCount,
            authorId,
            itemsPerPage,
            currentPage,
          } = state.decks

          dispatch(
            decksApi.util.updateQueryData(
              'getDecks',
              {
                name: searchByName,
                orderBy,
                maxCardsCount,
                minCardsCount,
                authorId,
                itemsPerPage,
                currentPage,
              },
              draft => {
                draft.items = draft.items.filter(deck => deck.id !== id)
              }
            )
          )
          try {
            await queryFulfilled
          } catch {
            // patchResult.undo()
            /**
             * Alternatively, on failure you can invalidate the corresponding cache tags
             * to trigger a re-fetch:
             * dispatch(api.util.invalidateTags(['Post']))
             */
          }
        },
        invalidatesTags: ['Deck'],
      }),
      getLearn: builder.query<GetLearnResponse, ArgGetLearn>({
        query: ({ id }) => {
          return {
            url: `v1/decks/${id}/learn`,
          }
        },
      }),
      saveGrade: builder.mutation<SaveGradeResponse, ArgSaveGrade>({
        query: ({ id, cardId, grade }) => {
          return {
            method: 'POST',
            url: `v1/decks/${id}/learn`,
            body: {
              cardId,
              grade,
            },
          }
        },
      }),
    }
  },
})

export const {
  useGetDecksQuery,
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetLearnQuery,
  useLazyGetLearnQuery,
  useSaveGradeMutation,
  useUpdateDeckMutation,
} = decksApi
