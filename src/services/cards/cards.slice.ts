import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    searchByQuestion: '',
    currentPage: 1,
    itemsPerPage: 10,
    orderBy: '',
  },
  reducers: {
    setSearchByQuestion: (state, action: PayloadAction<string>) => {
      state.searchByQuestion = action.payload
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload
    },
    setOrderBy: (state, action: PayloadAction<string>) => {
      state.orderBy = action.payload
    },
  },
})
