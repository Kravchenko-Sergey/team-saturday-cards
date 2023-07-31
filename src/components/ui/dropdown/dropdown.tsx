import { ComponentPropsWithoutRef, FC, ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './dropdown.module.scss'

import { Typography } from 'components/ui/typography'

type DropdownProps = {
  trigger: ReactNode
  children: ReactNode
}

export const Dropdown: FC<DropdownProps> = ({ trigger, children }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>
      <DropdownMenu.Content className={s.content} sideOffset={10} align={'end'}>
        <div className={s.itemsBlock}>{children}</div>
        <DropdownMenu.Arrow className={s.arrow_block} asChild>
          <div className={s.arrow} />
        </DropdownMenu.Arrow>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export type DropdownItemProps = {
  children?: ReactNode
  disabled?: boolean
  onSelect?: () => void
  className?: string
}

export const DropdownItem: FC<DropdownItemProps> = ({ children, disabled, onSelect }) => {
  return (
    <DropdownMenu.Item className={s.item} disabled={disabled} onSelect={onSelect}>
      {children}
    </DropdownMenu.Item>
  )
}

export type DropdownItemWithIconProps = Omit<DropdownItemProps, 'children'> & {
  icon: ReactNode
  text: string
} & ComponentPropsWithoutRef<'div'>

export const DropdownItemWithIcon: FC<DropdownItemWithIconProps> = ({
  icon,
  disabled,
  onSelect,
  text,
  ...rest
}) => {
  return (
    <DropdownMenu.Item
      className={s.item}
      disabled={disabled}
      onSelect={onSelect}
      onClick={event => event.stopPropagation()}
      asChild
      {...rest}
    >
      <div>
        <div>{icon}</div>
        <Typography variant="caption">{text}</Typography>
      </div>
    </DropdownMenu.Item>
  )
}
