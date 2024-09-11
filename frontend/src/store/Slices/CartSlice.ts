import { createSlice } from "@reduxjs/toolkit"
import { reducers } from "../Reducers/CartReducers"
import { CartSliceState } from "@/types/Types"

const initialState: CartSliceState= {
  cart_id: null,
  cart_total_price: 0,
  cartItems: [],
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers,
})

export default CartSlice.reducer
export const CartActions = CartSlice.actions
