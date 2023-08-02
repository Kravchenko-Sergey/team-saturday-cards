import { ChangeEvent, FC } from 'react'

import s from './profile.module.scss'

import { EditOutline, LogOutOutline } from 'assets/icons'
import { ProfileSchemaType, useProfileForm } from 'components/auth/profile/use-profile-form.ts'
import { Avatar } from 'components/ui/avatar/avatar.tsx'
import Button from 'components/ui/button/button.tsx'
import { Card } from 'components/ui/card'
import { ControlledTextField } from 'components/ui/controlled'
import { Typography } from 'components/ui/typography'

type ProfileProps = {
  name: string
  email: string
  src: string
  handleChangeAvatar: (event: ChangeEvent<HTMLInputElement>) => void
  handleLogout: () => void
  showTextField: boolean
  handleChangeName: () => void
  onSubmit: (data: ProfileSchemaType) => void
}

export const Profile: FC<ProfileProps> = ({
  name,
  email,
  src,
  handleChangeAvatar,
  handleLogout,
  handleChangeName,
  showTextField,
  onSubmit,
}) => {
  const { handleSubmit, control } = useProfileForm(onSubmit)

  return (
    <Card className={s.card}>
      <Typography variant="large" className={s.title}>
        Personal Information
      </Typography>
      <div className={s.imgBlock}>
        <Avatar src={src} name="user" size={96} />
        <label>
          <input
            type="file"
            accept="image/*"
            onChange={handleChangeAvatar}
            style={{ display: 'none' }}
          />
          <Button variant="secondary" as={'span'} className={s.img}>
            <EditOutline />
          </Button>
        </label>
      </div>
      {!showTextField ? (
        <>
          <Typography variant="h1" className={s.name}>
            {name} <EditOutline onClick={handleChangeName} />
          </Typography>
          <Typography variant="body2" className={s.email}>
            {email}
          </Typography>
          <Button variant="secondary" onClick={handleLogout} className={s.logoutBtn}>
            <LogOutOutline /> <Typography>Logout</Typography>
          </Button>
        </>
      ) : (
        <form onSubmit={handleSubmit} className={s.form}>
          <ControlledTextField label="Nickname" name="nickName" control={control} defaultValue="" />
          <Button className={s.submitBtn} fullWidth>
            Save Changes
          </Button>
        </form>
      )}
    </Card>
  )
}
