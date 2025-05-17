import {ErrorElement} from "./components"
import {
  About,
  Cart,
  Checkout,
  Error,
  HomeLayout,
  Landing,
  Login,
  Orders,
  Products,
  Register,
  SingleProduct,
} from "./pages"

import {createBrowserRouter, RouterProvider} from "react-router-dom"

// === loader
import {loader as checkoutLoader} from "./pages/Checkout"
import {loader as landingLoader} from "./pages/Landing"
import {loader as orderLoader} from "./pages/Orders"
import {loader as productLoader} from "./pages/Products"
import {loader as singleLoader} from "./pages/SingleProduct"

// === actions
import {action as checkoutAction} from "./components/CheckoutForm"
import {action as loginAction} from "./pages/Login"
import {action as registerAction} from "./pages/Register"

import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"
import {store} from "./store"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    //(children pages of homepage)
    children: [
      {
        index: true, // index page
        element: <Landing />,
        // setup specific error component for langding page
        errorElement: <ErrorElement />,
        loader: landingLoader(queryClient),
      },
      {
        path: "products",
        element: <Products />,

        errorElement: <ErrorElement />,

        loader: productLoader(queryClient),
      },
      {
        path: "products/:id", // dynamic id for single product
        element: <SingleProduct />,
        // setup specific error component for langding page
        errorElement: <ErrorElement />,

        loader: singleLoader(queryClient),
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "orders",
        element: <Orders />,

        loader: orderLoader(store, queryClient),
      },
      {
        path: "checkout",
        element: <Checkout />,

        loader: checkoutLoader(store),

        action: checkoutAction(store, queryClient),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,

    action: loginAction(store),
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
    action: registerAction,
  },
])

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
