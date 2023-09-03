import { toast, ToastContainer } from 'react-toastify'

import s from './sign-up-page.module.scss'

import { useSignUpMutation } from '@/services/auth/auth.api.ts'
import { SignUp } from 'components/auth/sign-up'

import 'react-toastify/dist/ReactToastify.css'

export const SignUpPage = () => {
  const [signUp] = useSignUpMutation()

  const handleSignUp = (data: { email: string; password: string }) => {
    signUp(data)
      .unwrap()
      .then()
      .catch(e =>
        e.status === 'FETCH_ERROR'
          ? toast.error('No internet connection')
          : toast.error(e.data.errorMessages[0])
      )
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
      <SignUp onSubmit={handleSignUp} />
    </div>
  )
}
