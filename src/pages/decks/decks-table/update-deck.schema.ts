import { z } from 'zod'

export const updateDeckSchema = z.object({
  name: z.string().min(3).max(30),
  isPrivate: z.any(),
})

export type UpdateDeck = z.infer<typeof updateDeckSchema>
