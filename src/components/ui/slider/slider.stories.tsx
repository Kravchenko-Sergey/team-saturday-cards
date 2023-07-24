import { useState } from 'react'

import * as SliderRadix from '@radix-ui/react-slider'
import type { Meta } from '@storybook/react'

import { Slider } from './index'

import s from 'components/ui/slider/slider.module.scss'

const meta = {
  title: 'Components/UI/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    value: [],
    onValueChange: {},
    onValueCommit: {},
    min: {},
    max: {},
    step: {},
  },
} satisfies Meta<typeof Slider>

export default meta

export const Default = () => {
  const [values, setValues] = useState<number[]>([25, 75])

  const handleSliderValueChange = (e: any) => {
    setValues(e)
  }

  const handleSliderValueCommitChange = (e: any) => {
    setValues(e)
  }

  return (
    <div className={s.container}>
      <span className={s.value}>{values[0]}</span>
      <SliderRadix.Root
        className={s.root}
        value={values}
        onValueChange={handleSliderValueChange}
        onValueCommit={handleSliderValueCommitChange}
        min={0}
        max={100}
        step={1}
      >
        <SliderRadix.Track className={s.track}>
          <SliderRadix.Range className={s.range} />
        </SliderRadix.Track>
        <SliderRadix.Thumb className={s.thumb} />
        <SliderRadix.Thumb className={s.thumb} />
      </SliderRadix.Root>
      <span className={s.value}>{values[1]}</span>
    </div>
  )
}
