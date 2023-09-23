import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk';
import game from'./Reducers/gameSlice';
import genre from "./Reducers/genreSlice";
import cart from './Reducers/cartSlice';
import loadingReducer from './Reducers/LoadingSlice'
import user from './Reducers/userSlice'
import checkoutSlice from './Reducers/checkoutSlice';
import paymentsSlice from './Reducers/paymentsSlice';
import userProfile from './Reducers/userProfile';

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
        checkout: checkoutSlice,
        payments: paymentsSlice,
        userProfile: userProfile,
        

    },
    middleware: [thunk]
})