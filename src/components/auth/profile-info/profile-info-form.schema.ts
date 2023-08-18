import z from 'zod'

export const profileSchema = z.object({
  email: z.string(),
  name: z.string().trim().nonempty('Enter your name'),
})

export type ProfileSchemaType = z.infer<typeof profileSchema>
