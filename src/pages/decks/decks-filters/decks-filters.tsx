import { ChangeEvent, FC, useState } from 'react'

import { useSelector } from 'react-redux'

import { useAppDispatch } from '@/services'
import { useMeQuery } from '@/services/auth/auth.api.ts'
import { decksSelectors } from '@/services/decks/decks-selectors.ts'
import { decksSlice } from '@/services/decks/decks.slice.ts'
import { TrashOutline } from 'assets/icons'
import Button from 'components/ui/button/button.tsx'
import { Slider } from 'components/ui/slider'
import { TabSwitcher, TabSwitcherItem } from 'components/ui/tab-switcher'
import { TextField } from 'components/ui/text-field'
import { Typography } from 'components/ui/typography'
import s from 'pages/decks/decks.module.scss'

type DecksFiltersProps = {
  searchValue: string
  setSearchValue: (searchValue: string) => void
  handleSearchValue: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export const DecksFilters: FC<DecksFiltersProps> = ({
  searchValue,
  setSearchValue,
  handleSearchValue,
}) => {
  const maxCardsCount = useSelector(decksSelectors.selectMaxCardsCount)
  const minCardsCount = useSelector(decksSelectors.selectMinCardsCount)
  const authorId = useSelector(decksSelectors.selectAuthorId)
  const authorName = useSelector(decksSelectors.selectAuthorName)
  const dispatch = useAppDispatch()

  const setCurrentPage = (page: number) => dispatch(decksSlice.actions.setCurrentPage(page))
  const setMaxCardsCount = (value: number) => dispatch(decksSlice.actions.setMaxCardsCount(value))
  const setMinCardsCount = (value: number) => dispatch(decksSlice.actions.setMinCardsCount(value))
  const setAuthorId = (id: string) => dispatch(decksSlice.actions.setAuthorId(id))
  const setSearch = (search: string) => dispatch(decksSlice.actions.setSearchByName(search))

  const [values, setValues] = useState<number[]>([minCardsCount, maxCardsCount])

  const { data } = useMeQuery()

  const getMyDecks = () => {
    setAuthorId(data.id)
  }

  const getAllDecks = () => {
    setAuthorId('')
  }

  const handleSliderValueChange = (e: number[]) => {
    setValues(e)
  }

  const handleSliderValueCommitChange = (e: number[]) => {
    setValues(e)
    setMaxCardsCount(e[1])
    setMinCardsCount(e[0])
    setCurrentPage(1)
  }

  const handleClearFilter = () => {
    setSearchValue('')
    setSearch('')
    setValues([0, 14])
    setMaxCardsCount(14)
    setMinCardsCount(0)
    setCurrentPage(1)
  }

  return (
    <div className={s.filtersBlock}>
      <TextField
        value={searchValue}
        onChange={handleSearchValue}
        search
        placeholder="Input search"
      />
      <TabSwitcher label="Show packs decks">
        <TabSwitcherItem value={'tab1'} onClick={getMyDecks} className={s.tabsTrigger}>
          <Typography variant="body1">My Decks</Typography>
        </TabSwitcherItem>
        <TabSwitcherItem value={'tab2'} onClick={getAllDecks} className={s.tabsTrigger}>
          <Typography variant="body1">
            {authorId !== '' && authorId !== data.id
              ? `${authorName.split(/[ _-]/)[0]}`
              : 'All Decks'}
          </Typography>
        </TabSwitcherItem>
      </TabSwitcher>
      <Slider
        value={values}
        label={'Number of cards'}
        onValueChange={handleSliderValueChange}
        onValueCommit={handleSliderValueCommitChange}
        multiple
        min={0}
        max={14}
        step={1}
      />
      <Button variant="secondary" onClick={handleClearFilter}>
        <>
          <TrashOutline /> Clear Filter
        </>
      </Button>
    </div>
  )
}
