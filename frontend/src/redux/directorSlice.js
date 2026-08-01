import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    loading: false
}

export const fetchDirectors = createAsyncThunk("director/fetch",
    async () => {
        const response = await fetch("http://localhost:3000/directors")
        return await response.json();
    }
)

const directorSlice = createSlice({
    name: "director",
    initialState,
    reducers: {
        removeDirector(state, action) {
            state.items = state.items.filter(director => director.id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDirectors.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDirectors.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchDirectors.rejected, (state, action) => {
                state.loading = false;
            })
    }
})
export const { removeDirector } = directorSlice.actions;
export default directorSlice.reducer;