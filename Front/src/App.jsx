import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Landing from '../src/Components/LandingPage/LandingPage';
import Home from '../src/Components/Home/Home';
import { ROUTES } from './Helpers/RoutesPath';
import NotFound from './Components/NotFound/NotFound'



function App() {

  return (
    <BrowserRouter>
      <div>
        
      <Routes>
       <Route path = {ROUTES.LANDING} element={<Landing/>}/>
       <Route path = {ROUTES.HOME} element={<Home/>}/>
       <Route path = {ROUTES.ERROR} element = {<NotFound/>}/>
      </Routes>
      </div>
    </BrowserRouter>
     
  )
}

export default App
