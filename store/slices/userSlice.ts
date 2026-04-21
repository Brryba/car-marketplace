import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "@/types/user-types";

interface AuthState {
    isLoggedIn: boolean;
    user?: User
}

const initialState: AuthState = {
    isLoggedIn: false,
    user: undefined,
};

export const userSlice = createSlice({
    name: "user",
    initialState : initialState,
    reducers: {
        setUserData: (state: AuthState, action: PayloadAction<User>) => {
            state.isLoggedIn = true;
            state.user = action.payload;
            return state;
        },
        clearUserData: (state: AuthState) => {
            state.isLoggedIn = false;
            state.user = undefined;
            return state;
        }
    }
})

export const { setUserData, clearUserData } = userSlice.actions;

export default userSlice.reducer;