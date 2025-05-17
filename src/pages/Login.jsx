import toast from "react-hot-toast"
import {useDispatch} from "react-redux"
import {Form, Link, useNavigate} from "react-router-dom"
import {FormInput, SubmitBtn} from "../components"
import {loginUser} from "../features/user/userSlice"
import {customFetch} from "../utils"

// eslint-disable-next-line react-refresh/only-export-components
export const action =
  (store) =>
  async ({request}) => {
    // console.log(store)
    const formData = await request.formData()
    const data = Object.fromEntries(formData)

    // console.log(data) // {identifier: 'test@test.com', password: 'secret'}

    try {
      const response = await customFetch.post("/auth/local", data)
      // console.log(response)
      store.dispatch(loginUser(response.data))

      toast.success("Login successfully")
      // return redirect("/")
      return null
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        "please double check your credentials"

      toast.error(errorMessage)
    }

    return null
  }

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // (== for demo guest user)
  const loginAsGuestUser = async () => {
    try {
      const response = await customFetch.post("/auth/local", {
        identifier: "test@test.com",
        password: "secret",
      })

      dispatch(loginUser(response.data))
      toast.success("welcome guest user")
      navigate("/")
    } catch (error) {
      console.log(error)
      toast.error("please try again!!!")
    }
  }

  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="post"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>

        <FormInput type="email" label="email" name="identifier" />
        <FormInput type="password" label="password" name="password" />

        <div className="mt-4">
          <SubmitBtn text="login" />
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-block"
          onClick={loginAsGuestUser}
        >
          guest user
        </button>
        <p className="text-center">
          Not a member yet ?{" "}
          <Link to="/register" className="ml-2 link-hover link">
            {" "}
            Register
          </Link>
        </p>
      </Form>
    </section>
  )
}

export default Login
