import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    profile: null,
    loading: true,
}

export const fetchUser = createAsyncThunk(
    "user/profile",
    async (accessToken) => {
        const response = await fetch("http://localhost:3000/users/me", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return await response.json();
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearProfile(state, action) {
            state.profile = null,
                state.loading = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.profile = action.payload;
                state.loading = false;
            })
            .addCase(fetchUser.rejected, (state) => {
                state.profile = null;
                state.loading = false;
            });
    }
})
export const { setProfile, clearProfile } = userSlice.actions;
export default userSlice.reducer;