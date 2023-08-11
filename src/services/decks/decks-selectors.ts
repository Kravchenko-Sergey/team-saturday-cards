import { RootState } from '@/services'

export const decksSelectors = {
  selectCurrentPage: (state: RootState) => state.decks.currentPage,
  selectItemsPerPage: (state: RootState) => state.decks.itemsPerPage,
  selectSearchByName: (state: RootState) => state.decks.searchByName,
  selectMaxCardsCount: (state: RootState) => state.decks.maxCardsCount,
  selectMinCardsCount: (state: RootState) => state.decks.minCardsCount,
  selectOrderBy: (state: RootState) => state.decks.orderBy,
}
