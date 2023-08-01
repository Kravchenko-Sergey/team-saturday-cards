import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { FormValues, SignUp } from './'

const meta = {
  title: 'Components/AUTH/SignUp',
  component: SignUp,
  decorators: [
    Story => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof SignUp>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onSubmit: (data: Omit<FormValues, 'confirmPassword'>) => console.log(data),
  },
}
