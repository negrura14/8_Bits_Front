import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ROUTES } from '../../Helpers/RoutesPath.jsx';
import Imagen from '../../Img/Imagen1.png';
import SearchBar from '../SearchBar/SearchBar.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart } from '../../Redux/cartSlice';
import './Nav.css';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Nav() {
  const location = useLocation();
  const detail = /^\/Detail\/\d+$/i.test(location.pathname);
  // const isCartOpen = useSelector(state => state.cart.isCartOpen);
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const dispatch = useDispatch();
  


  const uniqueIds = {};
  let totalGames = 0;
  for (const element of cart) {
    if (!uniqueIds[element.id]) {
      uniqueIds[element.id] = true;
      totalGames += 1;
    }
  }
// console.log("TEOTAL DE JUEGOS EN EL CARRITO: ", totalGames);

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
        <li className="nav-item margCart"><NavLink className='nav-link teal' to={ROUTES.HOME}>Home</NavLink></li>
        <li className="nav-item"><NavLink className='nav-link' to={ROUTES.STORE}>Store</NavLink></li>
        <li className="nav-item"><NavLink className='nav-link' to={ROUTES.LOGIN}>Login</NavLink></li>
        <li className="nav-item"><NavLink className="nav-link" to={ROUTES.CREATEGAME}>Create Game</NavLink></li>
        <li className="color p-1 me-5" onClick={handleCartClick}>
        <i className="fa fa-shopping-cart cart"></i>
          <span className="item-count">{totalGames}</span>
        </li>
      </ul>
      <SearchBar />
      
    </nav>
  </div>
  )
}

export default Nav