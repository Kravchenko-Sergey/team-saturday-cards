import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const decksSlice = createSlice({
  name: 'decks',
  initialState: {
    minCardsCount: 0,
    maxCardsCount: 14,
    searchByName: '',
    authorId: '',
    orderBy: 'created-desc',
    currentPage: 1,
    itemsPerPage: 4,
    deckName: '',
    deckCover: '',
    authorName: '',
  },
  reducers: {
    setMinCardsCount: (state, action: PayloadAction<{ minCount: number }>) => {
      state.minCardsCount = action.payload.minCount
    },
    setMaxCardsCount: (state, action: PayloadAction<{ maxCount: number }>) => {
      state.maxCardsCount = action.payload.maxCount
    },
    setSearchByName: (state, action: PayloadAction<{ search: string }>) => {
      state.searchByName = action.payload.search
    },
    setAuthorId: (state, action: PayloadAction<{ id: string }>) => {
      state.authorId = action.payload.id
    },
    setOrderBy: (state, action: PayloadAction<{ orderBy: string }>) => {
      state.orderBy = action.payload.orderBy
    },
    setCurrentPage: (state, action: PayloadAction<{ page: number }>) => {
      state.currentPage = action.payload.page
    },
    setItemsPerPage: (state, action: PayloadAction<{ perPage: number }>) => {
      state.itemsPerPage = action.payload.perPage
    },
    setDeckName: (state, action: PayloadAction<{ name: string }>) => {
      state.deckName = action.payload.name
    },
    setDeckCover: (state, action: PayloadAction<{ cover: string }>) => {
      state.deckCover = action.payload.cover
    },
    setAuthorName: (state, action: PayloadAction<{ name: string }>) => {
      state.authorName = action.payload.name
    },
  },
})

export const {
  setMinCardsCount,
  setMaxCardsCount,
  setSearchByName,
  setAuthorId,
  setOrderBy,
  setCurrentPage,
  setItemsPerPage,
  setDeckName,
  setDeckCover,
  setAuthorName,
} = decksSlice.actions
