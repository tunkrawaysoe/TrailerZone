import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: null,
    user: null,
    loading: true
};

export const fetchRefreshToken = createAsyncThunk("auth/refresh",
    async () => {
        const response = await fetch("http://localhost:3000/auth/refresh",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            }

        );
        return await response.json();
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess(state, action) {
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
        },
        logOut(state, action) {
            state.accessToken = null;
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRefreshToken.fulfilled, (state, action) => {
                state.accessToken = action.payload.accessToken,
                state.loading = false;
            })
    }
})

export const { loginSuccess, logOut } = authSlice.actions;
export default authSlice.reducer;