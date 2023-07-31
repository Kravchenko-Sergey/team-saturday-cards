import { z } from 'zod'

export const signUpSchema = z
  .object({
    email: z.string().nonempty('Enter email').email('Invalid email address'),
    password: z.string().min(3, 'Password must contain at least 3 character(s)'),
    confirmPassword: z.string().min(3, 'Password must contain at least 3 character(s)'),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export type FormValues = z.infer<typeof signUpSchema>
