import { FC, ReactNode } from 'react'

type TablesProps = {
  children: ReactNode
}
export const Tables: FC<TablesProps> = ({ children }) => {
  return <td>{children}</td>
}
