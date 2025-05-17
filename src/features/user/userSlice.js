import {createSlice} from "@reduxjs/toolkit"
import toast from "react-hot-toast"

const themes = {
  lemonade: "lemonade",
  aqua: "aqua",
}

const getUserFormLocalStorage = () => {
  return JSON.parse(localStorage.getItem("user")) || null
}
const getThemeFormLocalStorage = () => {
  const theme = localStorage.getItem("theme") || themes.lemonade
  // (setAttribute for html )
  document.documentElement.setAttribute("data-theme", theme)
  return theme
}

const initialState = {
  user: getUserFormLocalStorage(), //{username: "tantrinh"},
  theme: getThemeFormLocalStorage(),
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const user = {...action.payload.user, token: action.payload.jwt}
      state.user = user
      localStorage.setItem("user", JSON.stringify(user))
    },

    logoutUser: (state) => {
      state.user = null
      localStorage.removeItem("user")
      toast.success("Logged out successfully !!!")
    },

    toggleTheme: (state) => {
      const {lemonade, aqua} = themes
      state.theme = state.theme === lemonade ? aqua : lemonade
      document.documentElement.setAttribute("data-theme", state.theme)
      localStorage.setItem("theme", state.theme)
    },
  },
})

export const {loginUser, logoutUser, toggleTheme} = userSlice.actions

export default userSlice.reducer
