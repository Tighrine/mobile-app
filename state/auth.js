import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerUser } from "./authActions";

const userToken = AsyncStorage.getItem('userToken') ? AsyncStorage.getItem('userToken') : null;

const initialState = {
    userInfo: null,
    userToken: userToken,
    loading: false,
    success: false,
    error: null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: state => {
            AsyncStorage.removeItem('userToken'); // delete token from storage
            state.loading = false
            state.userInfo = null
            state.userToken = null
            state.error = null
        }
    },

    extraReducers: {

        [registerUser.pending]: state => {
            state.loading = true;
            state.success = null;
        },
        [registerUser.fulfilled]: state => {
            state.loading = false;
            state.success = true;
        },
        [registerUser.rejected]: state => {
            state.loading = false;
            state.success = false;
        } 
    }
});

export const { logout } = userSlice.actions;

export const userSelector = state => state.user;