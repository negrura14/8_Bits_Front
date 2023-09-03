import { configureStore } from '@reduxjs/toolkit';
import game from'./gameSlice'

export default configureStore({
    reducer:{
        game: game
    }
})