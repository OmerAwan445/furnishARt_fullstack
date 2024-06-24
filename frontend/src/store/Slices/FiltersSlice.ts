import { FiltersSliceState } from "@/types/Types";
import { createSlice } from "@reduxjs/toolkit";
import reducers from "../Reducers/FiltersReducers";

const initialState: FiltersSliceState = {
    category_ids: [],
    itemsPerPage: 7,
    page: 1
};

export const FiltersSlice = createSlice({
  name: "filters",
  initialState,
  reducers,
})

export default FiltersSlice.reducer
export const FiltersActions = FiltersSlice.actions
