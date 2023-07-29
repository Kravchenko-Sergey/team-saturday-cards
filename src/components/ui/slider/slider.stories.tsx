import { useState } from 'react'

import type { Meta } from '@storybook/react'

import { Slider } from './index'

const meta = {
  title: 'Components/UI/Slider',
  component: Slider,
  tags: ['autodocs'],
} satisfies Meta<typeof Slider>

export default meta

export const Default = () => {
  const [values, setValues] = useState<number[]>([50])

  const handleSliderValueChange = (e: any) => {
    setValues(e)
  }

  const handleSliderValueCommitChange = (e: any) => {
    setValues(e)
  }

  return (
    <Slider
      value={values}
      onValueChange={handleSliderValueChange}
      onValueCommit={handleSliderValueCommitChange}
      min={0}
      max={100}
      step={1}
    />
  )
}

export const Multiple = () => {
  const [values, setValues] = useState<number[]>([25, 100])

  const handleSliderValueChange = (e: any) => {
    setValues(e)
  }

  const handleSliderValueCommitChange = (e: any) => {
    setValues(e)
  }

  return (
    <Slider
      value={values}
      onValueChange={handleSliderValueChange}
      onValueCommit={handleSliderValueCommitChange}
      multiple
      min={0}
      max={100}
      step={1}
    />
  )
}

export const Disabled = () => {
  const [values, setValues] = useState<number[]>([25, 100])

  const handleSliderValueChange = (values: number[]) => {
    setValues(values)
  }

  const handleSliderValueCommitChange = (values: number[]) => {
    setValues(values)
  }

  return (
    <Slider
      value={values}
      onValueChange={handleSliderValueChange}
      onValueCommit={handleSliderValueCommitChange}
      multiple
      disabled
      min={0}
      max={100}
      step={1}
    />
  )
}
