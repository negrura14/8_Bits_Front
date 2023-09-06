import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar.jsx'
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
            <NavLink className='navLink' to='/home'>Home</NavLink>
            <NavLink className='navLink' to='/store'>Store</NavLink>
            <NavLink className='navLink' to='/About'>About us</NavLink>
            <NavLink className='navLink' to='/create'>Create</NavLink>
        </nav>
        {!detail && <SearchBar />}
    </div>
  )
}

export default Nav