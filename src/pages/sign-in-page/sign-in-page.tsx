import { Navigate, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

import s from './sign-in.module.scss'

import { useLoginMutation, useMeQuery } from '@/services/auth/auth.api.ts'
import { SignIn, signInFormValues } from 'components/auth/sign-in'
import 'react-toastify/dist/ReactToastify.css'

export const SignInPage = () => {
  const { data, isLoading } = useMeQuery()
  const [signIn, { isLoading: isSigningIn }] = useLoginMutation()
  const navigate = useNavigate()

  if (isLoading) return <span className={s.loader}></span>
  if (data) return <Navigate to="/" />

  const handleSignIn = (data: signInFormValues) => {
    signIn(data)
      .unwrap()
      .then(() => {
        navigate('/')
      })
      .catch(e => {
        e.status === 'FETCH_ERROR'
          ? toast.error('No internet connection')
          : toast.error(e.data.message)
      })
  }

  return (
    <div className={s.container}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <SignIn onSubmit={handleSignIn} isSubmitting={isSigningIn} />
    </div>
  )
}
