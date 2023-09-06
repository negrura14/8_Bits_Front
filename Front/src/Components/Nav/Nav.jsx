import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar.jsx'
import { ROUTES } from '../../Helpers/RoutesPath.jsx';
import './Nav.css';

function Nav() {
  const location = useLocation();
  const detail = /^\/Detail\/\d+$/i.test(location.pathname);
  return (
    <div className='header'>
      <Link className={detail ? 'imgCenter' :'imgNav'} to="/">
        <img  src="../../../public/Imagen1.png" alt="" />
      </Link>
        <nav className={detail ? 'navCenter' : 'navContainer'}>
            <NavLink className='navLink' to={ROUTES.HOME}>Home</NavLink>
            <NavLink className='navLink' to={ROUTES.STORE}>Store</NavLink>
            <NavLink className='navLink' to={ROUTES.ABOUT}>About us</NavLink>
            <NavLink className='navLink' to={ROUTES.CREATE}>Create</NavLink>
        </nav>
        {!detail && <SearchBar />}
    </div>
  )
}

export default Nav