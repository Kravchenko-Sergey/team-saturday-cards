import { ChangeEvent, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import s from './decks.module.scss'

import { useDebounce } from '@/common/hooks/use-debounse'
import { useMeQuery } from '@/services/auth/auth.api'
import { useGetDecksQuery } from '@/services/decks'
import { decksSelectors } from '@/services/decks/decks-selectors.ts'
import { decksSlice } from '@/services/decks/decks.slice.ts'
import { Pagination } from 'components/ui/pagination'
import { Typography } from 'components/ui/typography'
import { CreateDeckModal } from 'pages/decks/create-deck-modal'
import { DecksFilters } from 'pages/decks/decks-filters'
import { DecksTable } from 'pages/decks/decks-table'

export const Decks = () => {
  const [cover, setCover] = useState<File | null>(null)
  const currentPage = useSelector(decksSelectors.selectCurrentPage)
  const itemsPerPage = useSelector(decksSelectors.selectItemsPerPage)
  const maxCardsCount = useSelector(decksSelectors.selectMaxCardsCount)
  const minCardsCount = useSelector(decksSelectors.selectMinCardsCount)
  const orderBy = useSelector(decksSelectors.selectOrderBy)
  const authorId = useSelector(decksSelectors.selectAuthorId)
  const dispatch = useDispatch()

  const [searchValue, setSearchValue] = useState('')
  const debouncedValue = useDebounce(searchValue, 500)

  const handleSearchValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchValue(e.currentTarget.value)
    setSearch(e.currentTarget.value)
    setCurrentPage(1)
  }

  const setCurrentPage = (page: number) => dispatch(decksSlice.actions.setCurrentPage(page))
  const setItemsPerPage = (perPage: string) =>
    dispatch(decksSlice.actions.setItemsPerPage(Number(perPage)))
  const setSearch = (search: string) => dispatch(decksSlice.actions.setSearchByName(search))

  const { currentData } = useMeQuery()
  const { decks, totalPages, isLoading, isFetching } = useGetDecksQuery(
    {
      name: debouncedValue,
      maxCardsCount,
      minCardsCount,
      currentPage,
      itemsPerPage,
      orderBy,
      authorId,
    },
    {
      selectFromResult: ({ currentData: data, isLoading, isFetching }) => {
        return {
          decks: data?.items,
          totalPages: data?.pagination.totalPages,
          max: data?.maxCardsCount,
          isLoading,
          isFetching,
        }
      },
    }
  )

  const handleCurrentPage = (e: number) => setCurrentPage(e)
  const handleItemsPerPage = (e: string) => setItemsPerPage(e)

  if (isLoading || isFetching) return <span className={s.loader}></span>

  return (
    <div className={s.container}>
      <div className={s.titleBlock}>
        <Typography variant="large">Decks list</Typography>
        <CreateDeckModal cover={cover} setCover={setCover} />
      </div>
      <DecksFilters
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleSearchValue={handleSearchValue}
      />
      {decks?.length !== 0 && (
        <>
          <DecksTable data={decks} cover={cover} setCover={setCover} />
          <Pagination
            count={totalPages ? totalPages : 100}
            page={currentPage}
            onChange={e => handleCurrentPage(e)}
            perPage={String(itemsPerPage)}
            onPerPageChange={e => handleItemsPerPage(e)}
            perPageOptions={[4, 8, 16]}
          />
        </>
      )}
      {decks?.length === 0 && authorId !== currentData.id && (
        <Typography variant={'h2'} className={s.empty}>
          No decks with the entered name were found 😔. Change request parameters
        </Typography>
      )}
      {decks?.length === 0 && authorId === currentData.id && (
        <Typography variant={'h2'} className={s.empty}>
          You have not created any decks yet
        </Typography>
      )}
    </div>
  )
}
