import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    item: {},
    loading: false,
}

export const fetchActors = createAsyncThunk("actor/fetchActors",
    async () => {
        const response = await fetch("http://localhost:3000/actors/");
        return await response.json();
    })

export const fetchActor = createAsyncThunk("actor/fetchActor", async (id) => {
    const response = await fetch(`http://localhost:3000/actors/${id}`)
    return await response.json();
})

const actorSlice = createSlice({
    name: "actor",
    initialState,
    reducers: {
        removeActor: (state, action) => {
            state.items = state.items.filter(actor => actor.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchActors.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchActors.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchActors.rejected, (state, action) => {
                state.loading = false
            })
            .addCase(fetchActor.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchActor.fulfilled, (state, action) => {
                state.loading = false;
                state.item = action.payload;
            })
            .addCase(fetchActor.rejected, (state, action) => {
                state.loading = false;
            })
    }

})
export const { removeActor } = actorSlice.actions;
export default actorSlice.reducer;