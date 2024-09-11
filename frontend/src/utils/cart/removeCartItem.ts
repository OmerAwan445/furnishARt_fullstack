import { GetCartDetailsResponse } from "@/types/Types";

export const removeCartItem = (state: GetCartDetailsResponse, removeItemId: number) => {
    const deleteCartItemIndex = state.cartItems.findIndex((item)=> item.id === removeItemId);
    const deleteCartItemPrice = state.cartItems[deleteCartItemIndex].price;
    const deleteCartItemQuantity = state.cartItems[deleteCartItemIndex].quantity;
    //  subtract the deleted course price from subtotal
    const newSubtotal = state.cart_total_price - (deleteCartItemPrice * deleteCartItemQuantity) 
    state.cart_total_price = newSubtotal;
    state.cartItems.splice(deleteCartItemIndex, 1); // delete index of the delete cart item
    return state;
}