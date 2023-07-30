import { FC, ReactNode } from 'react'

import * as SelectRadix from '@radix-ui/react-select'

import Down from '../../../assets/icons/arrow-down.tsx'

import s from './select.module.scss'

import { Typography } from 'components/ui/typography'

export type SelectProps = {
  label?: string
  placeholder?: ReactNode
  value?: string
  onValueChange?: (value: string) => void
  defaultValue?: string
  options: Array<{ label: string; value: string }>
  disabled?: boolean
  required?: boolean
}

export const Select: FC<SelectProps> = ({
  defaultValue,
  options,
  value,
  onValueChange,
  disabled,
  required,
  placeholder,
  label,
}) => {
  return (
    <Typography variant={'body1'} as={'label'}>
      <Typography variant={'body2'} as={'span'} className={`${s.label} ${disabled && s.disabled}`}>
        {label}
      </Typography>
      <SelectRadix.Root
        defaultValue={defaultValue}
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        required={required}
      >
        <SelectRadix.Trigger asChild className={s.trigger} tabIndex={0}>
          <div>
            <SelectRadix.Value placeholder={placeholder} />
            <SelectRadix.Icon asChild className={s.icon}>
              <Down />
            </SelectRadix.Icon>
          </div>
        </SelectRadix.Trigger>

        <SelectRadix.Portal>
          <SelectRadix.Content position={'popper'} className={s.content} sideOffset={-1}>
            <SelectRadix.Viewport>
              {options.map(el => (
                <SelectRadix.Item key={el.value} value={el.value} className={s.item}>
                  <SelectRadix.ItemText>{el.label}</SelectRadix.ItemText>
                </SelectRadix.Item>
              ))}
            </SelectRadix.Viewport>
          </SelectRadix.Content>
        </SelectRadix.Portal>
      </SelectRadix.Root>
    </Typography>
  )
}
