import { ComponentPropsWithoutRef, MouseEventHandler } from 'react'

import s from './table-header.module.scss'

import { ArrowDown, ArrowUp } from 'assets/icons'
import { TableHead, TableRow } from 'components/ui/table'

export type Sort = {
  key: string | null
  direction: 'asc' | 'desc'
} | null

export type Column = {
  key: string
  title: string
  isSortable?: boolean
}

const dataAttributes = {
  sortable: 'data-sortable',
  name: 'data-name',
} as const

type TableHeaderProps = Omit<
  ComponentPropsWithoutRef<'thead'> & {
    columns: Column[]
    onSort: (sort: Sort) => void
    sort: Sort
  },
  'children'
>

export const TableHeader = ({ columns, onSort, sort }: TableHeaderProps) => {
  const handleSort: MouseEventHandler<HTMLTableRowElement> = e => {
    if (!(e.target instanceof HTMLTableCellElement)) return
    const isSortable = e.target.getAttribute(dataAttributes.sortable)
    const key = e.target.getAttribute(dataAttributes.name)

    if (!onSort || !isSortable) return

    if (sort?.key !== key) return onSort({ key, direction: 'asc' })

    if (sort.direction === 'desc') return onSort(null)

    return onSort({
      key,
      direction: sort?.direction === 'asc' ? 'desc' : 'asc',
    })
  }

  return (
    <thead className={s.root}>
      <TableRow onClick={handleSort}>
        {columns.map(column => {
          const showSort = column.isSortable && sort && sort.key === column.key

          return (
            <TableHead
              {...{
                [dataAttributes.sortable]: column.isSortable,
                [dataAttributes.name]: column.key,
              }}
              data-sortable={column.isSortable}
              data-name={column.key}
              key={column.key}
              className={s.headCell}
            >
              {column.title}{' '}
              {showSort && <span>{sort.direction === 'asc' ? <ArrowUp /> : <ArrowDown />}</span>}
            </TableHead>
          )
        })}
      </TableRow>
    </thead>
  )
}
