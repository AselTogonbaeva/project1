import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {apiURL} from "../../config";
import {ICategory} from "../../types/category";


export const categoriesApi = createApi({
    reducerPath: 'categories/api',
    baseQuery: fetchBaseQuery({
        baseUrl: apiURL
    }),
    endpoints: (build) => ({
        fetchCategories: build.query<ICategory[], void>({
            query: () => ({
                url: `/categories`
            })
        }),
        createCategories: build.mutation<ICategory, ICategory>({
            query: (categoryData) => ({
                url: `/categories`,
                method: 'POST',
                body: categoryData
            })
        })
    })

})

export const {useFetchCategoriesQuery, useCreateCategoriesMutation} = categoriesApi;

// export const fetchCategories = createAsyncThunk(
//     "categories/fetchCategories",
//     async (_, thunkAPI) => {
//         try {
//             const response = await AxiosApi.get('/categories');
//             return response.data;
//         } catch (e) {
//             return thunkAPI.rejectWithValue("Error data not loaded");
//         }
//     }
// )