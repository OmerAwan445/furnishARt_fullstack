import { createSlice } from "@reduxjs/toolkit"
import { reducers } from "../Reducers/PaymentMethodsReducers"
import { PaymentMethods } from "@/types/Types"

const initialState: PaymentMethods[] = []

export const PaymentMethodsSlice = createSlice({
  name: "payment-methods",
  initialState,
  reducers,
})

export default PaymentMethodsSlice.reducer
export const CheckoutCartActions = PaymentMethodsSlice.actions
