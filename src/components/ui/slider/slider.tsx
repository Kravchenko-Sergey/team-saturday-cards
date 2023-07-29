import { FC } from 'react'

import * as SliderRadix from '@radix-ui/react-slider'

import s from './slider.module.scss'

import { Typography } from 'components/ui/typography'

type SliderProps = {
  value: number[]
  onValueChange: (value: number[]) => void
  onValueCommit: (value: number[]) => void
  multiple?: boolean
  disabled?: boolean
  min: number
  max: number
  step: number
}

export const Slider: FC<SliderProps> = ({
  value,
  onValueChange,
  onValueCommit,
  multiple,
  disabled,
  min,
  max,
  step,
}) => {
  return (
    <div className={disabled ? s.disabled : s.container}>
      {value.length !== 1 && <Typography className={s.value}>{value[0]}</Typography>}
      <SliderRadix.Root
        className={s.root}
        value={value}
        onValueChange={onValueChange}
        onValueCommit={onValueCommit}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
      >
        <SliderRadix.Track className={s.track}>
          <SliderRadix.Range className={s.range} />
        </SliderRadix.Track>
        <SliderRadix.Thumb className={s.thumb} />
        {multiple && <SliderRadix.Thumb className={s.thumb} />}
      </SliderRadix.Root>
      <Typography className={s.value}>{value.length === 1 ? value[0] : value[1]}</Typography>
    </div>
  )
}
