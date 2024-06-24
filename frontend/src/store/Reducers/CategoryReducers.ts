import { CategoryInfo } from "@/types/Types"
import { PayloadAction } from "@reduxjs/toolkit"

// Redcuers for the actions in Slice
const reducers = {
  AddCategories: (state: any, action: PayloadAction<CategoryInfo[]>) => {
    return action.payload
  },
}

export default reducers
