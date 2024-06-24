import { FiltersSliceState } from "@/types/Types";
import { PayloadAction } from "@reduxjs/toolkit";

const reducers = {
    addCategoryToFilter: (state: FiltersSliceState, action: PayloadAction<{ category_id: number }>) => {
        return {
            ...state,
            category_ids: [...state.category_ids ?? [], action.payload.category_id]
        }
    },
    
    removeCategoryFromFilter: (state: FiltersSliceState, action: PayloadAction<{ category_id: number }>) => {
        return {
            ...state,
            category_ids: state.category_ids?.filter(id => id !== action.payload.category_id)
        }
    },

    changePage: (state: FiltersSliceState, action: PayloadAction<number>) => {
        return {
            ...state,
            page: action.payload
        }
    },

    changeItemsPerPage: (state: FiltersSliceState, action: PayloadAction<number> )=>{
        return {
            ...state,
            itemsPerPage: action.payload
        }
    }
    
}
export default reducers;
