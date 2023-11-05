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

export const PostValidation = z.object({
    caption: z.string().min(5).max(2200),
    file: z.custom<File[]>(),
    location: z.string().min(2).max(2200),
    tags: z.string()
})

export const UpdateProfileValidation = z.object({
    name: z.string(),
    file: z.custom<File[]>(),
    username: z.string(),
    email: z.string().email(),
    bio: z.string().default('')
})