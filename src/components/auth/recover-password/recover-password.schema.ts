import { z } from 'zod'

export const recoverPasswordSchema = z.object({
  html: z.any(),
  email: z.string().nonempty('Enter email').email('Invalid email address'),
})

export type FormValues = z.infer<typeof recoverPasswordSchema>
