import { RootState } from '@/services'

export const decksSelectors = {
  selectItemsPerPage: (state: RootState) => state.decks.itemsPerPage,
  selectSearchByName: (state: RootState) => state.decks.searchByName,
  selectMaxCardsCount: (state: RootState) => state.decks.maxCardsCount,
  selectMinCardsCount: (state: RootState) => state.decks.minCardsCount,
}
