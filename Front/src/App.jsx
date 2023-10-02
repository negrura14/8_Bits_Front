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
import { Cart } from './Views/Cart/Cart';
import TabProfile from './Views/UserProfile/TabProfile';
import {Cloudinary} from "@cloudinary/url-gen";
import { ShopCart } from './Components/ShoppingCart/ShopCart3';
import { useDispatch } from 'react-redux';
import { userDataFromCookie } from './Helpers/cookieUtils';
import { useEffect } from 'react';
import { updateFromCookie } from './Redux/Reducers/userSlice';
import MercadoPago from './Components/MercadoPago/MercadoPago';
import Checkout from './Components/MercadoPago/checkout/Checkout';
import SuccessMP from './Components/MercadoPago/success/SuccessMP';
import FailureMP from './Components/MercadoPago/failure/failureMP';
import {DashBoard} from "./Views/DashBoard/DashBoard.jsx";
import ContactUs from './Views/ContactUs/ContactUs';
import ParticlesComponent from './Components/Particles/ParticlesC';
import ResetPassword from './Components/ResetPasssword/ResetPassword';
import ParticlesComponent from './Components/Particles/ParticlesC';



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
      <ParticlesComponent/>
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
       <Route path = {ROUTES.CART} element= {<Cart/>}/>
       <Route path = {ROUTES.MERCADO} element= {<MercadoPago/>}/>
       <Route path = {ROUTES.CHECKOUT} element= {<Checkout/>}/>
       <Route path = {ROUTES.PROFILEUSER} element= {<TabProfile/>}/>
       <Route path = {ROUTES.SUCCESS} element= {<SuccessMP/>}/>
       <Route path = {ROUTES.FAILURE} element= {<FailureMP/>}/>
       <Route path = "/Dashboard" element= {<DashBoard/>}/>
       <Route path = {ROUTES.CONTACT} element= {<ContactUs/>}/>
       <Route path = {ROUTES.RESET} element= {<ResetPassword/>}/>
      </Routes>
      {!main && <Footer/>}
    </div>
  )
}

export default App
