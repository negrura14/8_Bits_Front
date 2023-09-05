import { createSlice } from '@reduxjs/toolkit';

export const genderSlice = createSlice({
    name: 'gender',
    initialState:{
        gender:[]
    },
    reducers:{
        getAllGenders: (state,action) => {
            state.genre = action.payload
        }
    }
})

export const {getAllGenders} = genderSlice.actions

export default genderSlice.reducer