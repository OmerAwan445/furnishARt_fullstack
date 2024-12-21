
// Backend APIs Endpoints
export const BACKEND_API_ENDPOINTS = {
  loginCustomer: "/auth/login/",
  signupCustomer: "/auth/signup/",
  verifyEmail: "/auth/verify-email/",
  forgetPassword: "/auth/forget-password/",
  verifyForgetPasswordToken: "/auth/verify-forget-password/",
  resetPassword: "/auth/reset-password/",

  // Furniture Items
  autocompleteFurnitureItems: "/furniture-item/auto-complete",
  getBestSellerFurnitureItems: "/furniture-item/best-sellers",
  getFurnitureItemFromID: "/furniture-item",
  getFurnitureItems: "/furniture-item",
  addFurnitureItems: "/furniture-item",
  uploadFurnitureImages: "/furniture-item/upload-images",
  uploadFurnitureModel: "/furniture-item/upload-model",

  // Category
  getCategories: "/category",
  addCategory: "/category",
  editCategory: "/category",
  deleteCategory: "/category",

  // Cart
  addCartItem: "/cart/add-item",
  getCartDetails: "/cart",
  removeCartItem: "/cart/remove-item",

  // Stripe Payment
  getStripeCustomerAccountId: "/stripe/customer-account-id",
  payCart: '/stripe/pay-cart',
  getAllPaymentMethods: '/stripe/all-payment-methods/',

  // Orders
  getOrders: "/orders",
  updateOrderStatus: "/orders/update-status",
}
