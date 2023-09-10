import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar.jsx'
import { ROUTES } from '../../Helpers/RoutesPath.jsx';
import DateTimeDisplay from '../Time/Time.jsx';
import Imagen from '../../../public/Imagen1.png';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart } from '../../Redux/cartSlice';
import './Nav.css';

function Nav() {
  const location = useLocation();
  const detail = /^\/Detail\/\d+$/i.test(location.pathname);
  // const isCartOpen = useSelector(state => state.cart.isCartOpen);
  const dispatch = useDispatch();

  const handleCartClick = () => {
    dispatch(toggleCart());
  }

  return (

    <div className="container-fluid nav-bar">
    <nav className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
      <img  src={Imagen} width="80px" alt="" />
      </a>

      <ul className="nav nav-pills">
        <li className="color" onClick={handleCartClick}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart3 " viewBox="0 0 16 16">
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
          </svg>
          <span className="item-count">0</span>
        </li>
        <li className="nav-item margCart"><NavLink className='nav-link teal' to={ROUTES.HOME}>Home</NavLink></li>
        <li className="nav-item"><NavLink className='nav-link' to={ROUTES.STORE}>Store</NavLink></li>
        <li className="nav-item"><NavLink className='nav-link' to={ROUTES.ABOUT}>About us</NavLink></li>
        <li className="nav-item"><NavLink className='nav-link' to={ROUTES.CREATEGAME}>Create</NavLink></li>
        <li className="nav-item"><NavLink className='nav-link' to={ROUTES.LOGIN}>Login</NavLink></li>
        <li className="nav-item">
      <DateTimeDisplay /></li>
      </ul>
      {!detail && <SearchBar />}
    </nav>
  </div>
  )
}

export default Nav