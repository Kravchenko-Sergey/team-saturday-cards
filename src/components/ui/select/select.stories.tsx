import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Select } from './'

const meta = {
  title: 'Components/UI/Select',
  component: Select,
  tags: ['autodocs'],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Uncontrolled: Story = {
  args: {
    label: 'Select-box',
    placeholder: 'Select-box',
    options: [
      { label: 'Item 1', value: 'item-1' },
      { label: 'Item 2', value: 'item-2' },
      { label: 'Item 3', value: 'item-3' },
      { label: 'Item 4', value: 'item-4' },
      { label: 'Item 5', value: 'item-5' },
      { label: 'Item 6', value: 'item-6' },
      { label: 'Item 7', value: 'item-7' },
      { label: 'Item 8', value: 'item-8' },
    ],
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Select-box',
    label: 'Select-box',
    options: [
      { label: 'Item 1', value: 'item-1' },
      { label: 'Item 2', value: 'item-2' },
      { label: 'Item 3', value: 'item-3' },
      { label: 'Item 4', value: 'item-4' },
      { label: 'Item 5', value: 'item-5' },
      { label: 'Item 6', value: 'item-6' },
      { label: 'Item 7', value: 'item-7' },
      { label: 'Item 8', value: 'item-8' },
    ],
  },
}

const SelectWithHook = () => {
  const [value, setValue] = useState<string>('item-1')

  return (
    <Select
      required={true}
      label={'Select-box'}
      options={[
        { label: 'Item 1', value: 'item-1' },
        { label: 'Item 2', value: 'item-2' },
        { label: 'Item 3', value: 'item-3' },
        { label: 'Item 4', value: 'item-4' },
        { label: 'Item 5', value: 'item-5' },
        { label: 'Item 6', value: 'item-6' },
        { label: 'Item 7', value: 'item-7' },
        { label: 'Item 8', value: 'item-8' },
      ]}
      value={value}
      onValueChange={setValue}
    />
  )
}

export const Controlled = {
  render: () => <SelectWithHook />,
}
