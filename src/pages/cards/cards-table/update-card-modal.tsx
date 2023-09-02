import { ChangeEvent, FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useUpdateCardMutation } from '@/services/cards'
import { BlankDeckCover, EditOutline, ImageOutline } from 'assets/icons'
import Button from 'components/ui/button/button'
import { ControlledTextField } from 'components/ui/controlled/controlled-text-field'
import { Modal } from 'components/ui/modal'
import { Typography } from 'components/ui/typography'
import { NewCard, newCardSchema } from 'pages/cards'
import s from 'pages/cards/cards.module.scss'

type UpdateCardModalProps = {
  cardId: string
  questionCover: File | null
  handleQuestionCover: (e: ChangeEvent<HTMLInputElement>) => void
  answerCover: File | null
  handleAnswerCover: (e: ChangeEvent<HTMLInputElement>) => void
}

export const UpdateCardModal: FC<UpdateCardModalProps> = ({
  cardId,
  questionCover,
  handleQuestionCover,
  answerCover,
  handleAnswerCover,
}) => {
  const [updateCard] = useUpdateCardMutation()

  const { control, handleSubmit, getValues } = useForm<NewCard>({
    resolver: zodResolver(newCardSchema),
    defaultValues: {
      question: '',
      answer: '',
      questionImg: '',
      answerImg: '',
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
    <Modal
      trigger={<EditOutline />}
      title={'Edit card'}
      footerBtn={
        <Button onClick={handleSubmit(() => handleUpdateCard(cardId))}>Save changes</Button>
      }
    >
      <form onSubmit={handleSubmit(() => handleUpdateCard(cardId))} className={s.form}>
        <div className={s.coverModal}>
          {questionCover ? (
            <img className={s.img} src={URL.createObjectURL(questionCover)} alt="cover" />
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
            <img className={s.img} src={URL.createObjectURL(answerCover)} alt="cover" />
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
  )
}
