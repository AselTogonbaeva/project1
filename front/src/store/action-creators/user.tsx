import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {apiURL} from "../../config";
import 'react-toastify/dist/ReactToastify.css';

const baseQuery = fetchBaseQuery({
    baseUrl: apiURL,
    // credentials: 'include',
    prepareHeaders: (headers, { getState }: any) => {
        const token = getState().users?.user?.token

        if (token) {
            headers.set('Authorization', token);
        }
        return headers
    }
});

 const apiSlice = createApi({
    reducerPath: 'users/api',
    baseQuery,
    endpoints: build => ({})
})


export const usersApi = apiSlice.injectEndpoints({
   endpoints: (build) => ({
        registerUser: build.mutation<any, any>({
            query: (userData) => ({
                url: `/users`,
                method: 'POST',
                body: userData,
            })

        }),
        loginUser: build.mutation<any, any>({
            query: (userData) => ({
                url: `/users/sessions`,
                method: 'POST',
                body: userData,
            }),

        }),
        logoutUser: build.mutation<any, string>({
            query: (token) => ({
                url: `/users/sessions`,
                method: 'DELETE',
                headers: {
                    "Authorization": token || ''
                }
            })
        }),
       googleLogin: build.mutation<any, any>({
           query: (googleData: any) => ({
               url: `/users/googleLogin`,
               method: 'POST',
               headers: {
                   "Content-Type": "application/json"
               },
               body: JSON.stringify({credential: googleData.credential})
           })
       })
    })
})

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useGoogleLoginMutation
} = usersApi

// export const registerUser = createAsyncThunk(
//     'users/registerUser',
//     async (userData: IUser, thunkAPI) => {
//         try {
//             const response = await AxiosApi.post('/users', userData);
//
//             // if (response.data.token) {
//             //     window.localStorage.setItem('token', response.data.token)
//             // }
//             return response.data;
//         } catch (e: any) {
//             if (e.response && e.response.data) {
//                return thunkAPI.rejectWithValue(e.response.data)
//             } else {
//                 return thunkAPI.rejectWithValue({global: 'No internet'})
//             }
//
//         }
//     }
// )

// export const logoutUser = createAsyncThunk(
//     'users/logoutUser',
//     async (_, thunkAPI) => {
//         try {
//             // const state = thunkAPI.getState();
//             const token = store.getState().userReducer?.user?.token;
//
//             // Perform the logout operation, e.g., make an API call
//             await AxiosApi.delete('/users/sessions', {
//                 headers: {Authorization: token},
//             });
//
//         } catch (e) {
//             throw e
//         }
//     })