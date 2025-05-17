import {createSlice} from "@reduxjs/toolkit"
import toast from "react-hot-toast"

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0, // items * price
  shipping: 500,
  tax: 0,
  orderTotal: 0, // items * price + shiiping + tax
}

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("comfy_cart"))
}

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage() || defaultState,
  reducers: {
    addItem: (state, action) => {
      const {product} = action.payload
      const item = state.cartItems.find((i) => i.cartID === product.cartID)
      if (item) {
        // add more amount for existing item
        item.amount += product.amount
      } else {
        // add new item
        state.cartItems.push(product)
      }

      state.numItemsInCart += product.amount
      state.cartTotal += product.price * product.amount

      cartSlice.caseReducers.calculateTotals(state)

      toast.success("Item added to cart")
    },

    clearCart: () => {
      localStorage.setItem("comfy_cart", JSON.stringify(defaultState))
      return defaultState
    },

    removeItem: (state, action) => {
      // get ID from UI
      const {cartID} = action.payload

      const product = state.cartItems.find((i) => i.cartID === cartID)
      // remove selected item from cart
      state.cartItems = state.cartItems.filter((i) => i.cartID !== cartID)

      state.numItemsInCart -= product.amount
      state.cartTotal -= product.price * product.amount

      cartSlice.caseReducers.calculateTotals(state)

      toast.error("Item removed from cart")
    },

    editItem: (state, action) => {
      // get from UI
      const {cartID, amount} = action.payload
      // find specific item inside cart by ID
      const item = state.cartItems.find((i) => i.cartID === cartID)
      // item.amount = current amount in cart / amount = new from UI
      state.numItemsInCart += amount - item.amount
      state.cartTotal += item.price * (amount - item.amount)
      // updating new amount
      item.amount = amount

      cartSlice.caseReducers.calculateTotals(state)

      toast.success("Item updated")
    },

    calculateTotals: (state) => {
      state.tax = 0.1 * state.cartTotal // 10%
      state.orderTotal = state.cartTotal + state.tax + state.shipping
      // save cart to localStorage
      localStorage.setItem("comfy_cart", JSON.stringify(state))
    },
  },
})

export const {addItem, clearCart, removeItem, editItem} = cartSlice.actions

export default cartSlice.reducer
