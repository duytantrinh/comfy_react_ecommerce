import {FeaturedProducts, Hero} from "../components"
import {customFetch} from "../utils"

// url for featured products from API
const url = "/products?featured=true"

const featuredProductsQuery = {
  queryKey: ["featuredProducts"],
  queryFn: () => customFetch(url),
}

// eslint-disable-next-line react-refresh/only-export-components
export const loader = (queryClient) => async () => {
  const response = await queryClient.ensureQueryData(featuredProductsQuery)
  // console.log(response)
  const products = response.data.data
  // console.log(products)

  return {products}
}

const Landing = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  )
}

export default Landing
