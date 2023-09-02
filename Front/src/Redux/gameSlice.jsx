import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
    name: 'game',
    initialState:{
        game:[],
        detail:{}
    },
    reducers:{
        getAllGame: (state, action) => {
            state.game = action.payload
        },
        getGameById: (state,action) => {
            state.detail = action.payload
        }
    }
})

export const {getAllGame, getGameById} = gameSlice.actions

export default gameSlice.reducer