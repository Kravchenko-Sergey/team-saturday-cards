import { FC } from 'react'

import { Link } from 'react-router-dom'

import s from './create-new-password.module.scss'

import {
  CreateNewPasswordSchemaType,
  useCreateNewPasswordForm,
} from 'components/auth/create-new-password/use-create-new-password-form.ts'
import Button from 'components/ui/button/button.tsx'
import { Card } from 'components/ui/card'
import { ControlledTextField } from 'components/ui/controlled'
import { Typography } from 'components/ui/typography'

type CreateNewPasswordProps = {
  onSubmit: (data: CreateNewPasswordSchemaType) => void
}

export const CreateNewPassword: FC<CreateNewPasswordProps> = ({ onSubmit }) => {
  const { handleSubmit, control } = useCreateNewPasswordForm(onSubmit)

  return (
    <Card className={s.card}>
      <Typography variant={'large'} as={'h1'} className={s.title}>
        Create new password
      </Typography>
      <form onSubmit={handleSubmit}>
        <ControlledTextField
          name={'password'}
          label={'Password'}
          type={'password'}
          control={control}
        />
        <Typography variant={'body2'} className={s.description}>
          Create new password and we will send you further instructions to email
        </Typography>
        <Button as={Link} to={''} fullWidth>
          <Typography variant={'body2'}>Create New Password</Typography>
        </Button>
      </form>
    </Card>
  )
}
