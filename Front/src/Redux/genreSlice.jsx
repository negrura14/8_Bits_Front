import { createSlice } from '@reduxjs/toolkit';

export const genreSlice = createSlice({
    name: 'genre',
    initialState:{
        genre:[]
    },
    reducers:{
        getAllGenres: (state,action) => {
            state.genre = action.payload
        }
    }
})

export const {getAllGenres} = genreSlice.actions

export default genreSlice.reducer