import Loader from "@/components/shared/Loader"
import { lazy, Suspense } from "react"

const UserList = lazy(() => import("@/components/shared/UserList"))

const AllUsers = () => {
  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        <Suspense fallback={<Loader />}>
          <UserList />
        </Suspense>
      </div>
    </div>
  )
}

export default AllUsers
