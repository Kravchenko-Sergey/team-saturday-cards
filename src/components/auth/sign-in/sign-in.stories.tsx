import type { Meta, StoryObj } from '@storybook/react'

import { FormValues, SignIn } from './'

const meta = {
  title: 'Components/AUTH/SignIn',
  component: SignIn,
  tags: ['autodocs'],
} satisfies Meta<typeof SignIn>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onSubmit: (data: FormValues) => console.log(data),
  },
}
