import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

const ProfileSchema = z.object({
  nickName: z.string().trim().nonempty('Enter your name'),
})

export type ProfileSchemaType = z.infer<typeof ProfileSchema>

type OnSubmitType = (data: ProfileSchemaType) => void

export const useProfileForm = (onSubmit: OnSubmitType) => {
  const { handleSubmit, ...rest } = useForm<ProfileSchemaType>({
    resolver: zodResolver(ProfileSchema),
    mode: 'onSubmit',
  })

  return { handleSubmit: handleSubmit(onSubmit), ...rest }
}
