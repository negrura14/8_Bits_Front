import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css'
import Landing from './Views/LandingPage/LandingPage';
import Home from './Views/Home/Home'
import { ROUTES } from './Helpers/RoutesPath';
import NotFound from './Components/NotFound/NotFound'
import Detail from './Views/Detail/Detail'
import CreateGame from './Components/Create Game/CreateGame.jsx';
import About from './Views/About/About';
import Tienda from './Views/Tienda/Tienda'
import Nav2 from './Components/Nav/Nav2.jsx'
import Footer from './Components/Footer/Footer.jsx';
import Login from './Views/Login/Login';
import Search from './Components/Search/Search';
import CreateUser from './Components/Create User/CreateUser';
import TabProfile from './Views/UserProfile/TabProfile';
import {Cloudinary} from "@cloudinary/url-gen";
import { ShopCart } from './Components/ShoppingCart/ShopCart3';
import { useDispatch } from 'react-redux';
import { userDataFromCookie } from './Helpers/cookieUtils';
import { useEffect } from 'react';
import { updateFromCookie } from './Redux/Reducers/userSlice';
import MercadoPago from './Components/MercadoPago/MercadoPago';
import {DashBoard} from "./Views/DashBoard/DashBoard.jsx"


function App() {
  const location = useLocation();
  const main = location.pathname === '/';
  const cld = new Cloudinary({cloud: {cloudName: 'bits8'}})

  const dispatch = useDispatch();

  useEffect(() => {
    const miCookie = document.cookie;
    const cookieData = userDataFromCookie(miCookie);

    if (cookieData) {
      dispatch(updateFromCookie(cookieData));
    }
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      {!main && <Nav2/>}
      <ShopCart></ShopCart>
      <Routes>
       <Route path = {ROUTES.LANDING} element={<Landing/>}/>
       <Route path = {ROUTES.HOME} element={<Home/>}/>
       <Route path = "/Detail/:id" element={<Detail/>}/>
       <Route path = {ROUTES.CREATEGAME} element = {<CreateGame />} />
       <Route path = {ROUTES.CREATEUSER} element = {<CreateUser />} />
       <Route path = {ROUTES.STORE} element = {<Tienda />} />
       <Route path = {ROUTES.ABOUT} element = {<About/>}/>
       <Route path = {ROUTES.ERROR} element = {<NotFound/>}/>
       <Route path = {ROUTES.LOGIN} element = {<Login/>}/>
       <Route path = {ROUTES.SEARCH} element= {<Search/>}/>
       <Route path = {ROUTES.MERCADO} element= {<MercadoPago/>}/>
       <Route path = {ROUTES.PROFILEUSER} element= {<TabProfile/>}/>
       <Route path = "/Dashboard" element= {<DashBoard/>}/>
      </Routes>
      {!main && <Footer/>}
    </div>
  )
}

export default App
