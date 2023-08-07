import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import s from './decks.module.scss'

import { useGetDecksQuery } from '@/services/base.api.ts'
import {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useLazyGetCardsQuery,
} from '@/services/decks'
import { EditOutline, PlayCircleOutline, TrashOutline } from 'assets/icons'
import Button from 'components/ui/button/button.tsx'
import { ControlledCheckbox, ControlledTextField } from 'components/ui/controlled'
import { Modal } from 'components/ui/modal'
import { Slider } from 'components/ui/slider'
import { TabSwitcher, TabSwitcherItem } from 'components/ui/tab-switcher'
import { Table, TableBody, TableCell, TableRow } from 'components/ui/table'
import { Column, Sort, TableHeader } from 'components/ui/table/table-header/table-header.tsx'
import { TextField } from 'components/ui/text-field'
import { Typography } from 'components/ui/typography'

export const Decks = () => {
  const navigate = useNavigate()
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

  const newDeckSchema = z.object({
    cover: z.instanceof(File).optional(),
    name: z.string().min(3).max(30),
    isPrivate: z.boolean(),
  })

  type NewDeck = z.infer<typeof newDeckSchema>

  const { control, handleSubmit, getValues } = useForm<NewDeck>({
    resolver: zodResolver(newDeckSchema),
    defaultValues: {
      name: '',
      isPrivate: false,
    },
  })

  const { isLoading, data } = useGetDecksQuery()
  const [createDeck] = useCreateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()
  const [getCards] = useLazyGetCardsQuery()

  if (isLoading) return <div>Loading...</div>

  const handleCreateDeck = () => {
    const newDeck = {
      cover: String(getValues().cover),
      name: getValues().name,
      isPrivate: getValues().isPrivate,
    }

    createDeck(newDeck)
  }

  const handleDeleteDeck = (id: string) => {
    deleteDeck(id)
  }

  const handleGetCards = (id: string) => {
    getCards(id)
      .unwrap()
      .then(() => {
        navigate(`/${id}/cards`)
      })
      .catch(error => console.log(error))
  }

  return (
    <div className={s.container}>
      <div className={s.titleBlock}>
        <Typography variant="large">Decks list</Typography>
        <Modal
          trigger={<Button>Add New Deck</Button>}
          title="Add new deck "
          footerBtn={<Button onClick={handleSubmit(handleCreateDeck)}>Add new deck</Button>}
        >
          <form onSubmit={handleSubmit(handleCreateDeck)}>
            <ControlledTextField name="name" control={control} label="Name deck" />
            <ControlledCheckbox name="isPrivate" control={control} label="Private deck" />
          </form>
        </Modal>
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
          {data?.items
            .map((deck: any) => (
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
            ))
            .reverse()}
        </TableBody>
      </Table>
    </div>
  )
}
