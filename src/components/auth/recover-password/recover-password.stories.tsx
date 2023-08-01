import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { RecoverPassword } from './'

const meta = {
  title: 'Components/AUTH/RecoverPassword',
  component: RecoverPassword,
  decorators: [
    Story => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof RecoverPassword>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onSubmit: (data: any) => console.log(data),
  },
}
