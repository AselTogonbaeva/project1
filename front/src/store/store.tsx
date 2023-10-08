import {configureStore} from "@reduxjs/toolkit";
import {loadFromLocalStorage, saveToLocalStorage} from "./localStorage";
import {productsApi} from "./action-creators/product";
import {categoriesApi} from "./action-creators/category";
import {usersApi} from "./action-creators/user";
import {categoriesReducer} from "./reducers/categoriesSlice";
import {userReducer} from "./reducers/userSlice";
import {setupListeners} from "@reduxjs/toolkit/query";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {apiURL} from "../config";
import {productReducer} from "./reducers/productSlice";


const persistedState = loadFromLocalStorage();

const rootReducer = {
    [productsApi.reducerPath]: productsApi.reducer,
    products: productReducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    categories: categoriesReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    users: userReducer,
};



export const store = configureStore({
    reducer: rootReducer,
    preloadedState: persistedState,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware, categoriesApi.middleware, usersApi.middleware)
});

store.subscribe(() => {
    saveToLocalStorage({
        users: store.getState().users
    })
});






export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);