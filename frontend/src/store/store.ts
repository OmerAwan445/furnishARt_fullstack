import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit"
import CategoryReducers from "./Slices/CategorySlice"
import FiltersReducers from "./Slices/FiltersSlice"
import SnackBarReducers from "./Slices/SnackBarSlice"
import PaymentMethodsReducers from "./Slices/PaymentMethodsSlice"

export const makeStore = () =>
  configureStore({
    reducer: {
      snackbar: SnackBarReducers,
      categories: CategoryReducers,
      filters: FiltersReducers,
      paymentMethods: PaymentMethodsReducers,

    },
    // devTools: true,
  })

// export default makeStore
export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore["getState"]>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>
export type AppDispatch = AppStore['dispatch']