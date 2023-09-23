import { createSlice } from '@reduxjs/toolkit';

export  const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState:{
        userProfile: [],
    },
    reducers:{
        getUserProfile: (state, action) => {
            state.userProfile = action.payload;
        }
    }
})

export const { getUserProfile } = userProfileSlice.actions;

export default userProfileSlice.reducer;