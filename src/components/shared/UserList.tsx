import { useGetUsers } from '@/lib/react-query/queries'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import Loader from './Loader'

const UserList = () => {
    const { data: users, isFetching: isLoadingUser } = useGetUsers()
    
    return (    
        <ul className='user-grid'>
            {isLoadingUser && !users ? <Loader /> : (
                users?.documents.map((item) => (
                    <li className="flex-1 min-w-[200px] w-full">
                        <Link className="user-card" to="/profile/6545127a156b8d261b7c">
                            <img
                                src={item.imageUrl}
                                alt="creator"
                                className="rounded-full w-14 h-14" />
                            <div className="flex-center flex-col gap-1">
                                <p className="base-medium text-light-1 text-center line-clamp-1">{item.name}</p>
                                <p className="small-regular text-light-3 text-center line-clamp-1">@{item.username}</p>
                            </div>
                            <Button variant="ghost" className="shad-button_primary" type="button">
                                Follow
                            </Button>
                        </Link>
                    </li>
                ))
            )}
        </ul>
    )
}

export default UserList
