import {Filters, PaginationContainer, ProductsContainer} from "../components"
import {customFetch} from "../utils"

const url = "/products"

const allProductsQuery = (queryParams) => {
  const {search, category, company, sort, price, shipping, page} = queryParams

  return {
    queryKey: [
      "products",
      search ?? "", // ?? provide a default value for potentially null or undefined variables.
      category ?? "all",
      company ?? "all",
      sort ?? "a-z",
      price ?? 100000,
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: () =>
      customFetch(url, {
        params: queryParams,
      }),
  }
}
// eslint-disable-next-line react-refresh/only-export-components
export const loader =
  (queryClient) =>
  async ({request}) => {
    // console.log(request) // (lấy đc url request với serach params đàng sau)
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ])

    const response = await queryClient.ensureQueryData(allProductsQuery(params))
    // console.log(response)
    const products = response.data.data
    // for pagination/company...
    const meta = response.data.meta
    return {products, meta, params}
  }

const Products = () => {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  )
}

export default Products
