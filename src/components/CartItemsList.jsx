import {useSelector} from "react-redux"
import CartItem from "./CartItem"

const CartItemsList = () => {
  const cartItems = useSelector((state) => state.cartState.cartItems)

  return (
    <>
      {cartItems.map((item, index) => {
        return <CartItem key={`${item.cartId}${index}`} cartItem={item} />
      })}
    </>
  )
}

export default CartItemsList
