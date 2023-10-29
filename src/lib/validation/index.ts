import * as z from "zod"
export const SignUpValidation = z.object({
    username: z.string().min(5, { message: 'Too short' }).max(50),
    name: z.string().min(2, { message: 'Too short' }),
    email: z.string().email(),
    password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
})

export const SignInValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8, { message: 'Password must be at least 8 characters.' })
})