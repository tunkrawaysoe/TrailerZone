import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import watchListReducer from "./watchListSlice";
import userReducer from "./userSlice";
import movieReducer from "./movieSlice";
import actorReducer from "./actorSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        watchList: watchListReducer,
        user: userReducer,
        movie: movieReducer,
        actor: actorReducer,
    }
})