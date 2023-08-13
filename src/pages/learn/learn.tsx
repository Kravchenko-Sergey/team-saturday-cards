import { useState } from 'react'

import { useParams } from 'react-router-dom'

import s from './learn.module.scss'

import { useGetLearnQuery, useLazyGetLearnQuery, useSaveGradeMutation } from '@/services/decks'
import Button from 'components/ui/button/button.tsx'
import { Card } from 'components/ui/card'
import { RadioGroup } from 'components/ui/radio-group'
import { Typography } from 'components/ui/typography'

export const Learn = () => {
  const [isShowAnswer, setIsShowAnswer] = useState(false)
  const [radioValue, setRadioValue] = useState(1)

  const { id } = useParams()

  const { data } = useGetLearnQuery({ id })
  const [getLearn] = useLazyGetLearnQuery()
  const [saveGrade] = useSaveGradeMutation()

  const handleShowAnswer = () => {
    setIsShowAnswer(true)
  }

  const handleNextQuestion = () => {
    setIsShowAnswer(false)
    saveGrade({ id, cardId: data.id, grade: radioValue })
    getLearn({ id })
  }

  const handleRadioValue = (e: number) => {
    setRadioValue(e)
  }

  const options = [
    {
      value: 1,
      label: 'Did not know',
    },
    {
      value: 2,
      label: 'Forgot',
    },
    {
      value: 3,
      label: 'A lot of thought',
    },
    {
      value: 4,
      label: 'Сonfused',
    },
    {
      value: 5,
      label: 'Knew the answer',
    },
  ]

  return (
    <Card className={s.card}>
      <Typography variant="large" className={s.title}>
        Learn “Pack Name”
      </Typography>
      <Typography variant="h3" className={s.question}>
        Question: {data.question}
      </Typography>
      <Typography variant="subtitle2" className={s.attempts}>
        Количество попыток ответов на вопрос: {data.shots}
      </Typography>
      {!isShowAnswer ? (
        <Button fullWidth onClick={handleShowAnswer}>
          <Typography variant="subtitle2">Show Answer</Typography>
        </Button>
      ) : (
        <>
          <Typography variant="h3" className={s.answer}>
            Answer: {data.answer}
          </Typography>
          <RadioGroup
            options={options}
            value={radioValue}
            onChange={e => handleRadioValue(e)}
            className={s.radioButtons}
          />
          <Button fullWidth onClick={handleNextQuestion}>
            <Typography variant="subtitle2">Next Question</Typography>
          </Button>
        </>
      )}
    </Card>
  )
}
