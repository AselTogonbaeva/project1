import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser, UserState} from "../../types/user";

export const initialState: UserState = {
    user: null,
    loginLoading: false,
    loginError: { error: "" } ,
    registerLoading: false,
    registerError: { }

}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        registerUserSlice(state, action: PayloadAction<any>) {
           state.user = action.payload;
        },
        loginUserSlice(state, action: PayloadAction<any>) {
           state.user = action.payload;
        },
        logout(state, action: PayloadAction<null>) {
            state.user = action.payload;
        },
    }
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;

