import {useLoaderData, useLocation, useNavigate} from "react-router-dom"

const ComplexPaginationContainer = () => {
  const {meta} = useLoaderData()
  const {pageCount, page} = meta.pagination
  // console.log(pageCount) // 3

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

  const addPageButton = ({pageNumber, activeClass}) => {
    return (
      <button
        key={pageNumber}
        onClick={() => {
          handlePageChange(pageNumber)
        }}
        // condition for active page
        className={`btn btn-xs sm:btn-md border-none join-item ${
          activeClass ? "bg-primary border-primary text-secondary" : ""
        } `}
      >
        {pageNumber}
      </button>
    )
  }

  const renderPageButtons = () => {
    const pageButtons = []
    // first button (page 1)
    pageButtons.push(addPageButton({pageNumber: 1, activeClass: page === 1}))

    // left dots
    if (page > 2) {
      pageButtons.push(
        <button
          className="join-item btn btn-xs sm:btn-md border-none"
          key="dots-1"
        >
          ...
        </button>
      )
    }

    // Current page
    if (page !== 1 && page !== pageCount) {
      pageButtons.push(addPageButton({pageNumber: page, activeClass: true}))
    }

    // right dots
    if (page < pageCount - 1) {
      pageButtons.push(
        <button
          className="join-item btn btn-xs sm:btn-md border-none"
          key="dots-2"
        >
          ...
        </button>
      )
    }

    // last button (last page)
    pageButtons.push(
      addPageButton({pageNumber: pageCount, activeClass: page === pageCount})
    )
    return pageButtons
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

        {renderPageButtons()}

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

export default ComplexPaginationContainer
