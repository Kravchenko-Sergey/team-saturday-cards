import { z } from 'zod'

export const updateCardSchema = z.object({
  question: z.string().min(3).max(30),
  answer: z.string().min(3).max(30),
})

export type editCard = z.infer<typeof updateCardSchema>
