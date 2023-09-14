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
import Nav from './Components/Nav/Nav.jsx'
import Footer from './Components/Footer/Footer.jsx';
import Login from './Views/Login/Login';
import Search from './Components/Search/Search';
import CreateUser from './Components/Create User/CreateUser';

import {Cloudinary} from "@cloudinary/url-gen";
import { ShopCart } from './Components/ShoppingCart/ShopCart';

function App() {
  const location = useLocation();
  const main = location.pathname === '/';
  const cld = new Cloudinary({cloud: {cloudName: 'bits8'}})

  return (
    <div className="d-flex flex-column min-vh-100">
      {!main && <Nav/>}
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
      </Routes>
      {!main && <Footer/>}
    </div>
  )
}

export default App
