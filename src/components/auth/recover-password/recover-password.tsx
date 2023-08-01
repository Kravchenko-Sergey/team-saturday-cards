import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { FormValues, recoverPasswordSchema } from './'

import Button from 'components/ui/button/button.tsx'
import { Card } from 'components/ui/card'
import { ControlledTextField } from 'components/ui/controlled'
import { Typography } from 'components/ui/typography'

// eslint-disable-next-line
import s from './recover-password.module.scss'

type Props = {
  onSubmit: (data: FormValues) => void
}
export const RecoverPassword = (props: Props) => {
  const { handleSubmit, control } = useForm<FormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(recoverPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  return (
    <Card className={s.card}>
      <Typography variant={'large'} as={'h1'} className={s.title}>
        Forgot your password?
      </Typography>
      <form onSubmit={handleSubmit(props.onSubmit)}>
        <ControlledTextField name={'email'} label={'Email'} type={'email'} control={control} />
        <Typography variant={'body2'} as={'div'} className={s.description}>
          Enter your email address and we will send you further instructions
        </Typography>
        <Button type={'submit'} fullWidth>
          <Typography variant={'subtitle2'}>Send Instructions</Typography>
        </Button>
      </form>
      <Typography variant={'body2'} as={'div'} className={s.caption}>
        Did you remember your password?
      </Typography>
      <Typography variant={'body2'} as={Link} to={'/sign-in'} className={s.signInLink}>
        Try logging in
      </Typography>
    </Card>
  )
}
