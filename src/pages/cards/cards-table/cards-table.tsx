import { ChangeEvent, FC, useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { z } from 'zod'

import { useAppSelector } from '@/services'
import { Card, useDeleteCardMutation, useUpdateCardMutation } from '@/services/cards'
import { cardsSlice } from '@/services/cards/cards.slice.ts'
import { decksSelectors } from '@/services/decks/decks-selectors.ts'
import { BlankDeckCover, EditOutline, ImageOutline, TrashOutline } from 'assets/icons'
import Button from 'components/ui/button/button.tsx'
import { ControlledTextField } from 'components/ui/controlled'
import { Grade } from 'components/ui/grade'
import { Modal } from 'components/ui/modal'
import { Table, TableBody, TableCell, TableRow } from 'components/ui/table'
import { Column, Sort, TableHeader } from 'components/ui/table/table-header'
import { Typography } from 'components/ui/typography'
import s from 'pages/cards/cards.module.scss'

type CardsTableProps = {
  data: any
  data2: any
  questionCover: any
  setQuestionCover: any
  answerCover: any
  setAnswerCover: any
}

export const CardsTable: FC<CardsTableProps> = ({
  data,
  data2,
  questionCover,
  setQuestionCover,
  answerCover,
  setAnswerCover,
}) => {
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
  //changeCard
  const [updateCard] = useUpdateCardMutation()

  const handleQuestionCover = (e: ChangeEvent<HTMLInputElement>) => {
    const questionFile = e.target.files![0]

    setQuestionCover(questionFile)
  }
  const handleAnswerCover = (e: ChangeEvent<HTMLInputElement>) => {
    const answerFile = e.target.files![0]

    setAnswerCover(answerFile)
  }

  const updateCardSchema = z.object({
    question: z.string().min(3).max(30),
    answer: z.string().min(3).max(30),
  })

  type editCard = z.infer<typeof updateCardSchema>

  const { control, handleSubmit, getValues } = useForm<editCard>({
    resolver: zodResolver(updateCardSchema),
    defaultValues: {
      question: '',
      answer: '',
    },
  })

  const handleUpdateCard = (id: string) => {
    const form = new FormData()

    form.append('question', getValues().question)
    form.append('answer', getValues().answer)
    questionCover && form.append('questionImg', questionCover)
    answerCover && form.append('answerImg', answerCover)

    updateCard({ id, form })
  }

  return (
    <Table className={s.table}>
      <TableHeader columns={columns} onSort={setSort} sort={sort} />
      <TableBody>
        {data?.map((card: Card) => (
          <TableRow key={card.id}>
            <TableCell className={s.tableCell}>
              <div className={s.coverCell}>
                {card.questionImg ? (
                  <img src={card.questionImg} alt={'cover'} className={s.cover} />
                ) : (
                  <BlankDeckCover style={{ backgroundColor: 'gray' }} />
                )}
                {card.question}
              </div>
            </TableCell>
            <TableCell className={s.tableCell}>
              <div className={s.coverCell}>
                {card.answerImg ? (
                  <img src={card.answerImg} alt={'cover'} className={s.cover} />
                ) : (
                  <BlankDeckCover style={{ backgroundColor: 'gray' }} />
                )}
                {card.answer}
              </div>
            </TableCell>
            <TableCell className={s.tableCell}>
              {new Date(card.updated).toLocaleString('en-GB')}
            </TableCell>
            <TableCell className={s.tableCell}>
              <Grade value={card.grade} onClick={() => {}} />
            </TableCell>
            <TableCell className={s.tableCell}>
              {data2.id === authorId && (
                <div className={s.iconsBlock}>
                  <Modal
                    trigger={<EditOutline />}
                    title={'Edit card'}
                    footerBtn={
                      <Button onClick={handleSubmit(() => handleUpdateCard(card.id))}>
                        Save changes
                      </Button>
                    }
                  >
                    <form
                      onSubmit={handleSubmit(() => handleUpdateCard(card.id))}
                      className={s.form}
                    >
                      <div className={s.coverModal}>
                        {questionCover ? (
                          <img
                            className={s.img}
                            src={URL.createObjectURL(questionCover)}
                            alt="cover"
                          />
                        ) : (
                          <BlankDeckCover />
                        )}
                      </div>
                      <label htmlFor="change-question" className={s.fileLabel}>
                        <Button as={'a'} variant="secondary" fullWidth>
                          <ImageOutline />
                          <Typography as="span" variant="subtitle2">
                            Change Cover
                          </Typography>
                        </Button>
                        <input
                          id="change-question"
                          type="file"
                          accept="image/*"
                          onChange={handleQuestionCover}
                          style={{ display: 'none' }}
                        />
                      </label>
                      <ControlledTextField label="Question" name="question" control={control} />
                      <div className={s.coverModal}>
                        {answerCover ? (
                          <img
                            className={s.img}
                            src={URL.createObjectURL(answerCover)}
                            alt="cover"
                          />
                        ) : (
                          <BlankDeckCover />
                        )}
                      </div>
                      <label htmlFor="change-answer" className={s.fileLabel}>
                        <Button as={'a'} variant="secondary" fullWidth>
                          <ImageOutline />
                          <Typography as="span" variant="subtitle2">
                            Change Cover
                          </Typography>
                        </Button>
                        <input
                          id="change-answer"
                          type="file"
                          accept="image/*"
                          onChange={handleAnswerCover}
                          style={{ display: 'none' }}
                        />
                      </label>
                      <ControlledTextField label="Answer" name="answer" control={control} />
                    </form>
                  </Modal>
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
