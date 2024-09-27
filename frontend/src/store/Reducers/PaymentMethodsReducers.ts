import { PaymentMethods } from "@/types/Types"
import { PayloadAction } from "@reduxjs/toolkit"

export const reducers = {
    set_payment_methods_data:(state: any, action:PayloadAction<PaymentMethods[]>) => {
        return action.payload;
      }
}