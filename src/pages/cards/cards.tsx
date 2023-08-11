import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { z } from 'zod'

import s from './cards.module.scss'

import { useAppSelector } from '@/services'
import { useCreateCardMutation, useGetCardsQuery } from '@/services/cards'
import { cardsSelectors } from '@/services/cards/cards-selectors.ts'
import { cardsSlice } from '@/services/cards/cards.slice.ts'
import { ArrowBackOutline } from 'assets/icons'
import Button from 'components/ui/button/button.tsx'
import { ControlledTextField } from 'components/ui/controlled'
import { Modal } from 'components/ui/modal'
import { Pagination } from 'components/ui/pagination'
import { Select } from 'components/ui/select'
import { TextField } from 'components/ui/text-field'
import { Typography } from 'components/ui/typography'
import { CardsTable } from 'pages/cards/cards-table/cards-table.tsx'

export const Cards = () => {
  const currentPage = useAppSelector(cardsSelectors.selectCurrentPage)
  const itemsPerPage = useAppSelector(cardsSelectors.selectItemsPerPage)
  /*const searchByQuestion = useAppSelector(cardsSelectors.selectSearchByQuestion)*/
  const dispatch = useDispatch()

  const setCurrentPage = (page: number) => dispatch(cardsSlice.actions.setCurrentPage(page))
  const setItemsPerPage = (perPage: string) =>
    dispatch(cardsSlice.actions.setItemsPerPage(Number(perPage)))

  const { id } = useParams()

  const { cards, totalPages } = useGetCardsQuery(
    { id, currentPage, itemsPerPage },
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
        <Typography variant="large">My deck</Typography>
        {cards?.length !== 0 && (
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
      {cards?.length === 0 ? (
        <div className={s.empty}>
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
        </div>
      ) : (
        <>
          <TextField search placeholder="Input search" />
          <CardsTable data={cards} />
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
