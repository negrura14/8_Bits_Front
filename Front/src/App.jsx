import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Landing from '../src/Components/LandingPage/LandingPage';
import Home from '../src/Components/Home/Home';
import { ROUTES } from './Helpers/RoutesPath';


function App() {

  return (
    <BrowserRouter>
      <div>
      <Routes>
       <Route exact path = {ROUTES.LANDING} element={<Landing/>}/>
       <Route exact path = {ROUTES.HOME} element={<Home/>}/>
      </Routes>
      </div>
    </BrowserRouter>
     
  )
}

export default App
