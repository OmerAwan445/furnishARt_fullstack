"use client";

import { GetCartDetailsResponse } from "@/types/Types";
import CartItemsList from "../CartPage/CartItemsList";

export default function CheckoutItemsDetails({
  cartData,
}: {
  cartData: GetCartDetailsResponse;
}) {
  const total_item_count = cartData.cartItems.length;

  return (
    <div className="lg:w-2/4 xl:rounded-l-lg hidden lg:flex lg:rounded-l-md bg-gray-100">
      <div className="w-full pb-4">
        <div className="relative">
          <h6 className="xl:text-2xl lg:text-xl text-maingray lg:font-semibold xl:ml-5 lg:ml-5">
            Cart items
          </h6>
          <h6 className="lg:text-xs text-maingray xl:font-normal xl:ml-5 lg:ml-5">
            You have {total_item_count} item{total_item_count > 1 && "s"} in
            your cart
          </h6>

          {total_item_count !== 0 && (
            <div className="cart-items-custom-scrollbar cart-items-shadow overflow-x-hidden flex flex-wrap w-full xl:mt-4 lg:mt-5 xl:pl-4 xl:pr-4 lg:px-5 px-4 my-4 max-h-[35rem] overflow-y-scroll !pb-8 ">
              <CartItemsList
                isCheckoutCartItems={true}
                handlerCartItems={() => {}}
                cartItems={cartData.cartItems}
              />
            </div>
          )}
        </div>
        <div className="flex flex-wrap xl:mt-3 lg:mt-4 xl:px-0 lg:px-5">
          <div className="lg:w-full bg-price border-price border xl:ml-5 xl:mr-5 xl:pl-5 xl:pt-3 xl:pb-3 lg:px-3 lg:py-2 rounded-lg">
            <div className="flex flex-wrap">
              <div className="lg:w-1/2 flex">
                <h6 className="text-base text-white font-medium">Total</h6>
              </div>
              <div className="lg:w-1/2">
                <div className="float-right flex">
                  <h6 className="xl:text-xl lg:text-lg text-white font-semibold xl:mr-5">
                    ${cartData.cart_total_price.toFixed(2)}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
