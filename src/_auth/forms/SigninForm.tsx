import { Button } from '@/components/ui/button'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { SignInValidation } from '@/lib/validation'
import Loader from '@/components/shared/Loader'
import { Link, useNavigate } from 'react-router-dom'
import { useSignInAccount } from '@/lib/react-query/queries'
import { useUserContext } from '@/context/AuthContext'

type Type = "email" | "password"
interface ITypeFormField {
  title: Type,
  type: 'text' | 'email' | 'number' | 'password',
  description?: string,
}


const array: ITypeFormField[] = [
  {
    title: 'email',
    type: 'email'
  },
  {
    title: 'password',
    type: 'password'
  }
]

const SigninForm = () => {
  const { toast } = useToast()
  const { checkAuthUser } = useUserContext()
  const { mutateAsync: signInAccount, isPending: isSigningInUser } = useSignInAccount()
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: '',
      password: ''
    }
  })



  async function onSubmit(user: z.infer<typeof SignInValidation>) {
    try {
      const session = await signInAccount({
        email: user.email,
        password: user.password,
      });

      if (!session) {
        toast({ title: "Something went wrong. Please login your new account", });
        return;
      }

      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        form.reset();

        navigate("/");
      } else {
        toast({ title: "Login failed. Please try again.", });

        return;
      }
    } catch (error) {
      console.log(error)
    }
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
              key={item.title}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{item.title.charAt(0).toUpperCase() + item.title.slice(1)}</FormLabel>
                  <FormControl>
                    <Input type={item.type} className="shad-input" placeholder={item.title.charAt(0).toUpperCase() + item.title.slice(1)} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button type="submit" disabled={isSigningInUser} className="shad-button_primary">
            {isSigningInUser ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : "Sign in"}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">Don't have a account? <Link className='text-primary-500 text-small-semibold ml-1' to={"/sign-up"}>Sign up</Link></p>
        </form>
      </div>
    </Form>
  )
}

export default SigninForm