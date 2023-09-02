import { z } from 'zod'

export const newDeckSchema = z.object({
  name: z.string().min(3).max(30),
  isPrivate: z.boolean(),
})

export type NewDeck = z.infer<typeof newDeckSchema>
