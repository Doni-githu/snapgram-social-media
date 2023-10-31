import PostForm from "@/components/forms/PostForm"
import Loader from "@/components/shared/Loader"
import { useGetPostById } from "@/lib/react-query/queries"
import { useParams } from "react-router-dom"

const EditPost = () => {
  const params = useParams()

  const { data: post, isLoading } = useGetPostById(String(params.id))
  if (isLoading) return <Loader />
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img
            src="/assets/icons/edit.svg"
            alt="add"
            width={36}
            height={36}
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit post</h2>
        </div>

        <PostForm action="Update" post={post} />
      </div>
    </div>
  )
}

export default EditPost
