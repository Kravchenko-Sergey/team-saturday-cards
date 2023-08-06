import { useState } from 'react'

import s from '@/pages/decks/decks.module.scss'
import { EditOutline, TrashOutline } from 'assets/icons'
import Button from 'components/ui/button/button.tsx'
import { Grade } from 'components/ui/grade'
import { Table, TableBody, TableCell, TableRow } from 'components/ui/table'
import { Column, Sort, TableHeader } from 'components/ui/table/table-header'
import { TextField } from 'components/ui/text-field'
import { Typography } from 'components/ui/typography'

export const Cards = () => {
  const data = [
    {
      question: 'How "This" works in JavaScript?',
      answer: 'This is how "This" works in JavaScript',
      updated: '2023-07-07',
      createdBy: 'John Doe',
    },
    {
      question: 'How "This" works in JavaScript?',
      answer: 'This is how "This" works in JavaScript',
      updated: '2023-07-06',
      createdBy: 'Jane Smith',
    },
    {
      question: 'How "This" works in JavaScript?',
      answer: 'This is how "This" works in JavaScript',
      updated: '2023-07-05',
      createdBy: 'Alice Johnson',
    },
    {
      question: 'How "This" works in JavaScript?',
      answer: 'This is how "This" works in JavaScript',
      updated: '2023-07-07',
      createdBy: 'Bob Anderson',
    },
    {
      question: 'How "This" works in JavaScript?',
      answer: 'This is how "This" works in JavaScript',
      updated: '2023-07-04',
      createdBy: 'Emma Davis',
    },
    {
      question: 'How "This" works in JavaScript?',
      answer: 'This is how "This" works in JavaScript',
      updated: '2023-07-07',
      createdBy: 'John Doe',
    },
    {
      question: 'How "This" works in JavaScript?',
      answer: 'This is how "This" works in JavaScript',
      updated: '2023-07-06',
      createdBy: 'Jane Smith',
    },
    {
      question: 'How "This" works in JavaScript?',
      answer: 'This is how "This" works in JavaScript',
      updated: '2023-07-05',
      createdBy: 'Alice Johnson',
    },
    {
      question: 'How "This" works in JavaScript?',
      answer: 'This is how "This" works in JavaScript',
      updated: '2023-07-07',
      createdBy: 'Bob Anderson',
    },
  ]
  const [sort, setSort] = useState<Sort>(null)

  console.log(sort)

  const columns: Column[] = [
    {
      key: 'Question',
      title: 'Question',
      isSortable: true,
    },
    {
      key: 'Answer',
      title: 'Answer',
      isSortable: true,
    },
    {
      key: 'Last Updated',
      title: 'Last Updated',
      isSortable: true,
    },
    {
      key: 'Grade',
      title: 'Grade',
    },
    {
      key: 'options',
      title: '',
    },
  ]

  return (
    <div className={s.container}>
      <div className={s.titleBlock}>
        <Typography variant="large">My Pack</Typography>
        <Button>Add New Card</Button>
      </div>
      <TextField search placeholder="Input search" />
      <Table className={s.table}>
        <TableHeader columns={columns} onSort={setSort} sort={sort} />
        <TableBody>
          {data.length === 0 && <div>empty</div>}
          {data.map(item => (
            <TableRow key={item.question}>
              <TableCell className={s.tableCell}>{item.question}</TableCell>
              <TableCell className={s.tableCell}>{item.answer}</TableCell>
              <TableCell className={s.tableCell}>{item.updated}</TableCell>
              <TableCell className={s.tableCell}>
                <Grade value={5} onClick={() => {}} />
              </TableCell>
              <TableCell className={s.tableCell}>
                <div className={s.iconsBlock}>
                  <EditOutline />
                  <TrashOutline />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
