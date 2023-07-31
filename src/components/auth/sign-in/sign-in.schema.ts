import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().nonempty('Enter email').email('Invalid email address'),
  password: z.string().min(3),
  rememberMe: z.boolean().optional(),
})

export type FormValues = z.infer<typeof signInSchema>
