import { useDispatch } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'

import s from './layout.module.scss'

import { useLogoutMutation, useMeQuery } from '@/services/auth/auth.api.ts'
import { setAuthorId } from '@/services/decks/decks.slice.ts'
import { Logo, LogOutOutline, PersonOutline } from 'assets/icons'
import { Avatar } from 'components/ui/avatar'
import { Dropdown, DropdownItem, DropdownItemWithIcon } from 'components/ui/dropdown'
import { Header } from 'components/ui/layout/header'
import { Typography } from 'components/ui/typography'

export const Layout = () => {
  const dispatch = useDispatch()

  const changeAuthorId = (id: string) => dispatch(setAuthorId({ id }))

  const navigate = useNavigate()

  const { data } = useMeQuery()
  const [logout] = useLogoutMutation()

  const handleLogo = () => {
    changeAuthorId('')
  }

  return (
    <div>
      <Header>
        <div className={s.content}>
          <Link to={'/'} onClick={handleLogo}>
            <Logo />
          </Link>
          <Dropdown
            trigger={
              <div className={s.trigger}>
                <Typography variant="subtitle1">{data ? data.name : 'qwerty'}</Typography>
                <Avatar
                  src={
                    data
                      ? data.avatar
                      : 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png'
                  }
                  name={'Sergey'}
                  size={36}
                />
              </div>
            }
          >
            {
              <>
                <DropdownItem disabled>
                  <>
                    <Avatar
                      src={
                        data
                          ? data.avatar
                          : 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png'
                      }
                      name={'avatar'}
                      size={36}
                    />
                    <div>
                      <Typography variant={'subtitle2'}>{data ? data.name : 'qwerty'}</Typography>
                      <Typography variant={'caption'}>{data ? data.email : 'qwerty'}</Typography>
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
