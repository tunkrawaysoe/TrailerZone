import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    item: {},
    loading: false
};

export const fetchMovies = createAsyncThunk("movies/fetchMovies",
    async () => {
        const response = await fetch("http://localhost:3000/movies");
        return await response.json();
    }
)

export const fetchMovie = createAsyncThunk("movies/fetchMovie",
    async (movieId) => {
        const response = await fetch(`http://localhost:3000/movies/${movieId}`);
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
            .addCase(fetchMovie.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMovie.fulfilled, (state, action) => {
                state.loading = false;
                state.item = action.payload;
            })
            .addCase(fetchMovie.rejected, (state) => {
                state.loading = false
            })
    }
})

export default moviesSlice.reducer;