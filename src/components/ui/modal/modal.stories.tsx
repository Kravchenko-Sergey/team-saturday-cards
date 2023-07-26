import type { Meta, StoryObj } from '@storybook/react'

import { Modal } from './'

import { CheckEmail, Logo, NotFound } from 'assets/icons'
import { Button } from 'components/ui/button'
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
        <Logo />
        <NotFound />
        <CheckEmail />
      </>
    ),
  },
}

export const EditPack: Story = {
  args: {
    trigger: <Button>Edit Pack</Button>,
    title: <Typography variant="h1">Edit Pack</Typography>,
    footerBtn: <Button>Save Changes</Button>,
    children: (
      <>
        <Logo />
        <NotFound />
        <CheckEmail />
      </>
    ),
  },
}

export const DeletePack: Story = {
  args: {
    trigger: <Button>Delete Pack</Button>,
    title: <Typography variant="h1">Delete Pack</Typography>,
    footerBtn: <Button>Delete Pack</Button>,
    children: (
      <>
        <Logo />
        <NotFound />
        <CheckEmail />
      </>
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
        <Logo />
        <NotFound />
        <CheckEmail />
      </>
    ),
  },
}

export const EditCard: Story = {
  args: {
    trigger: <Button>Edit Card</Button>,
    title: <Typography variant="h1">Edit Card</Typography>,
    footerBtn: <Button>Save Changes</Button>,
    children: (
      <>
        <Logo />
        <NotFound />
        <CheckEmail />
      </>
    ),
  },
}

export const DeleteCard: Story = {
  args: {
    trigger: <Button>Edit Card</Button>,
    title: <Typography variant="h1">Edit Card</Typography>,
    footerBtn: <Button>Delete Card</Button>,
    children: (
      <>
        <Logo />
        <NotFound />
        <CheckEmail />
      </>
    ),
  },
}
