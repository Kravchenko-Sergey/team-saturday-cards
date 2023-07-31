import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { Checkbox, CheckboxProps } from 'components/ui/checkbox'

type ControlledCheckboxProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<CheckboxProps, 'onChange' | 'value'>
export const ControlledCheckbox = <T extends FieldValues>({
  control,
  name,
  rules,
  shouldUnregister,
  defaultValue,
  ...checkboxProps
}: ControlledCheckboxProps<T>) => {
  const {
    field: { value, onChange },
  } = useController({
    control,
    name,
    rules,
    shouldUnregister,
    defaultValue,
  })

  return <Checkbox {...{ checked: value, onChange, ...checkboxProps }} />
}
