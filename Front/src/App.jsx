import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css'
import Landing from '../src/Components/LandingPage/LandingPage';
import Home from '../src/Components/Home/Home';
import { ROUTES } from './Helpers/RoutesPath';
import NotFound from './Components/NotFound/NotFound'
import Detail from './Components/Detail/Detail'
import Create from './Components/Create/Create.jsx';
import About from './Components/About/about';
import Tienda from './Components/Tienda/Tienda.jsx'
import Nav from './Components/Nav/Nav.jsx'


function App() {
  // const {pathname} = useLocation();
  // const isLoginPage = location.pathname === '/';
  return (
    <BrowserRouter>
      <div>
      {/* {!isLoginPage && <Nav/>} */}
      {/* { pathname !== '/' && <Nav/>} */}
      <Nav/>
      <Routes>
       <Route path = {ROUTES.LANDING} element={<Landing/>}/>
       <Route path = {ROUTES.HOME} element={<Home/>}/>
       <Route path = {ROUTES.DETAIL} element={<Detail/>}/>
       <Route path = {ROUTES.CREATE} element = {<Create />} />
       <Route path = {ROUTES.STORE} element = {<Tienda />} />
       <Route path = {ROUTES.ABOUT} element = {<About/>}/>
       <Route path = {ROUTES.ERROR} element = {<NotFound/>}/>
      </Routes>
      </div>
    </BrowserRouter>
     
  )
}

export default App
