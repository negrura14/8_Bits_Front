import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk';
import game from'./gameSlice';
import genre from "./genreSlice";
import cart from './cartSlice';
import loadingReducer from './LoadingSlice'
import user from './userSlice'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['userState']
}

const rootReducer = combineReducers({
    userState: user
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default configureStore({
    reducer:{
        game: game,
        genre: genre,
        cart: cart,
        loading: loadingReducer,
        user: persistedReducer,

    },
    middleware: [thunk]
})