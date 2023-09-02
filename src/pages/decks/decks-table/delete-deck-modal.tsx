import { FC } from 'react'

import { useDeleteDeckMutation } from '@/services/decks'
import { TrashOutline } from 'assets/icons'
import Button from 'components/ui/button/button'
import { Modal } from 'components/ui/modal'
import { Typography } from 'components/ui/typography'

type DeleteDeckModalProps = {
  deckId: string
}

export const DeleteDeckModal: FC<DeleteDeckModalProps> = ({ deckId }) => {
  const [deleteDeck] = useDeleteDeckMutation()

  const handleDeleteDeck = (deckId: string) => {
    deleteDeck(deckId)
  }

  return (
    <Modal
      trigger={<TrashOutline />}
      title="Delete deck"
      footerBtn={
        <Button
          onClick={() => {
            handleDeleteDeck(deckId)
          }}
        >
          Delete deck
        </Button>
      }
    >
      <>
        <Typography>Do you really want to remove Pack Name? All cards will be deleted.</Typography>
      </>
    </Modal>
  )
}
