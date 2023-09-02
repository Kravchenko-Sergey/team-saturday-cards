import { ChangeEvent, FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import { useMeQuery } from '@/services/auth/auth.api'
import { useCreateDeckMutation } from '@/services/decks'
import { decksSelectors } from '@/services/decks/decks-selectors'
import { BlankDeckCover, ImageOutline } from 'assets/icons'
import Button from 'components/ui/button/button'
import { ControlledCheckbox } from 'components/ui/controlled/controlled-checkbox'
import { ControlledTextField } from 'components/ui/controlled/controlled-text-field'
import { Modal } from 'components/ui/modal'
import { Typography } from 'components/ui/typography'
import s from 'pages/decks/decks.module.scss'
import { NewDeck, newDeckSchema } from 'pages/decks/new-deck.schema'

type CreateDeckModalProps = {
  cover: File | null
  setCover: (cover: File | null) => void
}

export const CreateDeckModal: FC<CreateDeckModalProps> = ({ cover, setCover }) => {
  const authorId = useSelector(decksSelectors.selectAuthorId)

  const { data } = useMeQuery()
  const [createDeck] = useCreateDeckMutation()

  const { control, handleSubmit } = useForm<NewDeck>({
    resolver: zodResolver(newDeckSchema),
    defaultValues: {
      name: '',
      isPrivate: false,
    },
  })

  const handleCreateDeck = (data: { name: string; isPrivate: any }) => {
    const form = new FormData()

    form.append('name', data.name)
    form.append('isPrivate', data.isPrivate)
    cover && form.append('cover', cover)

    createDeck(form)
  }

  const handleChangeCover = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]

    setCover(file)
  }

  return (
    <Modal
      trigger={(authorId === '' || authorId === data.id) && <Button>Add New Deck</Button>}
      title="Add new deck "
      footerBtn={<Button onClick={handleSubmit(handleCreateDeck)}>Add new deck</Button>}
    >
      <div className={s.coverModal}>
        {cover && <img className={s.img} src={URL.createObjectURL(cover)} alt="cover" />}
        {!cover && <BlankDeckCover />}
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
  )
}
