import React from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './Redux/store.jsx'
import axios from 'axios';
import './index.css'

axios.defaults.baseURL= 'http://localhost:3001';
// axios.defaults.baseURL= 'https://eight-bits-back.onrender.com'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
