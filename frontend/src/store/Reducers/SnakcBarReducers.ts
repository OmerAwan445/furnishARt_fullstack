import { SnackBarType } from "@/types/Types"
import { PayloadAction } from "@reduxjs/toolkit"

// Redcuers for the actions in Slice
const reducers = {
  addMessage: (state: any, action: PayloadAction<{message: string, type: SnackBarType}>) => {
    return {
        open: true,
        message: action.payload.message,
        type: action.payload.type
    }
  },
  closeSnackbar: (state: any) => {
    return {
        open: false,
        message: '',
        type: null
    }
  }
}

export default reducers
