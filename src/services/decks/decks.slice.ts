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
    setMinCardsCount: (state, action: PayloadAction<number>) => {
      state.minCardsCount = action.payload
    },
    setMaxCardsCount: (state, action: PayloadAction<number>) => {
      state.maxCardsCount = action.payload
    },
    setSearchByName: (state, action: PayloadAction<string>) => {
      state.searchByName = action.payload
    },
    setAuthorId: (state, action: PayloadAction<string>) => {
      state.authorId = action.payload
    },
    setOrderBy: (state, action: PayloadAction<string>) => {
      state.orderBy = action.payload
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload
    },
    setDeckName: (state, action: PayloadAction<string>) => {
      state.deckName = action.payload
    },
    setDeckCover: (state, action: PayloadAction<string>) => {
      state.deckCover = action.payload
    },
    setAuthorName: (state, action: PayloadAction<string>) => {
      state.authorName = action.payload
    },
  },
})
