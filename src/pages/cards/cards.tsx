import { ChangeEvent, useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

import s from './cards.module.scss'

import { useDebounce } from '@/common/hooks/use-debounse.ts'
import { useMeQuery } from '@/services/auth/auth.api.ts'
import { useGetCardsQuery } from '@/services/cards'
import { cardsSelectors } from '@/services/cards/cards-selectors.ts'
import { cardsSlice } from '@/services/cards/cards.slice.ts'
import { decksSelectors } from '@/services/decks/decks-selectors.ts'
import { decksSlice } from '@/services/decks/decks.slice.ts'
import {
  ArrowBackOutline,
  BlankDeckCover,
  EditOutline,
  MoreVerticalOutline,
  PlayCircleOutline,
  TrashOutline,
} from 'assets/icons'
import Button from 'components/ui/button/button.tsx'
import { Dropdown, DropdownItemWithIcon } from 'components/ui/dropdown'
import { Pagination } from 'components/ui/pagination'
import { TextField } from 'components/ui/text-field'
import { Typography } from 'components/ui/typography'
import { CardsTable } from 'pages/cards/cards-table/cards-table.tsx'
import { CreateCardModal } from 'pages/cards/create-card-modal'

export const Cards = () => {
  const currentPage = useSelector(cardsSelectors.selectCurrentPage)
  const itemsPerPage = useSelector(cardsSelectors.selectItemsPerPage)
  const searchByQuestion = useSelector(cardsSelectors.selectSearchByQuestion)
  const orderBy = useSelector(cardsSelectors.selectOrderBy)
  const authorId = useSelector(decksSelectors.selectAuthorId)
  const deckName = useSelector(decksSelectors.selectDeckName)
  const deckCover = useSelector(decksSelectors.selectDeckCover)
  const dispatch = useDispatch()

  const setCurrentPage = (page: number) => dispatch(cardsSlice.actions.setCurrentPage(page))
  const setItemsPerPage = (perPage: string) =>
    dispatch(cardsSlice.actions.setItemsPerPage(Number(perPage)))
  const setSearch = (search: string) => dispatch(cardsSlice.actions.setSearchByQuestion(search))
  const setAuthorId = (authorId: string) => dispatch(decksSlice.actions.setAuthorId(authorId))

  const navigate = useNavigate()

  const { id } = useParams()

  // addCard
  const [questionCover, setQuestionCover] = useState<File | null>(null)
  const [answerCover, setAnswerCover] = useState<File | null>(null)

  const handleQuestionCover = (e: ChangeEvent<HTMLInputElement>) => {
    const questionFile = e.target.files![0]

    setQuestionCover(questionFile)
  }
  const handleAnswerCover = (e: ChangeEvent<HTMLInputElement>) => {
    const answerFile = e.target.files![0]

    setAnswerCover(answerFile)
  }

  const { cards, totalPages, isLoading, isFetching } = useGetCardsQuery(
    { id, question: searchByQuestion, currentPage, itemsPerPage, orderBy },
    {
      selectFromResult: ({ data, isLoading, isFetching }) => {
        return {
          cards: data?.items,
          totalPages: data?.pagination.totalPages,
          isLoading,
          isFetching,
        }
      },
    }
  )
  const { data: data2 } = useMeQuery()

  const handleBackToDecksList = () => {
    setAuthorId('')
  }

  //searchByQuestion
  const [searchValue, setSearchValue] = useState('')
  const debouncedValue = useDebounce(searchValue, 500)

  const handleSearchValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchValue(e.currentTarget.value)
  }
  //pagination
  const handleCurrentPage = (e: number) => setCurrentPage(e)
  const handleItemsPerPage = (e: string) => setItemsPerPage(e)
  //

  useEffect(() => {
    setSearch(debouncedValue)
    setCurrentPage(1)
  }, [debouncedValue])

  if (isLoading || isFetching) return <span className={s.loader}></span>

  return (
    <div className={s.container}>
      <Button variant={'link'} as={Link} to={'/'} onClick={handleBackToDecksList}>
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
                <DropdownItemWithIcon
                  icon={<PlayCircleOutline />}
                  text={'Learn'}
                  onSelect={() => {
                    navigate(`/learn/${cards![0].deckId}`)
                  }}
                />
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
              <DropdownItemWithIcon
                icon={<PlayCircleOutline />}
                text={'Learn'}
                onSelect={() => {
                  navigate(`/learn/${cards![0].deckId}`)
                }}
              />
            </Dropdown>
          )}
        </div>
        {cards?.length !== 0 && data2.id === authorId && (
          <CreateCardModal
            questionCover={questionCover}
            handleQuestionCover={handleQuestionCover}
            answerCover={answerCover}
            handleAnswerCover={handleAnswerCover}
          />
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
              <CreateCardModal
                questionCover={questionCover}
                handleQuestionCover={handleQuestionCover}
                answerCover={answerCover}
                handleAnswerCover={handleAnswerCover}
              />
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
          <CardsTable
            data={cards}
            data2={data2}
            questionCover={questionCover}
            setQuestionCover={setQuestionCover}
            answerCover={answerCover}
            setAnswerCover={setAnswerCover}
          />
          <Pagination
            count={totalPages ? totalPages : 100}
            page={currentPage}
            onChange={e => handleCurrentPage(e)}
            perPage={String(itemsPerPage)}
            onPerPageChange={e => handleItemsPerPage(e)}
            perPageOptions={[4, 8, 16]}
          />
        </>
      )}
    </div>
  )
}
