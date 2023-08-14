import { useState } from 'react'

import { useMeQuery } from '@/services/auth/auth.api.ts'
import { ProfileInfo } from 'components/auth/profile-info'

export const Profile = () => {
  const [showTextField, setShowTextField] = useState(false)

  const { data } = useMeQuery()

  return (
    <>
      <ProfileInfo
        name={data.name}
        email={data.email}
        src={
          'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png'
        }
        handleChangeName={() => {
          setShowTextField(true)
        }}
        handleChangeAvatar={() => {}}
        showTextField={showTextField}
        onSubmit={() => {
          setShowTextField(false)
        }}
        handleLogout={() => {}}
      />
    </>
  )
}
