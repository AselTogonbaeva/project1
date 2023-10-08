import {IProduct, ProductState} from "../../types/product";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {userSlice} from "./userSlice";

const initialState: ProductState = {
    products: [],
    product: null,
    loading: false,
    error: null,
    createLoading: false,
    createError: null,
}

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        fetchProductsSlice(state, action: PayloadAction<IProduct[]>) {
           state.products = action.payload;
        },
        createProductsSlice(state, action: PayloadAction<IProduct>) {
           state.product = action.payload;
        },
        deleteProductById(state, action: PayloadAction<string>) {
            state.products = state.products.filter(product => product._id !== action.payload)
            console.log(action.payload)
        }
    }
});

export const productActions = productSlice.actions;
export const productReducer = productSlice.reducer;
