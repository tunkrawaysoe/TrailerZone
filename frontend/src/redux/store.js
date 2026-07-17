import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import watchListReducer from "./watchListSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        watchList: watchListReducer
    }
})