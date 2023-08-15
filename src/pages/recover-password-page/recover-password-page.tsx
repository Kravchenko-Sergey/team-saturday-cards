import s from './recover-password-page.module.scss'

import { useSendEmailMutation } from '@/services/auth/auth.api.ts'
import { RecoverPassword } from 'components/auth/recover-password'
export const RecoverPasswordPage = () => {
  const [sendEmail] = useSendEmailMutation()

  return (
    <div className={s.container}>
      <RecoverPassword onSubmit={sendEmail} />
    </div>
  )
}
