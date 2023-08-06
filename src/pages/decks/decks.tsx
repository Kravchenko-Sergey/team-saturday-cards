import { useState } from 'react'

import s from './decks.module.scss'

import { useGetDecksQuery } from '@/services/base.api.ts'
import { EditOutline, PlayCircleOutline, TrashOutline } from 'assets/icons'
import Button from 'components/ui/button/button.tsx'
import { Slider } from 'components/ui/slider'
import { TabSwitcher, TabSwitcherItem } from 'components/ui/tab-switcher'
import { Table, TableBody, TableCell, TableRow } from 'components/ui/table'
import { Column, Sort, TableHeader } from 'components/ui/table/table-header/table-header.tsx'
import { TextField } from 'components/ui/text-field'
import { Typography } from 'components/ui/typography'

export const Decks = () => {
  const [sort, setSort] = useState<Sort>(null)

  const columns: Column[] = [
    {
      key: 'name',
      title: 'Name',
      isSortable: true,
    },
    {
      key: 'cardsCount',
      title: 'Cards',
      isSortable: true,
    },
    {
      key: 'updated',
      title: 'Last Updated',
      isSortable: true,
    },
    {
      key: 'createdBy',
      title: 'Created by',
      isSortable: true,
    },
    {
      key: 'options',
      title: '',
    },
  ]
  //
  const [values, setValues] = useState<number[]>([25, 100])

  const handleSliderValueChange = (e: any) => {
    setValues(e)
  }

  const handleSliderValueCommitChange = (e: any) => {
    setValues(e)
  }
  //

  const { isLoading, data } = useGetDecksQuery()

  if (isLoading) return <div>Loading...</div>

  return (
    <div className={s.container}>
      <div className={s.titleBlock}>
        <Typography variant="large">Decks list</Typography>
        <Button>Add New Deck</Button>
      </div>
      <div className={s.filtersBlock}>
        <TextField search placeholder="Input search" />
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
          max={100}
          step={1}
        />
        <Button variant="secondary">
          <>
            <TrashOutline /> Clear Filter
          </>
        </Button>
      </div>
      <Table className={s.table}>
        <TableHeader columns={columns} onSort={setSort} sort={sort} />
        <TableBody>
          {data?.items.length === 0 && <div>empty</div>}
          {data?.items.map((deck: any) => (
            <TableRow key={deck.id}>
              <TableCell className={s.tableCell}>{deck.name}</TableCell>
              <TableCell className={s.tableCell}>{deck.cardsCount}</TableCell>
              <TableCell className={s.tableCell}>
                {new Date(deck.updated).toLocaleString('en-GB')}
              </TableCell>
              <TableCell className={s.tableCell}>{deck.author.name}</TableCell>
              <TableCell className={s.tableCell}>
                <div className={s.iconsBlock}>
                  <PlayCircleOutline />
                  <EditOutline />
                  <TrashOutline />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
