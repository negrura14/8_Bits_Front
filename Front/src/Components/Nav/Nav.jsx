import React from 'react'
import { NavLink } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar.jsx'
import './Nav.css';

function Nav() {
  return (
    <div className='header'>
        <img className='imgNav' src="../../../public/Imagen1.png" alt="" />
        <nav className='navContainer'>
            <NavLink className='navLink' to='/home'>Home</NavLink>
            <NavLink className='navLink' to='/store'>Store</NavLink>
            <NavLink className='navLink' to='/About'>About us</NavLink>
        </nav>
        <SearchBar ></SearchBar>
    </div>
  )
}

export default Nav