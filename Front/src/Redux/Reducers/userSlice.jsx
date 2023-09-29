import { createSlice } from '@reduxjs/toolkit';
import gameSlice from './gameSlice';

export  const userSlice = createSlice({
    name: 'user',
    initialState:{
        user: [],
        users: [],
        userProfile: [],
        userGamesPay: [],
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
        },
        getUserGames: (state, action) => {
            state.userGamesPay = action.payload;
        },
        clearUsers: (state) => {
        state.users = [];
    },
    }
})

export const { userLogin, clearUser, clearUsers, getUsers, switchAut, updateFromCookie, userLogout, getUserProfile, getUserGames } = userSlice.actions;

export default userSlice.reducer;