import { configureStore } from '@reduxjs/toolkit';
import game from'./gameSlice';
import gender from "./genderSlice";
import cart from './cartSlice';
import loadingReducer from './LoadingSlice'
import user from './userSlice'

export default configureStore({
    reducer:{
        game: game,
        gender: gender,
        cart: cart,
        loading: loadingReducer,
        user: user,

    }
})