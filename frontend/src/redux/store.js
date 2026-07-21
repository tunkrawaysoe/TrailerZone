import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import watchListReducer from "./watchListSlice";
import userReducer from "./userSlice"
export const store = configureStore({
    reducer: {
        auth: authReducer,
        watchList: watchListReducer,
        user: userReducer
    }
})