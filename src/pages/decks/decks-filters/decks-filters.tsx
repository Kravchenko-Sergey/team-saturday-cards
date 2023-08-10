import { ChangeEvent, useState } from 'react'

import { useDebounce } from '@/common/hooks/use-debounse.ts'
import { useAppDispatch, useAppSelector } from '@/services'
import { decksSelectors } from '@/services/decks/decks-selectors.ts'
import { decksSlice } from '@/services/decks/decks.slice.ts'
import { TrashOutline } from 'assets/icons'
import Button from 'components/ui/button/button.tsx'
import { Slider } from 'components/ui/slider'
import { TabSwitcher, TabSwitcherItem } from 'components/ui/tab-switcher'
import { TextField } from 'components/ui/text-field'
import { Typography } from 'components/ui/typography'
import s from 'pages/decks/decks.module.scss'

export const DecksFilters = () => {
  const maxCardsCount = useAppSelector(decksSelectors.selectMaxCardsCount)
  const minCardsCount = useAppSelector(decksSelectors.selectMinCardsCount)
  const dispatch = useAppDispatch()

  const setMaxCardsCount = (value: number) => dispatch(decksSlice.actions.setMaxCardsCount(value))
  const setMinCardsCount = (value: number) => dispatch(decksSlice.actions.setMinCardsCount(value))
  const setSearch = (search: string) => dispatch(decksSlice.actions.setSearchByName(search))
  //searchByName
  const [searchValue, setSearchValue] = useState('')
  const debouncedValue = useDebounce(searchValue, 500)

  setSearch(debouncedValue)
  const handleSearchValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchValue(e.currentTarget.value)
  }
  //slider
  const [values, setValues] = useState<number[]>([minCardsCount, maxCardsCount])

  const handleSliderValueChange = (e: any) => {
    setValues(e)
  }

  const handleSliderValueCommitChange = (e: any) => {
    setValues(e)
    setMaxCardsCount(e[1])
    setMinCardsCount(e[0])
  }
  //clear filter
  const handleClearFilter = () => {
    setSearchValue('')
    setSearch('')
    setValues([0, 11])
    setMaxCardsCount(11)
    setMinCardsCount(0)
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
        <TabSwitcherItem value={'tab1'} className={s.tabsTrigger}>
          <Typography variant="body1">My Decks</Typography>
        </TabSwitcherItem>
        <TabSwitcherItem value={'tab2'} className={s.tabsTrigger}>
          <Typography variant="body1">All Decks</Typography>
        </TabSwitcherItem>
      </TabSwitcher>
      <Slider
        value={values}
        label={'Number of cards'}
        onValueChange={handleSliderValueChange}
        onValueCommit={handleSliderValueCommitChange}
        multiple
        min={0}
        max={11}
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
