import { FC, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { useLazyGetCardsQuery } from '@/services/cards'
import { useDeleteDeckMutation } from '@/services/decks'
import { Deck } from '@/services/types.ts'
import { EditOutline, PlayCircleOutline, TrashOutline } from 'assets/icons'
import Button from 'components/ui/button/button.tsx'
import { Modal } from 'components/ui/modal'
import { Table, TableBody, TableCell, TableRow } from 'components/ui/table'
import { Column, Sort, TableHeader } from 'components/ui/table/table-header'
import { Typography } from 'components/ui/typography'
import s from 'pages/decks/decks.module.scss'

type DecksTableProps = {
  data: Deck[] | undefined
}

export const DecksTable: FC<DecksTableProps> = ({ data }) => {
  const navigate = useNavigate()

  const [getCards] = useLazyGetCardsQuery()
  const [deleteDeck] = useDeleteDeckMutation()

  const handleGetCards = (id: string) => {
    getCards({ id })
      .unwrap()
      .then(() => {
        navigate(`/cards/${id}`)
      })
      .catch(error => console.error(error))
  }

  const handleDeleteDeck = (id: string) => {
    deleteDeck(id)
  }

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

  return (
    <Table className={s.table}>
      <TableHeader columns={columns} onSort={setSort} sort={sort} />
      <TableBody>
        {data?.map((deck: Deck) => (
          <TableRow key={deck.id}>
            <TableCell
              className={s.tableCell}
              onClick={() => {
                handleGetCards(deck.id)
              }}
            >
              {deck.name}
            </TableCell>
            <TableCell className={s.tableCell}>{deck.cardsCount}</TableCell>
            <TableCell className={s.tableCell}>
              {new Date(deck.updated).toLocaleString('en-GB')}
            </TableCell>
            <TableCell className={s.tableCell}>{deck.author.name}</TableCell>
            <TableCell className={s.tableCell}>
              <div className={s.iconsBlock}>
                <PlayCircleOutline />
                <EditOutline />
                <Modal
                  trigger={<TrashOutline />}
                  title="Delete deck"
                  footerBtn={
                    <Button
                      onClick={() => {
                        handleDeleteDeck(deck.id)
                      }}
                    >
                      Delete deck
                    </Button>
                  }
                >
                  <>
                    <Typography>
                      Do you really want to remove Pack Name? All cards will be deleted.
                    </Typography>
                  </>
                </Modal>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
