import {
  useChangeProfileMutation,
  useLogoutMutation,
  useMeQuery,
} from '@/services/auth/auth.api.ts'
import { ProfileInfo } from 'components/auth/profile-info'

export const Profile = () => {
  const { data } = useMeQuery()
  const [logout] = useLogoutMutation()
  const [changeProfile] = useChangeProfileMutation()

  return (
    <ProfileInfo
      name={data.name}
      email={data.email}
      src={
        'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png'
      }
      handleChangeAvatar={() => {}}
      onSubmit={changeProfile}
      handleLogout={() => logout({})}
    />
  )
}
