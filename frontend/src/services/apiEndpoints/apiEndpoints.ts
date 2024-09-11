
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

  // Category
  getCategories: "/category",

  // Cart
  getCartDetails: "/cart",
}
