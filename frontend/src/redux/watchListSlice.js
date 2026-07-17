import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movies: [],
}

const watchlistSlice = createSlice({
    name: "watchlist",
    initialState,
    reducers: {
        setWatchList(state, action) {
            state.movies = action.payload
        },
        clearWatchList(state) {
            state.movies = [];
        }
    }
})

export const { setWatchList, clearWatchList } = watchlistSlice.actions;
export default watchlistSlice.reducer;