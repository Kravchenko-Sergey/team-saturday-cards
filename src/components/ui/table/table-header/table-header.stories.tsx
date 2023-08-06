import { useState } from 'react'

import { Meta } from '@storybook/react'

import s from '@/pages/decks/decks.module.scss'
import { Decks } from '@/pages/decks/decks.tsx'
import { Table, TableBody, TableCell, TableRow } from 'components/ui/table'
import { Column, Sort, TableHeader } from 'components/ui/table/table-header'

const meta = {
  title: 'Pages/Decks',
  component: Decks,
  tags: ['autodocs'],
} satisfies Meta<typeof Decks>

const data = [
  {
    title: 'Project A',
    cardsCount: 10,
    updated: '2023-07-07',
    createdBy: 'John Doe',
  },
  {
    title: 'Project B',
    cardsCount: 5,
    updated: '2023-07-06',
    createdBy: 'Jane Smith',
  },
  {
    title: 'Project C',
    cardsCount: 8,
    updated: '2023-07-05',
    createdBy: 'Alice Johnson',
  },
  {
    title: 'Project D',
    cardsCount: 3,
    updated: '2023-07-07',
    createdBy: 'Bob Anderson',
  },
  {
    title: 'Project E',
    cardsCount: 12,
    updated: '2023-07-04',
    createdBy: 'Emma Davis',
  },
]

export const WithSort = {
  render: () => {
    const [sort, setSort] = useState<Sort>(null)

    const sortString = sort ? `${sort.key}-${sort.direction}` : null

    console.log(sortString)

    const columns: Column[] = [
      {
        key: 'name',
        title: 'Name',
        isSortable: true,
      },
      {
        key: 'cardsCount',
        title: 'Cards',
        isSortable: true,
      },
      {
        key: 'updated',
        title: 'Last Updated',
        isSortable: true,
      },
      {
        key: 'createdBy',
        title: 'Created by',
        isSortable: true,
      },
      {
        key: 'options',
        title: '',
      },
    ]

    console.log(sort)

    return (
      <Table className={s.table}>
        <TableHeader columns={columns} onSort={setSort} sort={sort} />
        <TableBody>
          {data.map(item => (
            <TableRow key={item.title}>
              <TableCell className={s.tableCell}>{item.title}</TableCell>
              <TableCell className={s.tableCell}>{item.cardsCount}</TableCell>
              <TableCell className={s.tableCell}>{item.updated}</TableCell>
              <TableCell className={s.tableCell}>{item.createdBy}</TableCell>
              <TableCell className={s.tableCell}>icons...</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  },
}

export default meta
