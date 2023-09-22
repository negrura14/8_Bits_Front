import { createSlice } from '@reduxjs/toolkit';
import gameSlice from './gameSlice';

export  const userSlice = createSlice({
    name: 'user',
    initialState:{
        user: [],
        users: [],
        userProfile: [],
        auth: false,
    },
    reducers:{
        userLogin: (state, action) => {
            state.user = action.payload;
            state.auth = true
        },
        clearUser: (state) => {
            state.user = [];
        },
        getUsers: (state, action) => {
            state.users = action.payload
        },
        switchAut: (state, action) => {
            state.auth = action.payload
        },
        updateFromCookie: (state, action) => {
            state.user = action.payload;
            state.auth = true;
        },
        userLogout: (state) => {
            state.user = [];
            state.auth = false;
        },
        getUserProfile: (state, action) => {
            state.userProfile = action.payload;
        }
    }
})

export const { userLogin, clearUser, getUsers, switchAut, updateFromCookie, userLogout, getUserProfile } = userSlice.actions;

export default userSlice.reducer;