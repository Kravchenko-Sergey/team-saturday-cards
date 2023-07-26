import { ComponentPropsWithoutRef, ElementType, ForwardedRef, forwardRef, ReactNode } from 'react'

import s from './button.module.scss'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link'
  fullWidth?: boolean
  className?: string
} & ComponentPropsWithoutRef<T>

const Button = <T extends ElementType = 'button'>(
  props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>,
  ref: ForwardedRef<HTMLButtonElement>
) => {
  const { variant = 'primary', fullWidth, className, as: Component = 'button', ...rest } = props

  return (
    <Component
      className={`${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className}`}
      {...rest}
      ref={ref}
    />
  )
}

export default forwardRef(Button)
