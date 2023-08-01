import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { FormValues, signUpSchema } from './'

import Button from 'components/ui/button/button.tsx'
import { Card } from 'components/ui/card'
import { ControlledTextField } from 'components/ui/controlled'
import { Typography } from 'components/ui/typography'

// eslint-disable-next-line
import s from './sign-up.module.scss'

type Props = {
  onSubmit: (data: Omit<FormValues, 'confirmPassword'>) => void
}

export const SignUp = (props: Props) => {
  const { handleSubmit, control } = useForm<FormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const handleFormSubmit = handleSubmit(({ email, password }) => {
    props.onSubmit({ email, password })
  })

  return (
    <Card className={s.card}>
      <Typography variant={'large'} as={'h1'} className={s.title}>
        Sign Up
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <div className={s.fields}>
          <ControlledTextField name={'email'} control={control} label={'Email'} type={'email'} />
          <ControlledTextField
            name={'password'}
            control={control}
            label={'Password'}
            type={'password'}
          />
          <ControlledTextField
            name={'confirmPassword'}
            control={control}
            label={'Confirm password'}
            type={'password'}
          />
        </div>
        <Button fullWidth type={'submit'}>
          <Typography variant={'subtitle2'}>Sign Up</Typography>
        </Button>
      </form>
      <Typography variant={'body2'} as={'div'} className={s.caption}>
        Already have an account?
      </Typography>
      <Typography variant={'body2'} as={Link} to="/sign-in" className={s.signInLink}>
        Sign In
      </Typography>
    </Card>
  )
}
