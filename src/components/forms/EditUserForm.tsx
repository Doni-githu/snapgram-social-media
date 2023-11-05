import { UpdateProfileValidation } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Models } from "appwrite"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import AvatarUploader from "../shared/AvatarUploader"
import { toast } from "../ui/use-toast"
import { useNavigate } from "react-router-dom"
import { useUpdateUser } from "@/lib/react-query/queries"
import Loader from "../shared/Loader"

interface EditUserFormProps {
    user: Models.Document
}

const EditUserForm = ({ user }: EditUserFormProps) => {
    const navigate = useNavigate()
    const { mutateAsync: updateUser, isPending: isLoadingUpdate } = useUpdateUser()
    const form = useForm<z.infer<typeof UpdateProfileValidation>>({
        resolver: zodResolver(UpdateProfileValidation),
        defaultValues: {
            file: [],
            name: user ? user.name : "",
            username: user ? user.username : "",
            email: user ? user.email : "",
            bio: user ? user.bio : ""
        },
    })

    async function onSubmit(values: z.infer<typeof UpdateProfileValidation>) {
        const updatedUser = await updateUser({
            ...values,
            userId: user.$id,
            imageId: user?.imageId,
            imageUrl: user?.imageUrl,
            bio: values.bio ? values.bio : ""
        })
        console.log(updatedUser)

        if (!updatedUser) {
            return toast({
                title: "Please try again"
            })
        }
        navigate(`/profile/${user.$id}`)
        return
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-7 w-full max-w-5xl mt-4">
                <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <AvatarUploader
                                    fieldChange={field.onChange}
                                    mediaUrl={user?.imageUrl.toString()}
                                />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Name</FormLabel>
                            <FormControl>
                                <Input className="shad-input" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Username</FormLabel>
                            <FormControl>
                                <Input className="shad-input" disabled {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Email</FormLabel>
                            <FormControl>
                                <Input className="shad-input" disabled placeholder="" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Bio</FormLabel>
                            <FormControl>
                                <Textarea className="shad-textarea custom-scrollbar" placeholder="" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <div className="flex gap-4 items-center justify-end">
                    <Button className="shad-button_dark_4" type="button" onClick={() => navigate(-1)}>Cancel</Button>
                    <Button className="shad-button_primary whitespace-normal" disabled={isLoadingUpdate} type="submit">
                        {isLoadingUpdate ? <>
                            <Loader /> Loading...
                        </> :
                            "Update Profile"
                        }
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default EditUserForm
