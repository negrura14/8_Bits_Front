import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css'
import Header from '../src/Components/LandingPage/LandingPage';
import Home from '../src/Components/Home/Home';
import DateTimeDisplay from './Components/Time/Time';

function App() {

  return (
    <BrowserRouter>
      <div>
        <div>
          <DateTimeDisplay />
        </div>
      <Routes>
       <Route exact path = '/' element={<Header/>}/>
       <Route exact path = '/home' element={<Home/>}/>
      </Routes>
      </div>
    </BrowserRouter>
     
  )
}

export default App
