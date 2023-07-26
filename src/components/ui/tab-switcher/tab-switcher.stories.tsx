import type { Meta, StoryObj } from '@storybook/react'

import s from './tab-switcher.module.scss'

import { TabSwitcher, TabSwitcherItem } from './'

import { Typography } from 'components/ui/typography'

const meta = {
  title: 'Components/UI/TabSwitcher',
  component: TabSwitcher,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof TabSwitcher>

export default meta
type Story = StoryObj<typeof meta>

const onClickHandler1 = () => {
  console.log('onClickHandler1')
}
const onClickHandler2 = () => {
  console.log('onClickHandler2')
}

export const Default: Story = {
  args: {
    title: 'Show packs cards',
    children: (
      <>
        <TabSwitcherItem value={'tab1'} onClick={onClickHandler1} className={s.tabsTrigger}>
          <Typography variant="body1">Account</Typography>
        </TabSwitcherItem>
        <TabSwitcherItem value={'tab2'} onClick={onClickHandler2} className={s.tabsTrigger}>
          <Typography variant="body1">Password</Typography>
        </TabSwitcherItem>
      </>
    ),
  },
}
