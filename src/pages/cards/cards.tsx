import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'
import { z } from 'zod'

import s from './cards.module.scss'

import {
  Card,
  useCreateCardMutation,
  useDeleteCardMutation,
  useGetCardsQuery,
} from '@/services/cards'
import { ArrowBackOutline, EditOutline, TrashOutline } from 'assets/icons'
import Button from 'components/ui/button/button.tsx'
import { ControlledTextField } from 'components/ui/controlled'
import { Grade } from 'components/ui/grade'
import { Modal } from 'components/ui/modal'
import { Select } from 'components/ui/select'
import { Table, TableBody, TableCell, TableRow } from 'components/ui/table'
import { Column, Sort, TableHeader } from 'components/ui/table/table-header'
import { TextField } from 'components/ui/text-field'
import { Typography } from 'components/ui/typography'

export const Cards = () => {
  const { id } = useParams()

  const { cards } = useGetCardsQuery(id, {
    selectFromResult: ({ data }) => {
      return {
        cards: data?.items,
      }
    },
  })

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
  const [deleteCard] = useDeleteCardMutation()

  const handleDeleteCard = (id: string) => {
    deleteCard(id)
  }

  const handleCreateCard = () => {
    const newCard = {
      question: getValues().question,
      answer: getValues().answer,
    }

    createCard({ id, question: newCard.question, answer: newCard.answer })
  }

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
          <Table className={s.table}>
            <TableHeader columns={columns} onSort={setSort} sort={sort} />
            <TableBody>
              {cards?.map((card: Card) => (
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
                        footerBtn={
                          <Button onClick={() => handleDeleteCard(card.id)}>Delete Card</Button>
                        }
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
        </>
      )}
    </div>
  )
}
