import { FC, useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { useMeQuery } from '@/services/auth/auth.api.ts'
import { useLazyGetCardsQuery } from '@/services/cards'
import { useLazyGetLearnQuery } from '@/services/decks'
import { decksSlice } from '@/services/decks/decks.slice.ts'
import { Deck } from '@/services/types.ts'
import { BlankDeckCover, PlayCircleOutline } from 'assets/icons'
import { Table, TableBody, TableCell, TableRow } from 'components/ui/table'
import { Column, Sort, TableHeader } from 'components/ui/table/table-header'
import { DeleteDeckModal } from 'pages/decks/decks-table/delete-deck-modal'
import { UpdateDeckModal } from 'pages/decks/decks-table/update-deck-modal'
import s from 'pages/decks/decks.module.scss'

type DecksTableProps = {
  data: Deck[] | undefined
  cover: File | null
  setCover: (cover: File | null) => void
}

export const DecksTable: FC<DecksTableProps> = ({ data, cover, setCover }) => {
  const navigate = useNavigate()

  const setOrderBy = (value: string) => dispatch(decksSlice.actions.setOrderBy(value))
  const setAuthorId = (value: string) => dispatch(decksSlice.actions.setAuthorId(value))
  const setDeckName = (value: string) => dispatch(decksSlice.actions.setDeckName(value))
  const setDeckCover = (value: string) => dispatch(decksSlice.actions.setDeckCover(value))
  const setAuthorName = (name: string) => dispatch(decksSlice.actions.setAuthorName(name))
  const dispatch = useDispatch()

  const [getCards] = useLazyGetCardsQuery()
  const [getLearn] = useLazyGetLearnQuery()
  const { currentData } = useMeQuery()

  const handleGetCards = (id: string, userId: string, deckName: string, deckCover: string) => {
    getCards({ id })
      .unwrap()
      .then(() => {
        navigate(`/cards/${id}`)
        setAuthorId(userId)
        setDeckName(deckName)
        setDeckCover(deckCover)
      })
      .catch(error => console.error(error))
  }

  const handleGetLearn = (id: string) => {
    getLearn({ id })
      .unwrap()
      .then(() => {
        navigate(`/learn/${id}`)
      })
      .catch(error => console.error(error))
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
      key: 'created',
      title: 'Created by',
      isSortable: true,
    },
    {
      key: 'options',
      title: '',
    },
  ]

  const handleAuthorName = (userId: string, authorName: string) => {
    setAuthorId(userId)
    setAuthorName(authorName)
  }

  useEffect(() => {
    if (!sort) return
    setOrderBy(`${sort?.key}-${sort?.direction}`)
  })

  return (
    <Table className={s.table}>
      <TableHeader columns={columns} onSort={setSort} sort={sort} />
      <TableBody>
        {data?.map((deck: Deck) => (
          <TableRow key={deck.id}>
            <TableCell
              className={s.tableCell}
              onClick={() => {
                handleGetCards(deck.id, deck.userId, deck.name, deck.cover)
              }}
            >
              <div className={s.nameCell}>
                {deck.cover && <img src={deck.cover} alt={'cover'} className={s.cover} />}
                {!deck.cover && <BlankDeckCover style={{ backgroundColor: 'gray' }} />}
                {deck.name}
              </div>
            </TableCell>
            <TableCell className={s.tableCell}>{deck.cardsCount}</TableCell>
            <TableCell className={s.tableCell}>
              {new Date(deck.updated).toLocaleString('en-GB')}
            </TableCell>
            <TableCell
              className={s.tableCell}
              onClick={() => handleAuthorName(deck.userId, deck.author.name)}
            >
              <div className={s.createdCell}>{deck.author.name}</div>
            </TableCell>
            <TableCell className={s.tableCell}>
              <div className={s.iconsBlock}>
                {deck.cardsCount > 0 && (
                  <Link
                    to={''}
                    onClick={() => {
                      handleGetLearn(deck.id)
                    }}
                  >
                    <PlayCircleOutline />
                  </Link>
                )}
                {deck.author.id === currentData.id && (
                  <>
                    <UpdateDeckModal deckId={deck.id} cover={cover} setCover={setCover} />
                    <DeleteDeckModal deckId={deck.id} />
                  </>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
