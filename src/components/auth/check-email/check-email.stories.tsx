import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { CheckEmail } from './'

const meta = {
  title: 'Components/AUTH/CheckEmail',
  component: CheckEmail,
  decorators: [
    Story => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof CheckEmail>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    email: 'sergey.ose.pyatigorsk@gmail.com',
  },
}
