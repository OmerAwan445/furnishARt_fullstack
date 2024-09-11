import React from 'react'
import DefaultButton from './DefaultButton'
import CartSvs from '@/services/Cart'

const AddToCartButton = ({ quantity = 1, furnitureId }: { furnitureId: number, quantity?: number }) => {
  return (
    <DefaultButton onClick={async ()=> {
        const data = await CartSvs.addCartItem(furnitureId, quantity)
        alert(data.message)
    }} sx={{
        background: "linear-gradient(90deg, #A69080 0%, #f5a623 100%)", // Warm gradient for button
        color: "#000",
        "&:hover": {
          background: "linear-gradient(90deg, #f5a623 0%, #A69080 100%)",
        },
      }}>
        Add to cart
      </DefaultButton>
  )
}

export default AddToCartButton
