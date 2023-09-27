import { createSlice } from '@reduxjs/toolkit';

export  const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState:{
        userProfile: [],
        userById:[]
    },
    reducers:{
        getUserProfile: (state, action) => {
            state.userProfile = action.payload;
        },

        getUserById:(state, action) =>{
            state.userById = action.payload
        }
    }
})

export const { getUserProfile, getUserById } = userProfileSlice.actions;

export default userProfileSlice.reducer;