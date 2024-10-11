import { SnackBarSliceState } from "@/types/Types"
import reducers from "../Reducers/SnackBarReducers"
import { createSlice } from "@reduxjs/toolkit"

const initialState: SnackBarSliceState = {
    open: false,
    message: '',
    type: null
}

export const SnakcBarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers,
})

export default SnakcBarSlice.reducer
export const SnackBarActions = SnakcBarSlice.actions
