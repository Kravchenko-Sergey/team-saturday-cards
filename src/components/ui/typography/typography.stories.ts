import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from './index'

const meta = {
  title: 'Components/UI/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: [
        'large',
        'h1',
        'h2',
        'h3',
        'body1',
        'subtitle1',
        'body2',
        'subtitle2',
        'caption',
        'overline',
        'link1',
        'link2',
      ],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Large: Story = {
  args: {
    children: 'Text content Large',
    variant: 'large',
  },
}

export const H1: Story = {
  args: {
    children: 'Text content H1',
    variant: 'h1',
  },
}

export const H2: Story = {
  args: {
    children: 'Text content H2',
    variant: 'h2',
  },
}

export const H3: Story = {
  args: {
    children: 'Text content H3',
    variant: 'h3',
  },
}

export const Body1: Story = {
  args: {
    children: 'Text content Body1',
    variant: 'body1',
  },
}

export const Subtitle1: Story = {
  args: {
    children: 'Text content Subtitle1',
    variant: 'subtitle1',
  },
}

export const Body2: Story = {
  args: {
    children: 'Text content text',
    variant: 'body2',
  },
}

export const Subtitle2: Story = {
  args: {
    children: 'Text content Subtitle2',
    variant: 'subtitle2',
  },
}

export const Caption: Story = {
  args: {
    children: 'Text content Caption',
    variant: 'caption',
  },
}

export const Overline: Story = {
  args: {
    children: 'Text content Overline',
    variant: 'overline',
  },
}

export const Link1: Story = {
  args: {
    children: 'Text content Link1',
    variant: 'link1',
  },
}

export const Link2: Story = {
  args: {
    children: 'Text content Link2',
    variant: 'link2',
  },
}

export const Error: Story = {
  args: {
    children: 'Text content Error',
    variant: 'error',
  },
}
