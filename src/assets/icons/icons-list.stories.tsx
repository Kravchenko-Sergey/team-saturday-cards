import type { Meta, StoryObj } from '@storybook/react'

import {
  ArrowBackOutline,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  CheckEmail,
  CloseOutline,
  EditOutline,
  EyeOffOutline,
  EyeOutline,
  ImageOutline,
  Logo,
  LogOutOutline,
  MoreVerticalOutline,
  PersonOutline,
  PlayCircleOutline,
  SearchOutline,
  Star,
  TrashOutline,
  CheckBox,
  NotFound,
} from 'assets/icons'
import { IconsList } from 'assets/icons/icons-list.tsx'
import StarOutline from 'assets/icons/star-outline.tsx'

const meta = {
  title: 'Icons/Icons list',
  component: IconsList,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof IconsList>

export default meta
type Story = StoryObj<typeof meta>

export const ArrowUpIcon: Story = {
  args: {
    children: (
      <>
        <ArrowUp />
      </>
    ),
  },
}

export const ArrowDownIcon: Story = {
  args: {
    children: (
      <>
        <ArrowDown />
      </>
    ),
  },
}

export const ArrowLeftIcon: Story = {
  args: {
    children: (
      <>
        <ArrowLeft />
      </>
    ),
  },
}

export const ArrowRightIcon: Story = {
  args: {
    children: (
      <>
        <ArrowRight />
      </>
    ),
  },
}

export const ArrowBackIcon: Story = {
  args: {
    children: (
      <>
        <ArrowBackOutline />
      </>
    ),
  },
}

export const CloseOutlineIcon: Story = {
  args: {
    children: (
      <>
        <CloseOutline />
      </>
    ),
  },
}

export const SearchOutlineIcon: Story = {
  args: {
    children: (
      <>
        <SearchOutline />
      </>
    ),
  },
}

export const EyeOutlineIcon: Story = {
  args: {
    children: (
      <>
        <EyeOutline />
      </>
    ),
  },
}

export const EyeOffOutlineIcon: Story = {
  args: {
    children: (
      <>
        <EyeOffOutline />
      </>
    ),
  },
}

export const LogOutOutlineIcon: Story = {
  args: {
    children: (
      <>
        <LogOutOutline />
      </>
    ),
  },
}

export const PersonOutlineIcon: Story = {
  args: {
    children: (
      <>
        <PersonOutline />
      </>
    ),
  },
}

export const PlayCircleOutlineIcon: Story = {
  args: {
    children: (
      <>
        <PlayCircleOutline />
      </>
    ),
  },
}

export const EditOutlineIcon: Story = {
  args: {
    children: (
      <>
        <EditOutline />
      </>
    ),
  },
}

export const TrashOutlineIcon: Story = {
  args: {
    children: (
      <>
        <TrashOutline />
      </>
    ),
  },
}

export const ImageOutlineIcon: Story = {
  args: {
    children: (
      <>
        <ImageOutline />
      </>
    ),
  },
}

export const StarIcon: Story = {
  args: {
    children: (
      <>
        <Star />
      </>
    ),
  },
}

export const StarOutlineIcon: Story = {
  args: {
    children: (
      <>
        <StarOutline />
      </>
    ),
  },
}

export const MoreVerticalOutlineIcon: Story = {
  args: {
    children: (
      <>
        <MoreVerticalOutline />
      </>
    ),
  },
}

export const CheckboxIcon: Story = {
  args: {
    children: (
      <>
        <CheckBox />
      </>
    ),
  },
}

export const LogoIcon: Story = {
  args: {
    children: (
      <>
        <Logo />
      </>
    ),
  },
}

export const CheckEmailIcon: Story = {
  args: {
    children: (
      <>
        <CheckEmail />
      </>
    ),
  },
}

export const NotFoundIcon: Story = {
  args: {
    children: (
      <>
        <NotFound />
      </>
    ),
  },
}
