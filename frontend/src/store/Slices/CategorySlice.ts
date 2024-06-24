import { CategoryInfo } from "@/types/Types"
import reducers from "../Reducers/CategoryReducers"
import { createSlice } from "@reduxjs/toolkit"

const initialState: CategoryInfo[] = [
  { value: 0, label: "All categories" },
];

export const CategorySlice = createSlice({
  name: "categories",
  initialState,
  reducers,
})

export default CategorySlice.reducer
export const CategoryActions = CategorySlice.actions
