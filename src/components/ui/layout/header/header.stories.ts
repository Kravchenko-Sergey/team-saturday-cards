import type { Meta, StoryObj } from '@storybook/react'

import { Header } from 'src/components/ui/layout/header/index.ts'

const meta = {
  title: 'Components/UI/Header',
  component: Header,
  tags: ['autodocs'],
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
