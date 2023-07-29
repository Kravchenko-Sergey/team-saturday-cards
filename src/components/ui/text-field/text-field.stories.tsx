import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { TextField } from './'

const meta = {
  title: 'Components/UI/TextField',
  component: TextField,
  tags: ['autodocs'],
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Some label',
    placeholder: 'Placeholder text',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Some label',
    placeholder: 'Placeholder text',
    disabled: true,
  },
}

export const Error: Story = {
  args: {
    label: 'Some label',
    value: 'Error text',
    error: 'Some error!',
  },
}

export const Password: Story = {
  args: {
    label: 'Some label',
    placeholder: 'Placeholder text',
    type: 'password',
  },
}

export const PasswordDisabled: Story = {
  args: {
    label: 'Some label',
    placeholder: 'Placeholder text',
    type: 'password',
    disabled: true,
  },
}

const TextFieldWithHook = () => {
  const [value, setValue] = useState('Some value')

  return (
    <TextField
      label={'Some label'}
      value={value}
      onChange={e => setValue(e.target.value)}
      onClearClick={() => setValue('')}
      search
    />
  )
}

export const Search = {
  render: () => <TextFieldWithHook />,
}

export const SearchDisabled: Story = {
  args: {
    label: 'Some label',
    placeholder: 'Placeholder text',
    search: true,
    disabled: true,
  },
}
