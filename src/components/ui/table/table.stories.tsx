import type { Meta, StoryObj } from '@storybook/react'

import { Table, TableBody, TableCell, TableFooter, TableHeader, TableRow } from './'

import { Grade } from 'components/ui/grade'
import s from 'components/ui/table/table.module.scss'

const meta = {
  title: 'Components/UI/Table',
  component: Table,
  tags: ['autodocs'],
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <TableHeader>
          <TableRow>
            <TableCell className={s.headCell}>Question</TableCell>
            <TableCell className={s.headCell}>Answer</TableCell>
            <TableCell className={s.headCell}>Last Updated</TableCell>
            <TableCell className={s.headCell}>Grade</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className={s.tableCell}>How This works in JavaScript?</TableCell>
            <TableCell className={s.tableCell}>This is how This works in JavaScript</TableCell>
            <TableCell className={s.tableCell}>18.03.2021</TableCell>
            <TableCell className={s.tableCell}>
              <Grade value={4} onClick={() => {}} />
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell className={s.tableCell}>How This works in JavaScript?</TableCell>
            <TableCell className={s.tableCell}>This is how This works in JavaScript</TableCell>
            <TableCell className={s.tableCell}>18.03.2021</TableCell>
            <TableCell className={s.tableCell}>
              <Grade value={2} onClick={() => {}} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={s.tableCell}>How This works in JavaScript?</TableCell>
            <TableCell className={s.tableCell}>This is how This works in JavaScript</TableCell>
            <TableCell className={s.tableCell}>18.03.2021</TableCell>
            <TableCell className={s.tableCell}>
              <Grade value={3} onClick={() => {}} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={s.tableCell}>How This works in JavaScript?</TableCell>
            <TableCell className={s.tableCell}>This is how This works in JavaScript</TableCell>
            <TableCell className={s.tableCell}>18.03.2021</TableCell>
            <TableCell className={s.tableCell}>
              <Grade value={0} onClick={() => {}} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={s.tableCell}>How This works in JavaScript?</TableCell>
            <TableCell className={s.tableCell}>This is how This works in JavaScript</TableCell>
            <TableCell className={s.tableCell}>18.03.2021</TableCell>
            <TableCell className={s.tableCell}>
              <Grade value={5} onClick={() => {}} />
            </TableCell>
          </TableRow>
        </TableFooter>
      </>
    ),
  },
}
