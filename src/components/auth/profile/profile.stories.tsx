import { useState } from 'react'

import type { Meta } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { Profile } from './'

const meta = {
  title: 'Components/Auth/Profile',
  component: Profile,
  decorators: [
    Story => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof Profile>

export default meta

export const Default = () => {
  const img =
    'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png'

  const [showTextField, setShowTextField] = useState(false)
  const handleChangeAvatar = (event: any) => {
    const file = event.target.files && event.target.files[0]

    if (file) {
      const reader = new FileReader()

      reader.onloadend = () => {
        console.log('reader.onloadend')
      }
      reader.readAsDataURL(file)
    }
  }

  const handleLogout = () => {
    console.log('handleLogout')
  }

  const handleChangeName = () => {
    setShowTextField(true)
  }

  return (
    <Profile
      name={'Sergey'}
      email={'sergey.ose.pyatigorsk@gmail.com'}
      src={img}
      handleChangeAvatar={handleChangeAvatar}
      handleLogout={handleLogout}
      showTextField={showTextField}
      handleChangeName={handleChangeName}
      onSubmit={data => {
        console.log(data)
        setShowTextField(false)
      }}
    />
  )
}
