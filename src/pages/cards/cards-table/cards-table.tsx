import { FC, useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'

import { useAppSelector } from '@/services'
import { Card, useDeleteCardMutation } from '@/services/cards'
import { cardsSlice } from '@/services/cards/cards.slice.ts'
import { decksSelectors } from '@/services/decks/decks-selectors.ts'
import { EditOutline, TrashOutline } from 'assets/icons'
import Button from 'components/ui/button/button.tsx'
import { Grade } from 'components/ui/grade'
import { Modal } from 'components/ui/modal'
import { Table, TableBody, TableCell, TableRow } from 'components/ui/table'
import { Column, Sort, TableHeader } from 'components/ui/table/table-header'
import { Typography } from 'components/ui/typography'
import s from 'pages/cards/cards.module.scss'

type CardsTableProps = { data: any; data2: any }

export const CardsTable: FC<CardsTableProps> = ({ data, data2 }) => {
  const [sort, setSort] = useState<Sort>(null)

  const authorId = useAppSelector(decksSelectors.selectAuthorId)
  const setOrderBy = (value: string) => dispatch(cardsSlice.actions.setOrderBy(value))
  const dispatch = useDispatch()

  const [deleteCard] = useDeleteCardMutation()

  const handleDeleteCard = (id: string) => {
    deleteCard(id)
  }

  const columns: Column[] = [
    {
      key: 'question',
      title: 'Question',
      isSortable: true,
    },
    {
      key: 'answer',
      title: 'Answer',
      isSortable: true,
    },
    {
      key: 'updated',
      title: 'Last Updated',
      isSortable: true,
    },
    {
      key: 'grade',
      title: 'Grade',
    },
    {
      key: 'options',
      title: '',
    },
  ]

  useEffect(() => {
    if (!sort) return
    setOrderBy(`${sort?.key}-${sort?.direction}`)
  })

  return (
    <Table className={s.table}>
      <TableHeader columns={columns} onSort={setSort} sort={sort} />
      <TableBody>
        {data?.map((card: Card) => (
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
              {data2.id === authorId && (
                <div className={s.iconsBlock}>
                  <EditOutline />
                  <Modal
                    trigger={<TrashOutline />}
                    title="Delete Card"
                    footerBtn={
                      <Button onClick={() => handleDeleteCard(card.id)}>Delete Card</Button>
                    }
                  >
                    <Typography>
                      Do you really want to remove Card Name? All cards will be deleted.
                    </Typography>
                  </Modal>
                </div>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
