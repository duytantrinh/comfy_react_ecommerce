import {useLoaderData, useLocation, useNavigate} from "react-router-dom"

const PaginationContainer = () => {
  const {meta} = useLoaderData()
  const {pageCount, page} = meta.pagination
  // console.log(pageCount) // 3
  // (create number of page)
  const pages = Array.from({length: pageCount}, (_, index) => {
    return index + 1
  })

  // For navigation
  const {search, pathname} = useLocation()
  const navigate = useNavigate()

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search)

    searchParams.set("page", pageNumber)

    navigate(`${pathname}?${searchParams.toString()}`)

    // console.log(pageNumber)
    // console.log(search)
    // console.log(pathname)
  }

  // only has 1 page => don't show pagination
  if (pageCount < 2) return null

  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let prevPage = page - 1
            if (prevPage < 1) prevPage = pageCount
            handlePageChange(prevPage)
          }}
        >
          Prev
        </button>

        {pages.map((pageNumber) => {
          return (
            <button
              key={pageNumber}
              onClick={() => {
                handlePageChange(pageNumber)
              }}
              // condition for active page
              className={`btn btn-xs sm:btn-md border-none join-item ${
                pageNumber === page
                  ? "bg-primary border-primary text-secondary"
                  : ""
              } `}
            >
              {pageNumber}
            </button>
          )
        })}

        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let nextPage = page + 1
            if (nextPage > pageCount) nextPage = 1
            handlePageChange(nextPage)
          }}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default PaginationContainer
