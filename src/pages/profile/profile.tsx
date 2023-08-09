import { useState } from 'react'

import { ProfileInfo } from 'components/auth/profile-info'

export const Profile = () => {
  const [showTextField, setShowTextField] = useState(false)

  return (
    <>
      <ProfileInfo
        name={'Sergey'}
        email={'sergey.ose.yatigorsk@gmail.com'}
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
