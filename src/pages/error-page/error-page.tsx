import { Link } from 'react-router-dom'

import s from './error-page.module.scss'

import { NotFound } from 'assets/icons'
import Button from 'components/ui/button/button.tsx'
import { Typography } from 'components/ui/typography'

export const ErrorPage = () => {
  return (
    <div className={s.container}>
      <NotFound className={s.image} />
      <Typography className={s.description}>Sorry! Page not found!</Typography>
      <Button as={Link} to={'/'}>
        Back to home page
      </Button>
    </div>
  )
}
