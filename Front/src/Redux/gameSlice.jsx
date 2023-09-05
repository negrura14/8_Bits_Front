import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
    name: 'game',
    initialState:{
        game:[],
        detail:[]
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
            console.log("ESTO ES LO QUE LLEGA AL ACTION DE GAME NAME: ", typeof(action.payload));
            if(typeof(action.payload) === 'object'){
                state.game = action.payload
            }
            else{
                alert("This game is not available");
            }
        },
        filterGames: (state, action) => {
            state.game = action.payload
            state.filter = action.payload
        }
    }
})

export const {getAllGame, getGameById, getGameByName, clearDetail, filterGames } = gameSlice.actions

export default gameSlice.reducer
