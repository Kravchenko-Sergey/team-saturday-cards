import type { Meta } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { ProfileInfo } from './'

const meta = {
  title: 'Components/Auth/Profile',
  component: ProfileInfo,
  decorators: [
    Story => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof ProfileInfo>

export default meta

export const Default = () => {
  const img =
    'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png'

  return (
    <ProfileInfo
      name={'Elon Musk'}
      email={'teslaModelX@gmail.com'}
      src={img}
      handleChangeAvatar={() => {}}
      onSubmit={() => {}}
      handleLogout={() => {}}
      showTextField={false}
      setShowTextField={() => {}}
    />
  )
}
