import s from './sign-up-page.module.scss'

import { useSignUpMutation } from '@/services/auth/auth.api.ts'
import { SignUp } from 'components/auth/sign-up'

export const SignUpPage = () => {
  const [signUp] = useSignUpMutation()

  return (
    <div className={s.container}>
      <SignUp onSubmit={signUp} />
    </div>
  )
}
