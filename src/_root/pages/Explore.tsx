import { useState, useEffect, lazy, Suspense } from "react"
import Loader from "@/components/shared/Loader"
import { Input } from "@/components/ui/input"
import useDebounce from "@/hooks/useDebounce"
import { useGetPosts, useSearchPost } from "@/lib/react-query/queries"
import { useInView } from "react-intersection-observer"

const GridPostList = lazy(() => import("@/components/shared/GridPostList"))
const SearchResults = lazy(() => import("@/components/shared/SearchResults"))
const Explore = () => {
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts()
  const [term, setTerm] = useState('')
  const debouncedValue = useDebounce<string>(term, 500)
  const { data: searchedPost, isFetching: isSearchingPosts } = useSearchPost(debouncedValue)
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && !term) {
      fetchNextPage()
    }
  }, [inView, term])
  if (!posts) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    )
  }

  const shouldShowSearchResults = term !== "";
  const shouldShowPosts = !shouldShowSearchResults && posts.pages.every((item) => item?.documents.length === 0)
  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img src="/assets/icons/search.svg" alt="search" width={24} height={24} />
          <Input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            type="text"
            placeholder="Search"
            className="explore-search" />
        </div>
      </div>

      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold">Popular Today</h3>

        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <img
            src={"/assets/icons/filter.svg"}
            width={20}
            height={20}
            alt="filter"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {shouldShowSearchResults ? (
          <Suspense fallback={<Loader />}>
            <SearchResults isSearchFetching={isSearchingPosts} searchedPosts={searchedPost} />
          </Suspense>
        ) : shouldShowPosts ? (
          <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
        ) : posts.pages.map((item, index) => (
          <Suspense fallback={<Loader />}>
            <GridPostList key={`page-${index}`} posts={item?.documents || []} />
          </Suspense>
        ))}
      </div>

      {hasNextPage && !term && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  )
}

export default Explore