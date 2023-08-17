import { ChangeEvent, FC, useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { useAppSelector } from '@/services'
import { useLazyGetCardsQuery } from '@/services/cards'
import {
  useDeleteDeckMutation,
  useLazyGetLearnQuery,
  useUpdateDeckMutation,
} from '@/services/decks'
import { decksSelectors } from '@/services/decks/decks-selectors.ts'
import { decksSlice } from '@/services/decks/decks.slice.ts'
import { Deck } from '@/services/types.ts'
import {
  BlankDeckCover,
  EditOutline,
  ImageOutline,
  PlayCircleOutline,
  TrashOutline,
} from 'assets/icons'
import Button from 'components/ui/button/button.tsx'
import { ControlledCheckbox, ControlledTextField } from 'components/ui/controlled'
import { Modal } from 'components/ui/modal'
import { Table, TableBody, TableCell, TableRow } from 'components/ui/table'
import { Column, Sort, TableHeader } from 'components/ui/table/table-header'
import { Typography } from 'components/ui/typography'
import s from 'pages/decks/decks.module.scss'

type DecksTableProps = {
  data: Deck[] | undefined
  cover: any
  setCover: any
}

export const DecksTable: FC<DecksTableProps> = ({ data, cover, setCover }) => {
  const navigate = useNavigate()

  const setOrderBy = (value: string) => dispatch(decksSlice.actions.setOrderBy(value))
  const setAuthorId = (value: string) => dispatch(decksSlice.actions.setAuthorId(value))
  const setDeckName = (value: string) => dispatch(decksSlice.actions.setDeckName(value))
  const setDeckCover = (value: string) => dispatch(decksSlice.actions.setDeckCover(value))
  const authorId = useAppSelector(decksSelectors.selectAuthorId)
  const dispatch = useDispatch()

  const [getCards] = useLazyGetCardsQuery()
  const [deleteDeck] = useDeleteDeckMutation()
  const [getLearn] = useLazyGetLearnQuery()

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
      key: 'created',
      title: 'Created by',
      isSortable: true,
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
  //changeDeck
  const [updateDeck] = useUpdateDeckMutation()
  const handleChangeCover = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]

    setCover(file)
  }

  const updateDeckSchema = z.object({
    name: z.string().min(3).max(30),
    isPrivate: z.any(),
  })

  type UpdateDeck = z.infer<typeof updateDeckSchema>

  const { control, handleSubmit, getValues } = useForm<UpdateDeck>({
    resolver: zodResolver(updateDeckSchema),
    defaultValues: {
      name: '',
      isPrivate: false,
    },
  })

  const handleUpdate = (id: string) => {
    const form = new FormData()

    form.append('name', getValues().name)
    form.append('isPrivate', getValues().isPrivate)
    cover && form.append('cover', cover)

    updateDeck({ id, form })
  }

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
                {deck.cover ? (
                  <img src={deck.cover} alt={'cover'} className={s.cover} />
                ) : (
                  <BlankDeckCover style={{ backgroundColor: 'gray' }} />
                )}
                {deck.name}
              </div>
            </TableCell>
            <TableCell className={s.tableCell}>{deck.cardsCount}</TableCell>
            <TableCell className={s.tableCell}>
              {new Date(deck.updated).toLocaleString('en-GB')}
            </TableCell>
            <TableCell className={s.tableCell}>{deck.author.name}</TableCell>
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
                {deck.author.id === authorId && (
                  <>
                    <Modal
                      trigger={<EditOutline />}
                      title="Update deck"
                      footerBtn={
                        <Button onClick={handleSubmit(() => handleUpdate(deck.id))}>
                          Save changes
                        </Button>
                      }
                    >
                      <div className={s.coverModal}>
                        {cover ? (
                          <img className={s.img} src={URL.createObjectURL(cover)} alt="cover" />
                        ) : (
                          <BlankDeckCover />
                        )}
                      </div>
                      <label htmlFor="change-cover" className={s.fileLabel}>
                        <Button as={'a'} variant="secondary" fullWidth>
                          <ImageOutline />
                          <Typography as="span" variant="subtitle2">
                            Change Cover
                          </Typography>
                        </Button>
                        <input
                          id="change-cover"
                          type="file"
                          accept="image/*"
                          onChange={handleChangeCover}
                          style={{ display: 'none' }}
                        />
                      </label>
                      <form onSubmit={handleSubmit(() => handleUpdate(deck.id))} className={s.form}>
                        <ControlledTextField name="name" control={control} label="Name deck" />
                        <ControlledCheckbox
                          name="isPrivate"
                          control={control}
                          label="Private deck"
                        />
                      </form>
                    </Modal>
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
