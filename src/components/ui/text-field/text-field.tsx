import { ComponentProps, ComponentPropsWithoutRef, useState } from 'react'

import s from './text-field.module.scss'

import CloseOutline from 'assets/icons/close-outline.tsx'
import EyeOffOutline from 'assets/icons/eye-off-outline.tsx'
import EyeOutline from 'assets/icons/eye-outline.tsx'
import SearchOutline from 'assets/icons/search-outline.tsx'
import { Typography } from 'components/ui/typography'

export type TextFieldProps = {
  error?: string
  label?: string
  search?: boolean
  className?: string
  onClearClick?: () => void
} & ComponentPropsWithoutRef<'input'>

export const TextField = (
  props: TextFieldProps & Omit<ComponentPropsWithoutRef<'input'>, keyof TextFieldProps>
) => {
  const { search = false, label, disabled, type, error, onClearClick, ...rest } = props

  const [showPassword, setShowPassword] = useState<boolean>(false)

  const isShowPasswordButton = type === 'password' && !search
  // @ts-ignore
  const isShowClearButton = onClearClick && rest?.value?.length! > 0 && search

  const finalType = getFinalType(search, type, showPassword)

  return (
    <div className={s.root}>
      <Typography variant={'body2'} as={'label'} className={`${s.label} ${disabled && s.disabled}`}>
        {label}
      </Typography>
      <div className={`${s.inputContainer} ${error ? s.error : ''} ${disabled && s.disabled}`}>
        {search && (
          <span className={s.icon}>
            <SearchOutline />
          </span>
        )}

        <input
          className={`${s.input} ${error ? s.error : ''}`}
          type={finalType}
          disabled={disabled}
          {...rest}
        />
        {isShowPasswordButton && (
          <button
            className={s.icon}
            type={'button'}
            onClick={() => setShowPassword(prev => !prev)}
            disabled={disabled}
          >
            {showPassword ? <EyeOutline /> : <EyeOffOutline />}
          </button>
        )}
        {isShowClearButton && (
          <button className={s.icon} type={'button'} onClick={onClearClick} disabled={disabled}>
            <CloseOutline />
          </button>
        )}
      </div>
      <Typography variant={'caption'} as={'div'} className={s.error}>
        {error}
      </Typography>
    </div>
  )
}

function getFinalType(
  search: boolean | undefined,
  type: ComponentProps<'input'>['type'],
  showPassword: boolean
) {
  if (type === 'password' && showPassword && !search) {
    return 'text'
  }

  return type
}
