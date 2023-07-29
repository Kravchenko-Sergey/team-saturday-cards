import { FC, ReactNode } from 'react'

import * as Tabs from '@radix-ui/react-tabs'
import { TabsTriggerProps } from '@radix-ui/react-tabs'

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

export const TabSwitcherItem: FC<TabsTriggerProps> = props => {
  return <Tabs.Trigger {...props} />
}
