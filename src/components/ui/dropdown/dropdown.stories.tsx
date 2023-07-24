import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import type { Meta, StoryObj } from '@storybook/react'

import { Dropdown, DropdownItem, DropdownItemWithIcon } from './'

import { LogOutOutline, PersonOutline } from 'assets/icons'
import { Avatar } from 'components/ui/avatar'
import s from 'components/ui/dropdown/dropdown.module.scss'
import { Typography } from 'components/ui/typography'

const meta = {
  title: 'Components/UI/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    trigger: {},
    children: {},
  },
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

const src =
  'https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg'

export const Default: Story = {
  args: {
    trigger: (
      <>
        <Typography variant={'subtitle1'} className={s.name}>
          Sergey
        </Typography>
        <Avatar src={src} name={'avatar'} size={36} />
      </>
    ),
    children: (
      <>
        <DropdownItem disabled>
          <div className={`${s.item} ${s.head}`}>
            <Avatar src={src} name={'avatar'} size={36} />
            <div className={s.info}>
              <Typography variant={'subtitle2'} className={s.name}>
                Sergey
              </Typography>
              <Typography variant={'caption'} className={s.email}>
                sergey.ose.pyatigorsk@gmail.com
              </Typography>
            </div>
          </div>
        </DropdownItem>
        <DropdownMenu.Separator className={s.separator} />
        <DropdownItemWithIcon icon={<PersonOutline />} text={'Profile'} />
        <DropdownMenu.Separator className={s.separator} />
        <DropdownItemWithIcon icon={<LogOutOutline />} text={'Logout'} />
      </>
    ),
  },
}
