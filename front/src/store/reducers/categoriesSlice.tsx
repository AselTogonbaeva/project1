import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CategoryState, ICategory} from "../../types/category";



const initialState: CategoryState = {
    categories: [],
    loading: false,
    error: null,
}

export const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        fetchCategories(state, action: PayloadAction<ICategory[]>) {
          state.categories = action.payload;
        },
    }
});

export const categoriesActions = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;