import { configureStore } from '@reduxjs/toolkit';
import game from'./gameSlice';
import gender from "./genderSlice";

export default configureStore({
    reducer:{
        game: game,
        gender: gender
    }
})