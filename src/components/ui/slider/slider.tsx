import { FC } from 'react'

import * as SliderRadix from '@radix-ui/react-slider'

import s from './slider.module.scss'

import { Typography } from 'components/ui/typography'

type SliderProps = SliderRadix.SliderProps & {
  multiple?: boolean
  value: number[]
  label: string
}

export const Slider: FC<SliderProps> = ({
  value,
  onValueChange,
  onValueCommit,
  multiple,
  disabled,
  label,
  min = 0,
  max = 100,
  step = 1,
}) => {
  return (
    <div className={disabled ? s.disabled : s.container}>
      {label && (
        <Typography variant="body2" className={s.label}>
          {label}
        </Typography>
      )}
      <div className={s.sliderBlock}>
        {value.length !== 1 && (
          <input
            type="number"
            value={value[0]}
            onChange={e => {
              if (Number(e.target.value) > max) return
              onValueChange!([Number(e.target.value), value[1]])
              e.target.value = String(Number(e.target.value))
            }}
            className={s.value}
          />
        )}
        <SliderRadix.Root
          className={s.root}
          value={value}
          onValueChange={newValue => {
            onValueChange!(newValue)
          }}
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
        <input
          type="number"
          value={value.length === 1 ? value[0] : value[1]}
          onChange={e => {
            if (Number(e.target.value) > max) return
            onValueChange!([value[0], Number(e.target.value)])
            e.target.value = String(Number(e.target.value))
          }}
          className={s.value}
        />
      </div>
    </div>
  )
}
