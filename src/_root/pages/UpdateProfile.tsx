import EditUserForm from "@/components/forms/EditUserForm"
import { useGetUserById } from "@/lib/react-query/queries"
import Loader from "@/components/shared/Loader"
import { useParams } from "react-router-dom"


const UpdateProfile = () => {
    const { id } = useParams()
    const { data: user } = useGetUserById(id || "")
    if (!user) {
        return <div className="flex w-full justify-center">
            <Loader />
        </div>
    }
    return (
        <div className="flex flex-1">
            <div className="common-container">
                <div className="flex-start gap-3 justify-start w-full max-w-5xl">
                    <img src="/assets/icons/edit.svg" width="36" height="36" alt="edit" className="invert-white" />
                    <h2 className="h3-bold md:h2-bold text-left w-full">Edit Profile</h2>
                </div>
                <EditUserForm user={user} />
            </div>
        </div>
    )
}

export default UpdateProfile
