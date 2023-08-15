import { Navigate, useNavigate } from 'react-router-dom'

import s from './sign-in.module.scss'

import { useLoginMutation, useMeQuery } from '@/services/auth/auth.api.ts'
import { SignIn } from 'components/auth/sign-in'

export const SignInPage = () => {
  const { data, isLoading } = useMeQuery()
  const [signIn, { isLoading: isSigningIn }] = useLoginMutation()
  const navigate = useNavigate()

  if (isLoading) return <div>Loading...</div>
  if (data) return <Navigate to="/" />

  const handleSignIn = (data: any) => {
    signIn(data)
      .unwrap()
      .then(() => {
        navigate('/')
      })
  }

  return (
    <div className={s.container}>
      <SignIn onSubmit={handleSignIn} isSubmitting={isSigningIn} />
    </div>
  )
}
