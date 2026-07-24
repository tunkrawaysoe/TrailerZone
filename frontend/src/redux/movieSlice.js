import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    loading: false
};

export const fetchMovies = createAsyncThunk("movies/fetchMovies",
    async () => {
        const response = await fetch("http://localhost:3000/movies");
        return await response.json();
    }
)

export const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.movies;
            })
            .addCase(fetchMovies.rejected, () => {
                state.loading = false
            })
    }
})

export default moviesSlice.reducer;