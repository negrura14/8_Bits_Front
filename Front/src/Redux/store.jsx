import { configureStore } from '@reduxjs/toolkit';
import game from'./gameSlice';
import gender from "./genderSlice";
import cartSlice from './cartSlice';

export default configureStore({
    reducer:{
        game: game,
        gender: gender,
        cart: cartSlice
    }
})