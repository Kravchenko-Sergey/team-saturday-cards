import { useState } from 'react'

import { Link, useParams } from 'react-router-dom'

import s from '@/pages/decks/decks.module.scss'
import { useGetCardsQuery } from '@/services/decks'
import { ArrowBackOutline, EditOutline, TrashOutline } from 'assets/icons'
import Button from 'components/ui/button/button.tsx'
import { Grade } from 'components/ui/grade'
import { Table, TableBody, TableCell, TableRow } from 'components/ui/table'
import { Column, Sort, TableHeader } from 'components/ui/table/table-header'
import { TextField } from 'components/ui/text-field'
import { Typography } from 'components/ui/typography'

export const Cards = () => {
  const { id } = useParams()

  const { data } = useGetCardsQuery(id)

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

  return (
    <div className={s.container}>
      <Button variant={'link'} as={Link} to={'/decks'}>
        <>
          <ArrowBackOutline />
          Back to Packs List
        </>
      </Button>
      <div className={s.titleBlock}>
        <Typography variant="large">My Pack</Typography>
        {data?.items.length !== 0 && <Button>Add New Card</Button>}
      </div>
      {data?.items.length === 0 ? (
        <div className={s.empty}>
          <Typography>This pack is empty. Click add new card to fill this pack</Typography>
          <Button>Add new card</Button>
        </div>
      ) : (
        <>
          <TextField search placeholder="Input search" />
          <Table className={s.table}>
            <TableHeader columns={columns} onSort={setSort} sort={sort} />
            <TableBody>
              {data?.items.map((card: any) => (
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
