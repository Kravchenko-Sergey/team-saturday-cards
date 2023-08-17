import { ChangeEvent, useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { z } from 'zod'

import s from './cards.module.scss'

import { useDebounce } from '@/common/hooks/use-debounse.ts'
import { useAppSelector } from '@/services'
import { useMeQuery } from '@/services/auth/auth.api.ts'
import { useCreateCardMutation, useGetCardsQuery } from '@/services/cards'
import { cardsSelectors } from '@/services/cards/cards-selectors.ts'
import { cardsSlice } from '@/services/cards/cards.slice.ts'
import { decksSelectors } from '@/services/decks/decks-selectors.ts'
import {
  ArrowBackOutline,
  BlankDeckCover,
  EditOutline,
  MoreVerticalOutline,
  PlayCircleOutline,
  TrashOutline,
} from 'assets/icons'
import Button from 'components/ui/button/button.tsx'
import { ControlledTextField } from 'components/ui/controlled'
import { Dropdown, DropdownItemWithIcon } from 'components/ui/dropdown'
import { Modal } from 'components/ui/modal'
import { Pagination } from 'components/ui/pagination'
import { Select } from 'components/ui/select'
import { TextField } from 'components/ui/text-field'
import { Typography } from 'components/ui/typography'
import { CardsTable } from 'pages/cards/cards-table/cards-table.tsx'

export const Cards = () => {
  const currentPage = useAppSelector(cardsSelectors.selectCurrentPage)
  const itemsPerPage = useAppSelector(cardsSelectors.selectItemsPerPage)
  const searchByQuestion = useAppSelector(cardsSelectors.selectSearchByQuestion)
  const orderBy = useAppSelector(cardsSelectors.selectOrderBy)
  const authorId = useAppSelector(decksSelectors.selectAuthorId)
  const deckName = useAppSelector(decksSelectors.selectDeckName)
  const deckCover = useAppSelector(decksSelectors.selectDeckCover)
  const dispatch = useDispatch()

  const setCurrentPage = (page: number) => dispatch(cardsSlice.actions.setCurrentPage(page))
  const setItemsPerPage = (perPage: string) =>
    dispatch(cardsSlice.actions.setItemsPerPage(Number(perPage)))
  const setSearch = (search: string) => dispatch(cardsSlice.actions.setSearchByQuestion(search))

  const { id } = useParams()

  const { cards, totalPages } = useGetCardsQuery(
    { id, question: searchByQuestion, currentPage, itemsPerPage, orderBy },
    {
      selectFromResult: ({ data, isLoading }) => {
        return {
          cards: data?.items,
          totalPages: data?.pagination.totalPages,
          isLoading,
        }
      },
    }
  )
  const { data: data2 } = useMeQuery()

  const newCardSchema = z.object({
    question: z.string().min(3).max(30),
    answer: z.string().min(3).max(30),
  })

  type NewCard = z.infer<typeof newCardSchema>

  const { control, handleSubmit, getValues } = useForm<NewCard>({
    resolver: zodResolver(newCardSchema),
    defaultValues: {
      question: '',
      answer: '',
    },
  })

  const [createCard] = useCreateCardMutation()

  const handleCreateCard = () => {
    const newCard = {
      question: getValues().question,
      answer: getValues().answer,
    }

    createCard({ id, question: newCard.question, answer: newCard.answer })
  }

  //searchByQuestion
  const [searchValue, setSearchValue] = useState('')
  const debouncedValue = useDebounce(searchValue, 500)

  useEffect(() => {
    setSearch(debouncedValue)
    setCurrentPage(1)
  }, [debouncedValue])

  const handleSearchValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchValue(e.currentTarget.value)
  }
  //pagination
  const handleCurrentPage = (e: number) => setCurrentPage(e)
  const handleItemsPerPage = (e: string) => setItemsPerPage(e)

  return (
    <div className={s.container}>
      <Button variant={'link'} as={Link} to={'/'}>
        <>
          <ArrowBackOutline />
          Back to Decks List
        </>
      </Button>
      <div className={s.titleBlock}>
        <div className={s.deckName}>
          <Typography variant="large">{deckName}</Typography>
          {cards?.length !== 0 && data2.id === authorId && (
            <Dropdown trigger={<MoreVerticalOutline />}>
              <>
                <DropdownItemWithIcon icon={<PlayCircleOutline />} text={'Learn'} />
                <DropdownItemWithIcon icon={<EditOutline />} text={'Edit'} />
                <DropdownItemWithIcon icon={<TrashOutline />} text={'Delete'} />
              </>
            </Dropdown>
          )}
          {cards?.length === 0 && data2.id === authorId && (
            <Dropdown trigger={<MoreVerticalOutline />}>
              <>
                <DropdownItemWithIcon icon={<EditOutline />} text={'Edit'} />
                <DropdownItemWithIcon icon={<TrashOutline />} text={'Delete'} />
              </>
            </Dropdown>
          )}
          {cards?.length !== 0 && data2.id !== authorId && (
            <Dropdown trigger={<MoreVerticalOutline />}>
              <DropdownItemWithIcon icon={<PlayCircleOutline />} text={'Learn'} />
            </Dropdown>
          )}
        </div>
        {cards?.length !== 0 && data2.id === authorId && (
          <Modal
            trigger={<Button>Add new card</Button>}
            title={'Add New Card'}
            footerBtn={<Button onClick={handleSubmit(handleCreateCard)}>Add New Card</Button>}
          >
            <Select
              label="Choose a question format"
              defaultValue="Text"
              options={[
                { label: 'Text', value: 'Text' },
                { label: 'Image', value: 'Image' },
              ]}
            />
            <form onSubmit={handleSubmit(handleCreateCard)}>
              <ControlledTextField label="Question" name="question" control={control} />
              <ControlledTextField label="Answer" name="answer" control={control} />
            </form>
          </Modal>
        )}
      </div>
      <div style={{ marginBottom: '25px' }}>
        {deckCover ? (
          <img src={deckCover} alt="cover" className={s.cover} />
        ) : (
          <BlankDeckCover style={{ backgroundColor: 'gray' }} />
        )}
      </div>
      {cards?.length === 0 ? (
        <div className={s.empty}>
          {data2.id === authorId && (
            <>
              <Typography>This deck is empty. Click add new card to fill this deck</Typography>
              <Modal
                trigger={<Button>Add new card</Button>}
                title={'Add New Card'}
                footerBtn={<Button onClick={handleSubmit(handleCreateCard)}>Add New Card</Button>}
              >
                <Select
                  label="Choose a question format"
                  defaultValue="Text"
                  options={[
                    { label: 'Text', value: 'Text' },
                    { label: 'Image', value: 'Image' },
                  ]}
                />
                <form onSubmit={handleSubmit(handleCreateCard)}>
                  <ControlledTextField label="Question" name="question" control={control} />
                  <ControlledTextField label="Answer" name="answer" control={control} />
                </form>
              </Modal>
            </>
          )}
          {data2.id !== authorId && (
            <Typography>
              This deck is empty. The creator of this deck has not added cards yet
            </Typography>
          )}
        </div>
      ) : (
        <>
          <TextField
            value={searchValue}
            onChange={handleSearchValue}
            search
            placeholder="Input search"
          />
          <CardsTable data={cards} data2={data2} />
          <Pagination
            count={totalPages ? totalPages : 100}
            page={currentPage}
            onChange={e => handleCurrentPage(e)}
            perPage={String(itemsPerPage)}
            onPerPageChange={e => handleItemsPerPage(e)}
            perPageOptions={[10, 20, 30]}
          />
        </>
      )}
    </div>
  )
}
