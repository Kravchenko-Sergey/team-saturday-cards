import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { CreateNewPassword } from './'

import { CreateNewPasswordSchemaType } from 'components/auth/create-new-password/use-create-new-password-form.ts'

const meta = {
  title: 'Components/AUTH/CreateNewPassword',
  component: CreateNewPassword,
  decorators: [
    Story => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof CreateNewPassword>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onSubmit: (data: CreateNewPasswordSchemaType) => {
      console.log(data)
    },
  },
}
