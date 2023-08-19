import { useState } from 'react'

import { useParams } from 'react-router-dom'

import s from './learn.module.scss'

import { useGetLearnQuery, useLazyGetLearnQuery, useSaveGradeMutation } from '@/services/decks'
import { BlankDeckCover } from 'assets/icons'
import Button from 'components/ui/button/button.tsx'
import { Card } from 'components/ui/card'
import { RadioGroup } from 'components/ui/radio-group'
import { Typography } from 'components/ui/typography'

export const Learn = () => {
  const [isShowAnswer, setIsShowAnswer] = useState(false)
  const [radioValue, setRadioValue] = useState(0)

  const { id } = useParams()

  const { data } = useGetLearnQuery({ id })
  const [getLearn, { isLoading, isFetching }] = useLazyGetLearnQuery()
  const [saveGrade] = useSaveGradeMutation()

  const handleShowAnswer = () => {
    setIsShowAnswer(true)
  }

  const handleNextQuestion = () => {
    setIsShowAnswer(false)
    saveGrade({ id, cardId: data?.id, grade: radioValue })
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

  if (isLoading || isFetching) return <span className={s.loader}></span>

  return (
    <Card className={s.card}>
      <Typography variant="large" className={s.title}>
        Learn “Pack Name”
      </Typography>
      <Typography variant="h3" className={s.question}>
        Question: {data?.question}
      </Typography>
      <div className={s.questionImg}>
        {data?.questionImg ? (
          <img className={s.img} src={data?.questionImg} alt="cover" />
        ) : (
          <BlankDeckCover />
        )}
      </div>
      <Typography variant="subtitle2" className={s.attempts}>
        Number of answers to the question: {data?.shots}
      </Typography>
      {!isShowAnswer ? (
        <Button fullWidth onClick={handleShowAnswer}>
          <Typography variant="subtitle2">Show Answer</Typography>
        </Button>
      ) : (
        <>
          <Typography variant="h3" className={s.answer}>
            Answer: {data?.answer}
          </Typography>
          <div className={s.answerImg}>
            {data?.answerImg ? (
              <img className={s.img} src={data?.answerImg} alt="cover" />
            ) : (
              <BlankDeckCover />
            )}
          </div>
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
