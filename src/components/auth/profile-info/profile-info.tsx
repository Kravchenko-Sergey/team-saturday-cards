import { ChangeEvent, FC } from 'react'

import { EditOutline, LogOutOutline } from 'assets/icons'
import s from 'components/auth/profile-info/profile-info.module.scss'
import {
  ProfileSchemaType,
  useProfileInfoForm,
} from 'components/auth/profile-info/use-profile-info-form.ts'
import { Avatar } from 'components/ui/avatar/avatar.tsx'
import Button from 'components/ui/button/button.tsx'
import { Card } from 'components/ui/card'
import { ControlledTextField } from 'components/ui/controlled'
import { Typography } from 'components/ui/typography'

type ProfileInfoProps = {
  name: string
  email: string
  src: string
  handleChangeAvatar: (event: ChangeEvent<HTMLInputElement>) => void
  handleLogout: () => void
  showTextField: boolean
  handleChangeName: () => void
  onSubmit: (data: ProfileSchemaType) => void
}

export const ProfileInfo: FC<ProfileInfoProps> = ({
  name,
  email,
  src,
  handleChangeAvatar,
  handleLogout,
  handleChangeName,
  showTextField,
  onSubmit,
}) => {
  const { handleSubmit, control } = useProfileInfoForm(onSubmit)

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
