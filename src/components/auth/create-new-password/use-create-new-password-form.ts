import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

const CreateNewPasswordSchema = z.object({
  password: z.string().trim().nonempty().min(3),
})

export type CreateNewPasswordSchemaType = z.infer<typeof CreateNewPasswordSchema>

type OnSubmitType = (data: CreateNewPasswordSchemaType) => void

export const useCreateNewPasswordForm = (onSubmit: OnSubmitType) => {
  const { handleSubmit, ...rest } = useForm<CreateNewPasswordSchemaType>({
    resolver: zodResolver(CreateNewPasswordSchema),
    mode: 'onSubmit',
  })

  return { handleSubmit: handleSubmit(onSubmit), ...rest }
}
