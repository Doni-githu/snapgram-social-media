import GridPostList from "@/components/shared/GridPostList"
import Loader from "@/components/shared/Loader"
import { useUserContext } from "@/context/AuthContext"
import { useGetSavedPosts, useGetUserById } from "@/lib/react-query/queries"
import { Models } from "appwrite"
import { useParams } from "react-router-dom"

const Saved = () => {
    const { user } = useUserContext()
    const { data: saved, isLoading: isLoadingUser } = useGetSavedPosts(user.id)
    if (!saved) {
        return <div className="flex-center w-full text-center">
            <Loader />
        </div>
    }

    const posts = saved.documents.map((item) => item.post)
    
    return (
        <div className="saved-container">
            <div className="flex gap-2 w-full max-w-5xl">
                <img src="/assets/icons/save.svg" width={36} height={36} alt="edit" className="invert-white" />
                <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
            </div>
            {isLoadingUser && !posts ? <Loader /> : (
                <GridPostList showUser={false} posts={posts} />
            )}
        </div>
    )
}

export default Saved
