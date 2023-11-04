import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useGetUserById } from "@/lib/react-query/queries";
import { Link, useParams } from "react-router-dom";



const Profile = () => {
  const { user: currentUser } = useUserContext()
  const url = location.href
  const { id } = useParams()
  const { data: user } = useGetUserById(id || "")
  if (!user) {
    return <div className="flex-center w-full">
      <Loader />
    </div>
  }

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <img src={user.imageUrl} alt="profile" className="w-28 h-28 lg:h-36 lg:w-36 rounded-full" />
        <div className="flex flex-col flex-1 gap-7">
          <div className="flex justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">{user.name}</h1>
              <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">@{user.username}</p>
              <p className="small-medium md:base-medium text-center xl:text-left mt-4 max-w-screen-sm">{user.bio}</p>
            </div>
          </div>
          <div className="flex justify-center xl:absolute top-0 right-0 flex-end gap-4">
            <div className={`${currentUser.id !== user.$id && "hidden"}`}>
              <Link className="h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg false" to={`/update-profile/${id}`}>
                <img src="/assets/icons/edit.svg" alt="edit" width="20" height="20" />
                <p className="flex whitespace-nowrap small-medium">Edit Profile</p>
              </Link>
            </div>
            <div className={`${currentUser.id === user.$id && "hidden"}`}>
              <Button className="shad-button_primary px-8" variant="ghost">Follow</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex max-w-5xl w-full">
        <Link className={`profile-tab rounded-l-lg ${!url.includes("liked-posts") ? "!bg-dark-3" : 'false'}`} to={`/profile/${id}`}>
          <img src={'/assets/icons/posts.svg'} alt={'post'} width="20" height="20" />
          Posts
        </Link>
        <Link className={`profile-tab rounded-r-lg ${url.includes("liked-posts") ? "!bg-dark-3" : 'false'}`} to={`/profile/${id}/liked-posts`}>
          <img src={'/assets/icons/like.svg'} alt={'like'} width="20" height="20" />
          Liked Posts
        </Link>
      </div>
    </div>
  )
}

export default Profile
