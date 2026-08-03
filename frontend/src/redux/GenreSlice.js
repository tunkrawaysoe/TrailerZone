import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    loading: false
}

export const fetchGenres = createAsyncThunk("genre/fetchgenres",
    async () => {
        const response = await fetch("http://localhost:3000/genres")
        return await response.json();
    }
)

const genreSlice = createSlice({
    name: "Genre",
    initialState,
    reducers: {
        removeGenre(state, action) {
            state.items = state.items.filter(genre => genre.id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGenres.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchGenres.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchGenres.rejected, (state, action) => {
                state.loading = false;
            })
    }
})
export const { removeGenre } = genreSlice.actions;
export default genreSlice.reducer;