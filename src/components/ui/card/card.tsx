import { ComponentPropsWithoutRef, FC } from 'react'

import s from './card.module.scss'

export type HeaderProps = ComponentPropsWithoutRef<'div'>

export const Card: FC<HeaderProps> = ({ className, ...rest }) => {
  return <header className={`${s.card} ${className}`} {...rest} />
}
