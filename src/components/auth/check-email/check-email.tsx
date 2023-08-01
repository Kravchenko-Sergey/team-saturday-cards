import { FC } from 'react'

import { Link } from 'react-router-dom'

import s from './check-email.module.scss'

import CheskEmail from 'assets/icons/chesk-email.tsx'
import Button from 'components/ui/button/button.tsx'
import { Card } from 'components/ui/card'
import { Typography } from 'components/ui/typography'

type CheckEmailProps = { email: string }

export const CheckEmail: FC<CheckEmailProps> = ({ email }) => {
  return (
    <Card className={s.card}>
      <Typography variant="large" as="h1" className={s.title}>
        Check Email
      </Typography>
      <CheskEmail className={s.emailImage} />
      <Typography
        variant="body2"
        className={s.description}
      >{`We’ve sent an Email with instructions to ${email}`}</Typography>
      <Button as={Link} to={''} fullWidth>
        <Typography variant="body2">Back to Sign in</Typography>
      </Button>
    </Card>
  )
}
