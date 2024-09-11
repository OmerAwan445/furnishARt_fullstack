import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit"
import CategoryReducers from "./Slices/CategorySlice"
import FiltersReducers from "./Slices/FiltersSlice"
import CartReducers from "./Slices/CartSlice"

export const makeStore = () =>
  configureStore({
    reducer: {
      categories: CategoryReducers,
      filters: FiltersReducers,
      cart: CartReducers
    },
    // devTools: true,
  })

// export default makeStore
export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore["getState"]>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>
export type AppDispatch = AppStore['dispatch']