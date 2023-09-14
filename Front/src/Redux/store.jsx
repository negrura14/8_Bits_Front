import { configureStore } from '@reduxjs/toolkit';
import game from'./gameSlice';
import genre from "./genreSlice";
import cart from './cartSlice';
import loadingReducer from './LoadingSlice'
import user from './userSlice'

export default configureStore({
    reducer:{
        game: game,
        genre: genre,
        cart: cart,
        loading: loadingReducer,
        user: user,

    }
})