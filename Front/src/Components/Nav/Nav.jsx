import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar.jsx'
import { ROUTES } from '../../Helpers/RoutesPath.jsx';
import DateTimeDisplay from '../Time/Time.jsx';
import './Nav.css';

function Nav() {
  const location = useLocation();
  const detail = /^\/Detail\/\d+$/i.test(location.pathname);
  return (

    <div class="container-fluid nav-bar">
    <nav class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
      <img  src="../../../public/Imagen1.png" width="80px" alt="" />
      </a>

      <ul class="nav nav-pills">
        <li class="nav-item"><NavLink className='nav-link teal' to={ROUTES.HOME}>Home</NavLink></li>
        <li class="nav-item"><NavLink className='nav-link' to={ROUTES.STORE}>Store</NavLink></li>
        <li class="nav-item"><NavLink className='nav-link' to={ROUTES.ABOUT}>About us</NavLink></li>
        <li class="nav-item"><NavLink className='nav-link' to={ROUTES.CREATE}>Create</NavLink></li>
        <li class="nav-item">
      <DateTimeDisplay /></li>
      </ul>
      {!detail && <SearchBar />}
    </nav>
  </div>
  )
}

export default Nav