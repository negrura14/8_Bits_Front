import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Landing from '../src/Components/LandingPage/LandingPage';
import Home from '../src/Components/Home/Home';
import { ROUTES } from './Helpers/RoutesPath';
import NotFound from './Components/NotFound/NotFound'
import Detail from './Components/Detail/Detail'
import Create from './Components/Create/Create.jsx';
import About from './Components/About/about';


function App() {

  return (
    <BrowserRouter>
      <div>
        
      <Routes>
       <Route path = {ROUTES.LANDING} element={<Landing/>}/>
       <Route path = {ROUTES.HOME} element={<Home/>}/>
       <Route path = {ROUTES.DETAIL} element={<Detail/>}/>
       <Route path = {ROUTES.ERROR} element = {<NotFound/>}/>
       <Route path = {ROUTES.CREATE} element = {<Create />} />
       <Route path = {ROUTES.ABOUT} element = {<About/>}/>
      </Routes>
      </div>
    </BrowserRouter>
     
  )
}

export default App
