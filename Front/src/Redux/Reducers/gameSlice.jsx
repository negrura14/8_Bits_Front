import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
    name: 'game',
    initialState:{
        game:[],
        detail:[],
        search:[],
        auxGames: [],
        filter: [],
    },
    reducers:{
        getAllGame: (state, action) => {
            state.game = action.payload
            state.auxGames = action.payload
        },
        getGameById: (state,action) => {
            state.detail = action.payload
        },
        clearDetail: (state) => {
            state.detail = []; // Establece detail en un objeto vacío al llamar a clearDetail
        },
        getGameByName: (state,action) => {

            state.search = action.payload
        },
        clearSearch: (state)=>{
            state.search = [];
        },
        filterGames: (state, action) => {
            state.game = action.payload
            state.filter = action.payload
        },
        clearFilter: (state)=>{
            state.filter = [];
        },

    }
})

export const {getAllGame, getGameById, getGameByName, clearDetail, clearSearch, filterGames, clearFilter } = gameSlice.actions

export default gameSlice.reducer
