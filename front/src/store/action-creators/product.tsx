import {IProduct} from "../../types/product";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {apiURL} from "../../config";
import products from "../../pages/Products/Products";

const baseQuery = fetchBaseQuery({
    baseUrl: apiURL,
    // credentials: 'include',
    prepareHeaders: (headers, { getState }: any) => {
        const token = getState().users?.user?.token
        console.log(token)
        if (token) {
            headers.set('Authorization', token);
        }
        return headers
    }
});

const apiSlice = createApi({
    reducerPath: 'products/api',
    tagTypes: ['Products'],
    baseQuery,
    endpoints: build => ({})
})
export const productsApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        fetchProducts: build.query({
            query: (categoryId: string | '' ) => ({
                url: categoryId ? `/products?category=${categoryId}` : `/products`,
            }),
            providesTags: result => ['Products']
        }),
        createProducts: build.mutation<IProduct, IProduct>({
            query: (productData) => {
                const formData = new FormData();
                formData.append("title", productData.title);
                formData.append("description", productData.description);
                formData.append("image", productData.image);
                formData.append("price", productData.price);
                formData.append("_id", productData._id);
                return {
                    url: `/products`,
                    method: 'POST',
                    body: productData,
                    formData: true,
                }
            },
            invalidatesTags: ['Products']
        }),
        fetchProductById: build.query({
            query: (id: string | undefined) => ({
                url: `/products/${id}`
            })
        }),
        removeProductById: build.mutation<IProduct, string>({
            query: (id: string | undefined) => ({
                url: `/products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Products']
        })
    })
})

export const {
    useFetchProductsQuery,
    useCreateProductsMutation,
    useFetchProductByIdQuery,
    useRemoveProductByIdMutation,
} = productsApi;
