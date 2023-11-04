import UserList from "@/components/shared/UserList"

const AllUsers = () => {
  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        <UserList />
      </div>
    </div>
  )
}

export default AllUsers
