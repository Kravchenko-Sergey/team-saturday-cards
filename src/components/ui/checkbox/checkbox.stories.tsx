import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from './'

const meta = {
  title: 'Components/UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Disabled: Story = {
  args: {
    label: 'Click here',
    checked: true,
    disabled: true,
  },
}

export const WithoutLabel: Story = {
  args: {
    checked: false,
    disabled: false,
  },
}
const CheckboxWithHook = () => {
  const [checked, setChecked] = useState(false)

  return <Checkbox checked={checked} onChange={setChecked} label={'Click here'} />
}

export const Controlled = {
  render: () => <CheckboxWithHook />,
}
