import { CartSliceState } from "@/types/Types";
import { PayloadAction } from "@reduxjs/toolkit";

export const reducers = {
    add_cart_summary_details:(state: CartSliceState, action: PayloadAction<CartSliceState>)=>{
        return {
            ...action.payload
        }
    }
    ,
    removeCartItem:(state: CartSliceState, action: PayloadAction<{itemId: number}>)=>{
        const deleteCartItemIndex = state.cartItems.findIndex((item)=> item.id === action.payload.itemId);
        const deleteCartItemPrice = state.cartItems[deleteCartItemIndex].price;
        //  subtract the deleted course price from subtotal
        const newSubtotal = state.cart_total_price - deleteCartItemPrice
        state.cart_total_price = newSubtotal;
        state.cartItems.splice(deleteCartItemIndex, 1); // delete index of the delete cart item
    }
};
