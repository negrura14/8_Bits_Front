import { createSlice } from '@reduxjs/toolkit';

export const genreSlice = createSlice({
    name: 'genre',
    initialState:{
        genre:[],
        genreStatistics: [],
    },
    reducers:{
        getAllGenres: (state,action) => {
            state.genre = action.payload
        },
        setGenreStatistics: (state, action) => {
            state.genreStatistics = action.payload;
        },
    }
})

export const {getAllGenres, setGenreStatistics} = genreSlice.actions

export default genreSlice.reducer