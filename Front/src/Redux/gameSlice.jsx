import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
    name: 'game',
    initialState:{
        game:[],
        detail:[],
        filter: []
    },
    reducers:{
        getAllGame: (state, action) => {
            state.game = action.payload
        },
        getGameById: (state,action) => {
            state.detail = action.payload
        },
        clearDetail: (state) => {
            state.detail = []; // Establece detail en un objeto vacío al llamar a clearDetail
        },
        getGameByName: (state,action) => {
            state.detail = action.payload
        },
        filterGames: (state, action) => {
            state.filter = action.payload
        }
    }
})

export const {getAllGame, getGameById, getGameByName, clearDetail, filterGames} = gameSlice.actions

export default gameSlice.reducer