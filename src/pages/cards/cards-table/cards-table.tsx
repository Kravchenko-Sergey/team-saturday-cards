import { FC, useState } from 'react'

import { Card, useDeleteCardMutation } from '@/services/cards'
import { EditOutline, TrashOutline } from 'assets/icons'
import Button from 'components/ui/button/button.tsx'
import { Grade } from 'components/ui/grade'
import { Modal } from 'components/ui/modal'
import { Table, TableBody, TableCell, TableRow } from 'components/ui/table'
import { Column, Sort, TableHeader } from 'components/ui/table/table-header'
import { Typography } from 'components/ui/typography'
import s from 'pages/cards/cards.module.scss'

type CardsTableProps = { data: any }

export const CardsTable: FC<CardsTableProps> = ({ data }) => {
  const [sort, setSort] = useState<Sort>(null)

  const [deleteCard] = useDeleteCardMutation()

  const handleDeleteCard = (id: string) => {
    deleteCard(id)
  }

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
              <div className={s.iconsBlock}>
                <EditOutline />
                <Modal
                  trigger={<TrashOutline />}
                  title="Delete Card"
                  footerBtn={<Button onClick={() => handleDeleteCard(card.id)}>Delete Card</Button>}
                >
                  <Typography>
                    Do you really want to remove Card Name? All cards will be deleted.
                  </Typography>
                </Modal>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
