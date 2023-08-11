import { RootState } from '@/services'

export const cardsSelectors = {
  selectCurrentPage: (state: RootState) => state.cards.currentPage,
  selectItemsPerPage: (state: RootState) => state.cards.itemsPerPage,
  selectSearchByQuestion: (state: RootState) => state.cards.searchByQuestion,
}
