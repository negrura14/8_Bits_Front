import React from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import store from './Redux/store.jsx'
import axios from 'axios';
import './index.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import '@sweetalert2/theme-dark/dark.css';

const persistor = persistStore(store)




// axios.defaults.baseURL= 'http://localhost:3001';
 axios.defaults.baseURL= 'https://eight-bits-back.onrender.com'




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PersistGate persistor={persistor}>
    <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider>
    </PersistGate>
  </React.StrictMode>,
)
