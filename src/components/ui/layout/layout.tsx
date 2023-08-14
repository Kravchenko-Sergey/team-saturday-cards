import { Link, Outlet, useNavigate } from 'react-router-dom'

import s from './layout.module.scss'

import { useLogoutMutation } from '@/services/auth/auth.api.ts'
import { Logo, LogOutOutline, PersonOutline } from 'assets/icons'
import { Avatar } from 'components/ui/avatar'
import { Dropdown, DropdownItem, DropdownItemWithIcon } from 'components/ui/dropdown'
import { Header } from 'components/ui/layout/header'
import { Typography } from 'components/ui/typography'

export const Layout = () => {
  const navigate = useNavigate()

  const [logout] = useLogoutMutation()

  return (
    <div className={s.container}>
      <Header>
        <div className={s.content}>
          <Link to={'/'}>
            <Logo />
          </Link>
          <Dropdown
            trigger={
              <div className={s.trigger}>
                <Typography variant="subtitle1">Sergey</Typography>
                <Avatar
                  src={
                    'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png'
                  }
                  name={'Sergey'}
                  size={36}
                />
              </div>
            }
          >
            {
              <>
                <DropdownItem disabled className={s.item}>
                  <>
                    <Avatar
                      src={
                        'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png'
                      }
                      name={'avatar'}
                      size={36}
                    />
                    <div>
                      <Typography variant={'subtitle2'}>Sergey</Typography>
                      <Typography variant={'caption'}>sergey.ose.pyatigorsk@gmail.com</Typography>
                    </div>
                  </>
                </DropdownItem>
                <DropdownItemWithIcon
                  icon={<PersonOutline />}
                  text={'Profile'}
                  onSelect={() => navigate('/profile')}
                />
                <DropdownItemWithIcon
                  icon={<LogOutOutline />}
                  text={'Logout'}
                  onSelect={() => logout({})}
                />
              </>
            }
          </Dropdown>
        </div>
      </Header>

      <main className={s.main}>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  )
}
