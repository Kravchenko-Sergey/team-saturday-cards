import { useState } from 'react'

import { Link, useParams } from 'react-router-dom'

import s from './cards.module.scss'
import { Card, useGetCardsQuery } from '@/services/cards'
import { ArrowBackOutline, EditOutline, TrashOutline } from 'assets/icons'
import Button from 'components/ui/button/button.tsx'
import { Grade } from 'components/ui/grade'
import { Table, TableBody, TableCell, TableRow } from 'components/ui/table'
import { Column, Sort, TableHeader } from 'components/ui/table/table-header'
import { TextField } from 'components/ui/text-field'
import { Typography } from 'components/ui/typography'

export const Cards = () => {
  const { id } = useParams()

  const { cards } = useGetCardsQuery(id, {
    selectFromResult: ({ data }) => {
      return {
        cards: data?.items,
      }
    },
  })

  const [sort, setSort] = useState<Sort>(null)

  const columns: Column[] = [
    {
      key: 'Question',
      title: 'Question',
      isSortable: true,
    },
    {
      key: 'Answer',
      title: 'Answer',
      isSortable: true,
    },
    {
      key: 'Last Updated',
      title: 'Last Updated',
      isSortable: true,
    },
    {
      key: 'Grade',
      title: 'Grade',
    },
    {
      key: 'options',
      title: '',
    },
  ]

  console.log(cards)

  return (
    <div className={s.container}>
      <Button variant={'link'} as={Link} to={'/'}>
        <>
          <ArrowBackOutline />
          Back to Decks List
        </>
      </Button>
      <div className={s.titleBlock}>
        <Typography variant="large">My deck</Typography>
        {cards?.length !== 0 && <Button>Add New Card</Button>}
      </div>
      {cards?.length === 0 ? (
        <div className={s.empty}>
          <Typography>This deck is empty. Click add new card to fill this deck</Typography>
          <Button>Add new card</Button>
        </div>
      ) : (
        <>
          <TextField search placeholder="Input search" />
          <Table className={s.table}>
            <TableHeader columns={columns} onSort={setSort} sort={sort} />
            <TableBody>
              {cards?.map((card: Card) => (
                <TableRow key={card.id}>
                  <TableCell className={s.tableCell}>{card.question}</TableCell>
                  <TableCell className={s.tableCell}>{card.answer}</TableCell>
                  <TableCell className={s.tableCell}>
                    {new Date(card.updated).toLocaleString('en-GB')}
                  </TableCell>
                  <TableCell className={s.tableCell}>
                    <Grade value={card.grade} onClick={() => {}} />
                  </TableCell>
                  <TableCell className={s.tableCell}>
                    <div className={s.iconsBlock}>
                      <EditOutline />
                      <TrashOutline />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  )
}
