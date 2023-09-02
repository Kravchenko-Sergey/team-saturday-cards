import { FC } from 'react'

import { useDeleteCardMutation } from '@/services/cards'
import { TrashOutline } from 'assets/icons'
import Button from 'components/ui/button/button'
import { Modal } from 'components/ui/modal'
import { Typography } from 'components/ui/typography'

type DeleteCardModalProps = { cardId: string }

export const DeleteCardModal: FC<DeleteCardModalProps> = ({ cardId }) => {
  const [deleteCard] = useDeleteCardMutation()

  const handleDeleteCard = (id: string) => {
    deleteCard(id)
  }

  return (
    <Modal
      trigger={<TrashOutline />}
      title="Delete Card"
      footerBtn={<Button onClick={() => handleDeleteCard(cardId)}>Delete Card</Button>}
    >
      <Typography>Do you really want to remove Card Name? All cards will be deleted.</Typography>
    </Modal>
  )
}
