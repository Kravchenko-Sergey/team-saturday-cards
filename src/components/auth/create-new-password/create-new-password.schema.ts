import { z } from 'zod'

export const createNewPasswordSchema = z.object({
  token: z.any(),
  password: z.string().trim().nonempty().min(3),
})

export type FormValues = z.infer<typeof createNewPasswordSchema>
