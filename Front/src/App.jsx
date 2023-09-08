import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css'
import Landing from '../src/Components/LandingPage/LandingPage';
import Home from '../src/Components/Home/Home';
import { ROUTES } from './Helpers/RoutesPath';
import NotFound from './Components/NotFound/NotFound'
import Detail from './Components/Detail/Detail'
import Create from './Components/Create/Create.jsx';
import About from './Components/About/About';
import Tienda from './Components/Tienda/Tienda.jsx'
import Nav from './Components/Nav/Nav.jsx'
import Footer from './Components/Footer/Footer.jsx';
import Login from './Views/Login';

import {Cloudinary} from "@cloudinary/url-gen";

function App() {
  const location = useLocation();
  const main = location.pathname === '/';
  const cld = new Cloudinary({cloud: {cloudName: 'bits8'}})

  return (
    <div>
      {!main && <Nav/>}
      <Routes>
       <Route path = {ROUTES.LANDING} element={<Landing/>}/>
       <Route path = {ROUTES.HOME} element={<Home/>}/>
       <Route path = "/Detail/:id" element={<Detail/>}/>
       <Route path = {ROUTES.CREATE} element = {<Create />} />
       <Route path = {ROUTES.STORE} element = {<Tienda />} />
       <Route path = {ROUTES.ABOUT} element = {<About/>}/>
       <Route path = {ROUTES.ERROR} element = {<NotFound/>}/>
       <Route path = {ROUTES.LOGIN} element = {<Login/>}/>
      </Routes>
      {!main && <Footer/>}
    </div>
  )
}

export default App
