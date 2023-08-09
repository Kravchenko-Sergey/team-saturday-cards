import { ChangeEvent, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import s from './decks.module.scss'

import { useDebounce } from '@/common/hooks/use-debounse.ts'
import { useAppDispatch, useAppSelector } from '@/services'
import { useLazyGetCardsQuery } from '@/services/cards'
import { useCreateDeckMutation, useDeleteDeckMutation, useGetDecksQuery } from '@/services/decks'
import { decksSelectors } from '@/services/decks/decks-selectors.ts'
import { decksSlice } from '@/services/decks/decks.slice.ts'
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
  const dispatch = useAppDispatch()
  /*const itemsPerPage = useAppSelector(decksSelectors.selectItemsPerPage)*/
  const searchByName = useAppSelector(decksSelectors.selectSearchByName)
  const maxCardsCount = useAppSelector(decksSelectors.selectMaxCardsCount)
  const minCardsCount = useAppSelector(decksSelectors.selectMinCardsCount)

  /*const setItemPerPage = (itemsPerPage: number) =>
    dispatch(decksSlice.actions.setItemsPerPage(itemsPerPage))*/
  const setSearch = (search: string) => dispatch(decksSlice.actions.setSearchByName(search))
  const setMaxCardsCount = (value: number) => dispatch(decksSlice.actions.setMaxCardsCount(value))
  const setMinCardsCount = (value: number) => dispatch(decksSlice.actions.setMinCardsCount(value))

  //searchByName
  const [searchValue, setSearchValue] = useState('')
  const debouncedValue = useDebounce(searchValue, 500)

  setSearch(debouncedValue)
  const handleSearchValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchValue(e.currentTarget.value)
  }
  const { decks, max, isLoading } = useGetDecksQuery(
    { name: searchByName, maxCardsCount, minCardsCount },
    {
      selectFromResult: ({ data, isLoading }) => {
        return {
          decks: data?.items,
          max: data?.maxCardsCount,
          isLoading,
        }
      },
    }
  )
  //

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
        navigate(`/cards/${id}`)
      })
      .catch(error => console.error(error))
  }
  //clear filter
  const handleClearFilter = () => {
    setSearchValue('')
    setSearch('')
    setValues([0, 11])
    setMaxCardsCount(11)
    setMinCardsCount(0)
  }
  //

  console.log(decks)
  console.log(max)

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
          max={max}
          step={1}
        />
        <Button variant="secondary" onClick={handleClearFilter}>
          <>
            <TrashOutline /> Clear Filter
          </>
        </Button>
      </div>
      {decks?.length === 0 ? (
        <Typography variant={'h2'} className={s.empty}>
          No decks with the entered name were found 😔. Change request parameters
        </Typography>
      ) : (
        <Table className={s.table}>
          <TableHeader columns={columns} onSort={setSort} sort={sort} />
          <TableBody>
            {decks
              ?.map((deck: Deck) => (
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
      )}
    </div>
  )
}

export type Author = {
  id: string
  name: string
}

export type Deck = {
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover?: any
  rating: number
  isDeleted?: any
  isBlocked?: any
  created: string
  updated: string
  cardsCount: number
  author: Author
}
