import { FC, ReactNode } from 'react'

import * as Tabs from '@radix-ui/react-tabs'

import s from './tab-switcher.module.scss'

import { Typography } from 'components/ui/typography'

type TabSwitcherProps = {
  title: string
  children: ReactNode
}

export const TabSwitcher: FC<TabSwitcherProps> = ({ title, children }) => {
  return (
    <div>
      <Typography variant="body2" className={s.title}>
        {title}
      </Typography>
      <Tabs.Root className={s.tabsRoot} defaultValue="tab1">
        <Tabs.List className={s.tabsList}>{children}</Tabs.List>
      </Tabs.Root>
    </div>
  )
}

type TabSwitcherItemProps = {
  children: ReactNode
  value: string
  className: string
  onClick?: () => void
}

export const TabSwitcherItem: FC<TabSwitcherItemProps> = ({
  children,
  value,
  className,
  onClick,
}) => {
  return (
    <Tabs.Trigger value={value} className={className} onClick={onClick}>
      {children}
    </Tabs.Trigger>
  )
}
