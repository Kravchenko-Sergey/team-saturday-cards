import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './decks.module.scss'

import { useAppSelector } from '@/services'
import { useCreateDeckMutation, useGetDecksQuery } from '@/services/decks'
import { decksSelectors } from '@/services/decks/decks-selectors.ts'
import Button from 'components/ui/button/button.tsx'
import { ControlledCheckbox, ControlledTextField } from 'components/ui/controlled'
import { Modal } from 'components/ui/modal'
import { Pagination } from 'components/ui/pagination'
import { Typography } from 'components/ui/typography'
import { DecksFilters } from 'pages/decks/decks-filters/decks-filters.tsx'
import { DecksTable } from 'pages/decks/decks-table/decks-table.tsx'

export const Decks = () => {
  const searchByName = useAppSelector(decksSelectors.selectSearchByName)
  const maxCardsCount = useAppSelector(decksSelectors.selectMaxCardsCount)
  const minCardsCount = useAppSelector(decksSelectors.selectMinCardsCount)

  const { decks, isLoading } = useGetDecksQuery(
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

  if (isLoading) return <div>Loading...</div>

  const handleCreateDeck = () => {
    const newDeck = {
      cover: String(getValues().cover),
      name: getValues().name,
      isPrivate: getValues().isPrivate,
    }

    createDeck(newDeck)
  }

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
      <DecksFilters />
      {decks?.length === 0 ? (
        <Typography variant={'h2'} className={s.empty}>
          No decks with the entered name were found 😔. Change request parameters
        </Typography>
      ) : (
        <>
          <DecksTable data={decks} />
          <Pagination count={10} page={1} onChange={() => {}} />
        </>
      )}
    </div>
  )
}
