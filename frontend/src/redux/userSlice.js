import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    profile: null,
    items: [],
    loading: false,
}

export const fetchUsers = createAsyncThunk("user/fetchUsers",
    async () => {
        const response = await fetch("http://localhost:3000/admin/users");
        return await response.json();
    }
)

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
        },
        removeUser(state, action) {
            state.items = state.items.filter(
                (user) => user.id !== action.payload
            );
        },
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
            })
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.users;
            })
            .addCase(fetchUsers.rejected, (state) => {
                state.loading = false;
            })
    },

})
export const { removeUser, clearProfile } = userSlice.actions;
export default userSlice.reducer;