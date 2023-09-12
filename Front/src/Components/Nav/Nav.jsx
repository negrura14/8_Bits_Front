import React, { useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ROUTES } from '../../Helpers/RoutesPath.jsx';
import DateTimeDisplay from '../Time/Time.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import Imagen from '../../Img/Imagen1.png';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart, cartUpdate } from '../../Redux/cartSlice';
import './Nav.css';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { clearUser } from '../../Redux/userSlice.jsx'
import { swAuth } from '../../Redux/userActions.jsx';


function Nav() {
  const location = useLocation();
  const detail = /^\/Detail\/\d+$/i.test(location.pathname);
  // const isCartOpen = useSelector(state => state.cart.isCartOpen);
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const dispatch = useDispatch();
  const { user, auth } = useSelector((state) => state.user)
  const isCartUpdated = useSelector(state => state.cart.cartUpdate)
  
  const userData = user;
 

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


  const handlerSw = () => {
    dispatch(clearUser());
    dispatch(swAuth(!auth));
  }
  
  useEffect(() => {
    if (isCartUpdated){
      dispatch(cartUpdate())
    }
  }, [isCartUpdated, dispatch])

  return (

    <div className="container-fluid nav-bar">
    <nav className="d-flex flex-wrap justify-content-between py-3 mb-2 border-bottom">
    <div className="d-flex flex-wrap justify-content-between mb-2">

    <div  >
    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
      <img  src={Imagen} width="80px" alt="" />
      </a>
    </div>
      <div className='text-left align-self-end px-2'>
      {!Array.isArray(userData) && <span className='text-white'>Welcome, {user.user.name}</span>}</div>
    </div>
      <div className="d-flex flex-wrap justify-content-center mb-1">
      <ul className="nav nav-pills mb-1">
        <li className="nav-item margCart"><NavLink className='nav-link teal' to={ROUTES.HOME}>Home</NavLink></li>
        <li className="nav-item"><NavLink className='nav-link' to={ROUTES.STORE}>Store</NavLink></li>
        {auth === false && <li className="nav-item"><NavLink className='nav-link' to={ROUTES.LOGIN}>Login</NavLink></li>}
        {auth === true && <li className="nav-item"><NavLink className="nav-link" to={ROUTES.CREATEGAME}>Create Game</NavLink></li>}
        {auth === true && <li className="nav-item"><NavLink className='nav-link bg-danger' onClick={handlerSw}>Logout</NavLink></li>}
        
        {/* <NavDropdown
              id="nav-dropdown-dark-example"
              title="Create"
              menuVariant="dark"
            >
              <NavDropdown.Item ><NavLink className="nav-link" to={ROUTES.CREATEGAME}>Create Game</NavLink></NavDropdown.Item>
              <NavDropdown.Item >
              <NavLink className="nav-link" to={ROUTES.CREATEUSER}>Create User</NavLink>
              </NavDropdown.Item>
            </NavDropdown> */}


        <li className="color ps-3 pt-1 me-5" onClick={handleCartClick}>
        <i className="fa fa-shopping-cart cart"></i>
          <span className="item-count">{totalGames}</span>
        </li>

      </ul>
      <SearchBar />
      </div>
      
      
    </nav>
  </div>
  )
}

export default Nav
