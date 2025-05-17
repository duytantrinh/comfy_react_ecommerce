import toast from "react-hot-toast"
import {redirect, useLoaderData} from "react-router-dom"
import {
  ComplexPaginationContainer,
  OrdersList,
  SectionTitle,
} from "../components"

import {customFetch} from "../utils"

const ordersQuery = (params, user) => {
  return {
    queryKey: [
      "orders",
      user.username,
      params.page ? parseInt(params.page) : 1,
    ],
    queryFn: () =>
      customFetch.get("/orders", {
        params,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }),
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export const loader =
  (store, queryClient) =>
  async ({request}) => {
    const user = store.getState().userState.user

    if (!user) {
      toast.error("You must logged in to view orders")
      return redirect("/login")
    }

    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ])
    try {
      const response = await queryClient.ensureQueryData(
        ordersQuery(params, user)
      )

      //(meta for pagination)
      return {orders: response.data.data, meta: response.data.meta}
    } catch (error) {
      console.log(error)
      const errorMessage =
        error?.response?.data?.error?.message ||
        "there was an error accessing your orders"

      toast.error(errorMessage)
      if (error?.response?.status === 401 || error?.response?.status === 403)
        return redirect("/login")

      return null
    }
  }

const Orders = () => {
  const {meta} = useLoaderData()
  if (meta.pagination.total < 1) {
    return <SectionTitle text="please make an order" />
  }
  return (
    <>
      <SectionTitle text="Your orders" />
      <OrdersList />
      <ComplexPaginationContainer />
    </>
  )
}

export default Orders
