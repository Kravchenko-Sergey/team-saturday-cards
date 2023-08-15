import s from './check-emale-page.module.scss'

import { useMeQuery } from '@/services/auth/auth.api.ts'
import { CheckEmail } from 'components/auth/check-email'

export const CheckEmailPage = () => {
  const { data } = useMeQuery()

  return (
    <div className={s.container}>
      <CheckEmail email={data?.email} />
    </div>
  )
}
