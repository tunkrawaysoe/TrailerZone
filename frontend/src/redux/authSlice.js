import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: null,
    user: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess(state, action) {
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
        },
        logOut(state, action) {
            state.accessToken = null;
            state.user = null;
        }
    }
})

export const { loginSuccess, logOut } = authSlice.actions;
export default authSlice.reducer;