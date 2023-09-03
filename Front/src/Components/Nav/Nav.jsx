import React from 'react'
import { NavLink } from 'react-router-dom'
import './Nav.css';
function Nav() {
  return (
    <div className='header'>
        <img className='imgNav' src="../../../public/Imagen1.png" alt="" />
        <nav>
            <NavLink className='navLink' to='/home'>Home</NavLink>
            <NavLink className='navLink' to='/home'>Store</NavLink>
            <NavLink className='navLink' to='/home'>About us</NavLink>
        </nav>
        <div className='seachBar'>searchBar</div>
    </div>
  )
}

export default Nav