import { FC } from 'react'

import * as SliderRadix from '@radix-ui/react-slider'

import s from './slider.module.scss'

type SliderProps = {
  value: number[]
  onValueChange: (value: number[]) => void
  onValueCommit: (value: number[]) => void
  min: number
  max: number
  step: number
}

export const Slider: FC<SliderProps> = ({
  value,
  onValueChange,
  onValueCommit,
  min,
  max,
  step,
}) => {
  return (
    <div className={s.container}>
      <span className={s.value}>{value[0]}</span>
      <SliderRadix.Root
        className={s.root}
        value={value}
        onValueChange={onValueChange}
        onValueCommit={onValueCommit}
        min={min}
        max={max}
        step={step}
      >
        <SliderRadix.Track className={s.track}>
          <SliderRadix.Range className={s.range} />
        </SliderRadix.Track>
        <SliderRadix.Thumb className={s.thumb} />
        <SliderRadix.Thumb className={s.thumb} />
      </SliderRadix.Root>
      <span className={s.value}>{value[1]}</span>
    </div>
  )
}
