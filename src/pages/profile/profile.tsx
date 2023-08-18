import { ChangeEvent, useState } from 'react'

import {
  useChangeProfileMutation,
  useLogoutMutation,
  useMeQuery,
} from '@/services/auth/auth.api.ts'
import { ProfileInfo } from 'components/auth/profile-info'

export const Profile = () => {
  const [showTextField, setShowTextField] = useState(false)
  const [ava, setAva] = useState<File | null>(null)

  const { currentData } = useMeQuery()
  const [logout] = useLogoutMutation()
  const [changeProfile] = useChangeProfileMutation()

  const handleFormSubmit = (data: { email: string; name: string }) => {
    setShowTextField(false)

    const form = new FormData()

    form.append('email', currentData.email)
    form.append('name', data.name)
    ava && form.append('avatar', ava)

    changeProfile(form)
  }

  const handleChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    setShowTextField(true)
    const file = e.target.files![0]

    setAva(file)
  }

  return (
    <ProfileInfo
      name={currentData.name}
      email={currentData.email}
      src={
        currentData
          ? currentData.avatar
          : 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png'
      }
      handleChangeAvatar={handleChangeAvatar}
      onSubmit={handleFormSubmit}
      handleLogout={() => logout({})}
      showTextField={showTextField}
      setShowTextField={setShowTextField}
    />
  )
}
