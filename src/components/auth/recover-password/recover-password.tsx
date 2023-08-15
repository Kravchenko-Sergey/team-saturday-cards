import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { FormValues, recoverPasswordSchema } from './'

import Button from 'components/ui/button/button.tsx'
import { Card } from 'components/ui/card'
import { ControlledTextField } from 'components/ui/controlled'
import { Typography } from 'components/ui/typography'

// eslint-disable-next-line
import s from './recover-password.module.scss'

type Props = {
  onSubmit: (data: { html: string; email: string }) => any
}
export const RecoverPassword = (props: Props) => {
  const navigate = useNavigate()

  const { handleSubmit, control, getValues } = useForm<FormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(recoverPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = () => {
    props
      .onSubmit({
        html: "<h1>Hi, ##name##</h1><p>Click <a href='http://localhost:5173/set-new-password/##token##'>here</a> to recover your password</p><p>'##token##'</p>>",
        email: getValues().email,
      })
      .unwrap()
      .then(() => {
        navigate('/check-email')
      })
  }

  return (
    <Card className={s.card}>
      <Typography variant={'large'} as={'h1'} className={s.title}>
        Forgot your password?
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
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
