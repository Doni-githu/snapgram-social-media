import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignUpValidation } from '@/lib/validation'
import Loader from '@/components/shared/Loader'
import { Link } from 'react-router-dom'

type Type = 'username' | "name" | "email" | "password"
interface ITypeFormField {
  title: Type,
  type: 'text' | 'email' | 'number' | 'password',
  description?: string,
}


const array: ITypeFormField[] = [
  {
    title: 'username',
    description: "",
    type: 'text'
  },
  {
    title: 'name',
    type: 'text'
  },
  {
    title: 'email',
    type: 'email'
  },
  {
    title: 'password',
    type: 'password'
  }
]

const SignupForm = () => {
  const [isLoading] = useState(true)
  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      username: '',
      name: '',
      email: '',
      password: ''
    }
  })
  function onSubmit(values: z.infer<typeof SignUpValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="Logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create a new account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">To use Snapgram enter your details</p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          {array.map((item) => (
            <FormField
              control={form.control}
              name={item.title}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{item.title.charAt(0).toUpperCase() + item.title.slice(1)}</FormLabel>
                  <FormControl>
                    <Input type={item.type} className="shad-input" placeholder={item.title.charAt(0).toUpperCase() + item.title.slice(1)} {...field} />
                  </FormControl>
                  <FormDescription>
                    {item.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button type="submit" disabled={isLoading} className="shad-button_primary">
            {isLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : "Sign up"}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">Already have a account? <Link className='text-primary-500 text-small-semibold ml-1' to={"/sign-in"}>Log in</Link></p>
        </form>
      </div>
    </Form>
  )
}

export default SignupForm