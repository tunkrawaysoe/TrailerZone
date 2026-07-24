import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import watchListReducer from "./watchListSlice";
import userReducer from "./userSlice"
import movieReducer from "./movieSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        watchList: watchListReducer,
        user: userReducer,
        movie: movieReducer,
    }
})