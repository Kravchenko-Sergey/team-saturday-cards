import { useParams } from 'react-router-dom'

import s from './create-new-password-page.module.scss'

import { useResetPasswordMutation } from '@/services/auth/auth.api.ts'
import { CreateNewPassword } from 'components/auth/create-new-password'

export const CreateNewPasswordPage = () => {
  const { token } = useParams()

  const [resetPassword] = useResetPasswordMutation()

  return (
    <div className={s.container}>
      <CreateNewPassword onSubmit={resetPassword} token={token} />
    </div>
  )
}
