import { ChangeEvent, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { z } from 'zod'

import s from './decks.module.scss'

import { useAppSelector } from '@/services'
import { useMeQuery } from '@/services/auth/auth.api.ts'
import { useCreateDeckMutation, useGetDecksQuery } from '@/services/decks'
import { decksSelectors } from '@/services/decks/decks-selectors.ts'
import { decksSlice } from '@/services/decks/decks.slice.ts'
import { BlankDeckCover, ImageOutline } from 'assets/icons'
import Button from 'components/ui/button/button.tsx'
import { ControlledCheckbox, ControlledTextField } from 'components/ui/controlled'
import { Modal } from 'components/ui/modal'
import { Pagination } from 'components/ui/pagination'
import { Typography } from 'components/ui/typography'
import { DecksFilters } from 'pages/decks/decks-filters/decks-filters.tsx'
import { DecksTable } from 'pages/decks/decks-table/decks-table.tsx'

export const Decks = () => {
  const [cover, setCover] = useState<File | null>(null)
  const currentPage = useAppSelector(decksSelectors.selectCurrentPage)
  const itemsPerPage = useAppSelector(decksSelectors.selectItemsPerPage)
  const searchByName = useAppSelector(decksSelectors.selectSearchByName)
  const maxCardsCount = useAppSelector(decksSelectors.selectMaxCardsCount)
  const minCardsCount = useAppSelector(decksSelectors.selectMinCardsCount)
  const orderBy = useAppSelector(decksSelectors.selectOrderBy)
  const authorId = useAppSelector(decksSelectors.selectAuthorId)
  const dispatch = useDispatch()

  const setCurrentPage = (page: number) => dispatch(decksSlice.actions.setCurrentPage(page))
  const setItemsPerPage = (perPage: string) =>
    dispatch(decksSlice.actions.setItemsPerPage(Number(perPage)))

  const { decks, totalPages, isLoading, isFetching } = useGetDecksQuery(
    {
      name: searchByName,
      maxCardsCount,
      minCardsCount,
      currentPage,
      itemsPerPage,
      orderBy,
      authorId,
    },
    {
      selectFromResult: ({ currentData: data, isLoading, isFetching }) => {
        return {
          decks: data?.items,
          totalPages: data?.pagination.totalPages,
          max: data?.maxCardsCount,
          isLoading,
          isFetching,
        }
      },
    }
  )

  const { data } = useMeQuery()
  //
  const newDeckSchema = z.object({
    name: z.string().min(3).max(30),
    isPrivate: z.boolean(),
  })

  type NewDeck = z.infer<typeof newDeckSchema>

  const { control, handleSubmit } = useForm<NewDeck>({
    resolver: zodResolver(newDeckSchema),
    defaultValues: {
      name: '',
      isPrivate: false,
    },
  })

  const [createDeck] = useCreateDeckMutation()

  const handleCreateDeck = (data: { name: string; isPrivate: any }) => {
    const form = new FormData()

    form.append('name', data.name)
    form.append('isPrivate', data.isPrivate)
    cover && form.append('cover', cover)

    createDeck(form)
  }
  //pagination
  const handleCurrentPage = (e: number) => setCurrentPage(e)
  const handleItemsPerPage = (e: string) => setItemsPerPage(e)
  //cover
  const handleChangeCover = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]

    setCover(file)
  }

  if (isLoading || isFetching) return <span className={s.loader}></span>

  return (
    <div className={s.container}>
      <div className={s.titleBlock}>
        <Typography variant="large">Decks list</Typography>
        <Modal
          trigger={
            authorId !== '' && authorId !== data.id ? <div></div> : <Button>Add New Deck</Button>
          }
          title="Add new deck "
          footerBtn={<Button onClick={handleSubmit(handleCreateDeck)}>Add new deck</Button>}
        >
          <div className={s.coverModal}>
            {cover ? (
              <img className={s.img} src={URL.createObjectURL(cover)} alt="cover" />
            ) : (
              <BlankDeckCover />
            )}
          </div>
          <label htmlFor="change-cover" className={s.fileLabel}>
            <Button as={'a'} variant="secondary" fullWidth>
              <ImageOutline />
              <Typography as="span" variant="subtitle2">
                Change Cover
              </Typography>
            </Button>
            <input
              id="change-cover"
              type="file"
              accept="image/*"
              onChange={handleChangeCover}
              style={{ display: 'none' }}
            />
          </label>
          <form onSubmit={handleSubmit(handleCreateDeck)} className={s.form}>
            <ControlledTextField name="name" control={control} label="Name deck" />
            <ControlledCheckbox name="isPrivate" control={control} label="Private deck" />
          </form>
        </Modal>
      </div>
      <DecksFilters />
      {decks?.length === 0 ? (
        <Typography variant={'h2'} className={s.empty}>
          No decks with the entered name were found 😔. Change request parameters
        </Typography>
      ) : (
        <>
          <DecksTable data={decks} cover={cover} setCover={setCover} />
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
