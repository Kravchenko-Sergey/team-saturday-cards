import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { TextField, TextFieldProps } from 'components/ui/text-field'

type ControlledTextFieldProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<TextFieldProps, 'onChange' | 'value' | 'name'>
export const ControlledTextField = <T extends FieldValues>({
  control,
  name,
  rules,
  shouldUnregister,
  defaultValue,
  ...textFieldProps
}: ControlledTextFieldProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
    rules,
    shouldUnregister,
    defaultValue,
  })

  return <TextField {...textFieldProps} {...field} error={error?.message} />
}
