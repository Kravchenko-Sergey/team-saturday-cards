import { FC } from 'react'

import s from '../avatar/avatar.module.scss'

type Props = {
  src: string
  name: string
  size?: number
}

export const Avatar: FC<Props> = ({ src, name, size = 36 }) => {
  return <img src={src} alt={`${name}-src`} className={s.avatar} width={size} height={size} />
}
