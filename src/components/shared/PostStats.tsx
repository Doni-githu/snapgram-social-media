import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from '@/lib/react-query/queries'
import { checkIsLiked } from '@/lib/utils'
import { Models } from 'appwrite'
import Loader from './Loader'
import { useEffect, useState } from "react"
import { memo } from "react"
type PostStatsProps = {
    post: Models.Document,
    userId: string,
    wFull?: boolean
}

const PostStats = memo(({ post, userId, wFull = false }: PostStatsProps) => {
    const likesList = post.likes.map((user: Models.Document) => user.$id) as string[]
    const [likes, setLikes] = useState<string[]>(likesList)
    const [isSaved, setIsSaved] = useState(false)
    const { mutate: savePost, isPending: isSavingPost } = useSavePost()
    const { mutate: deleteSavedPost, isPending: isDeletingSavedPost } = useDeleteSavedPost()
    const { mutate: likePost, isPending: isLikingLoading } = useLikePost()
    const { data: currentUser } = useGetCurrentUser()
    const hasSaved = currentUser?.save.find((record: Models.Document) => record.post.$id === post.$id);
    useEffect(() => {
        setIsSaved(Boolean(hasSaved))
    }, [currentUser])
    const handleLikePost = (e: React.MouseEvent) => {
        e.stopPropagation()

        let newLikes: string[] = [...likes]
        const hasLiked = newLikes.includes(userId)
        if (hasLiked) {
            newLikes = newLikes.filter((id) => id !== userId)
        } else {
            newLikes.push(userId)
        }

        setLikes(newLikes)
        likePost({ postId: post.$id, likesArray: newLikes })
    }

    const handleSavePost = (e: React.MouseEvent) => {
        e.stopPropagation()

        const savedPostRecord = currentUser?.save.find((record: Models.Document) => record.post.$id === post.$id);

        if (savedPostRecord) {
            setIsSaved(false);
            return deleteSavedPost(savedPostRecord.$id);
        }

        savePost({ userId: userId, postId: post.$id });
        setIsSaved(true);
    }

    return (
        <div className={`flex ${wFull ? "w-full" : ""} justify-between items-center z-20`}>
            <div className="flex gap-2 mr-5">
                {isLikingLoading ? <Loader /> : <>
                    <img
                        src={`/assets/icons/like${checkIsLiked(likes, userId) ? "d" : ""}.svg`}
                        alt="like"
                        width={20}
                        height={20}
                        onClick={handleLikePost}
                        className="cursor-pointer"
                    />
                    <p className="small-medium lg:base-medium">{likes.length}</p>
                </>}
            </div>

            <div className="flex gap-2">
                {isSavingPost || isDeletingSavedPost ? <Loader /> : <img
                    src={isSaved
                        ? "/assets/icons/saved.svg"
                        : "/assets/icons/save.svg"}
                    alt="like"
                    width={20}
                    height={20}
                    onClick={handleSavePost}
                    className="cursor-pointer"
                />}
            </div>
        </div>
    )
})

export default PostStats
