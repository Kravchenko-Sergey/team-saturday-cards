import type { Meta, StoryObj } from '@storybook/react'

import Button from '../button/button'

import { Modal } from './'

import { EditOutline, TrashOutline } from 'assets/icons'
import { Checkbox } from 'components/ui/checkbox'
import { Select } from 'components/ui/select'
import { TextField } from 'components/ui/text-field'
import { Typography } from 'components/ui/typography'

const meta = {
  title: 'Components/UI/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    trigger: {},
    title: {},
    footerBtn: {},
    children: {},
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const AddNewPack: Story = {
  args: {
    trigger: <Button>Add New Pack</Button>,
    title: <Typography variant="h1">Add New Pack</Typography>,
    footerBtn: <Button>Add New Pack</Button>,
    children: (
      <>
        <TextField label="Name Pask" />
        <Checkbox label="Private pack" />
      </>
    ),
  },
}

export const EditPack: Story = {
  args: {
    trigger: <EditOutline />,
    title: <Typography variant="h1">Edit Pack</Typography>,
    footerBtn: <Button>Save Changes</Button>,
    children: (
      <>
        <TextField label="Name Pask" />
        <Checkbox label="Private pack" />
      </>
    ),
  },
}

export const DeletePack: Story = {
  args: {
    trigger: <TrashOutline />,
    title: <Typography variant="h1">Delete Pack</Typography>,
    footerBtn: <Button>Delete Pack</Button>,
    children: (
      <Typography style={{ whiteSpace: 'pre-line' }}>
        Do you really want to remove Pack Name?
        {'\n'}
        All cards will be deleted.
      </Typography>
    ),
  },
}

export const AddNewCard: Story = {
  args: {
    trigger: <Button>Add New Card</Button>,
    title: <Typography variant="h1">Add New Card</Typography>,
    footerBtn: <Button>Add New Card</Button>,
    children: (
      <>
        <Select
          options={[
            { label: 'Text', value: 'item-1' },
            { label: 'Image', value: 'item-2' },
          ]}
          label="Choose a question format"
          placeholder={'Text'}
        />
        <TextField label="Question" />
        <TextField label="Answer" />
      </>
    ),
  },
}

export const EditCard: Story = {
  args: {
    trigger: <EditOutline />,
    title: <Typography variant="h1">Edit Card</Typography>,
    footerBtn: <Button>Save Changes</Button>,
    children: (
      <>
        <Select
          options={[
            { label: 'Text', value: 'item-1' },
            { label: 'Image', value: 'item-2' },
          ]}
          label="Choose a question format"
        />
        <TextField label="Question" />
        <TextField label="Answer" />
      </>
    ),
  },
}

export const DeleteCard: Story = {
  args: {
    trigger: <TrashOutline />,
    title: <Typography variant="h1">Edit Card</Typography>,
    footerBtn: <Button>Delete Card</Button>,
    children: (
      <Typography style={{ whiteSpace: 'pre-line' }}>
        {' '}
        Do you really want to remove Card Name?
        {'\n'}
        All cards will be deleted.
      </Typography>
    ),
  },
}
