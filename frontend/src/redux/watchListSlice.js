import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    movies: [],
    loading: false,
}

export const fetchWatchList = createAsyncThunk(
    "watchList/fetchWatchList",
    async (accessToken) => {
        const response = await fetch(`http://localhost:3000/watchlist`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return await response.json();
    }

)

const watchlistSlice = createSlice({
    name: "watchlist",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWatchList.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchWatchList.fulfilled, (state, action) => {
                state.movies = action.payload;
                state.loading = false;
            })
            .addCase(fetchWatchList.rejected, (state) => {
                state.loading = false;
            })
    }
})

export default watchlistSlice.reducer;