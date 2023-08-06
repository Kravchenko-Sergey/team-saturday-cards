import type { Meta, StoryObj } from '@storybook/react'

import { Header } from 'components/ui/layout/header/header.tsx'

const meta = {
  title: 'Components/UI/Header',
  component: Header,
  tags: ['autodocs'],
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
