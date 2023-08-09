import { RootState } from '@/services'

export const decksSelectors = {
  selectItemsPerPage: (state: RootState) => state.decks.itemsPerPage,
  selectSearchByName: (state: RootState) => state.decks.searchByName,
}
