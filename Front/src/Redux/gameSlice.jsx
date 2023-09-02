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
        },
        getGameByName: (state,action) => {
            state.detail = action.payload
        }
    }
})

export const {getAllGame, getGameById, getGameByName} = gameSlice.actions

export default gameSlice.reducer