import React, { useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../Helpers/RoutesPath.jsx';
import DateTimeDisplay from '../Time/Time.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import Imagen from '../../Img/Imagen1.png';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart, cartUpdate, UpdateList } from '../../Redux/Reducers/cartSlice.jsx';
import './Nav2.css';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { clearUser } from '../../Redux/Reducers/userSlice.jsx'
import { swAuth, userLogoutAct } from '../../Redux/userActions.jsx';
import avatarU from "../../Img/UserProfile/Avatars/Avatar (1).jpeg"
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Dropdown from 'react-bootstrap/Dropdown';

function Nav2() {
  const location = useLocation();
  const detail = /^\/Detail\/\d+$/i.test(location.pathname);
  // const isCartOpen = useSelector(state => state.cart.isCartOpen);
  // const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const dispatch = useDispatch();
  const { user, auth } = useSelector((state) => state.user.userState)
  const isCartUpdated = useSelector(state => state.cart.cartUpdate)
  
  const userData = user;
  const navigate = useNavigate()

  //---------------sweet alert-------------------//

  const MySwal = withReactContent(Swal);

  const swalWithBootstrapButtons = MySwal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  //----------------------------------//
  

  const uniqueIds = {};
  let totalGames = 0;
  if(auth === true){
    const cart = JSON.parse(localStorage.getItem(`cart.${userData.user.id}`)) || [];

    for (const element of cart) {
      if (!uniqueIds[element.id]) {
        uniqueIds[element.id] = true;
        totalGames += 1;
      }
    }
  }
// console.log("TEOTAL DE JUEGOS EN EL CARRITO: ", totalGames);

  const handleCartClick = () => {
    if(auth === true) {
      dispatch(UpdateList(userData.user.id));
      dispatch(toggleCart());
    }
    else {
      navigate('/login')
    }
  }


  const handlerSw = () => {
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You are going to logout!",
      icon: 'warning',
      background: "#1d1d1d",
      showCancelButton: true,
      confirmButtonText: "Yes, I'm sure",
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Success!',
          'You will be logged out',
          'success'
        )
        navigate('/')
        if(userData.authMethod === 'google'){  
          dispatch(clearUser());
          dispatch(swAuth(!auth));
        } else if (userData.authMethod === 'local'){
          dispatch(userLogoutAct())
          document.cookie = 'miCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        }

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'You will remain logged in',
          'error'
        )
      }
    })
 
  }
  
  // useEffect(() => {
  //   if (!auth){
  //     dispatch(cartUpdate())
  //   }
  // }, [isCartUpdated, dispatch])

  return (

    <>
    <header className="header_area">
        <div className="classy-nav-container breakpoint-off d-flex align-items-center justify-content-between">
            
            <nav className="classy-navbar my-1" id="essenceNav">
                
                <a className="nav-brand" href="/"><img  src={Imagen} width="80px" alt="" /></a>
               
                
                
                <div className="classy-menu">
                    
                    
                    
                    <div className="classynav ">
                        <ul>
                            <li><NavLink  to={ROUTES.HOME}>Home</NavLink></li>
                            <li><NavLink  to={ROUTES.STORE}>Store</NavLink></li>
                            {auth === false && <li><NavLink  to={ROUTES.LOGIN}>Login</NavLink></li>}
                            {auth === true && <li><NavLink  to={ROUTES.CREATEGAME}>Create Game</NavLink></li>}
                            
                        </ul>
                    </div>
                   
                </div>
            </nav>

            
            <div className="header-meta my-1 d-flex clearfix justify-content-end">
                
                <SearchBar/>
                
                
                <div className="user-login-info d-flex justify-content-center align-items-center">
                    {auth === true && 
        //<li className="nav-item"><NavLink className='nav-link bg-danger' onClick={handlerSw}>Logout</NavLink></li>
          <div >
            <Dropdown>
              <Dropdown.Toggle className='avatarButton' variant="success" id="dropdown-basic">
              <div ><img  className='avatarI' src={avatarU}></img></div>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item ><NavLink to={ROUTES.PROFILEUSER}>Profile</NavLink></Dropdown.Item>
                <Dropdown.Item className="bg-danger" ><NavLink className='text-white' onClick={handlerSw}>Logout</NavLink></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        }
                </div>
                
                <div className="cart-area">
                    <a id="essenceCartBtn"  onClick={handleCartClick}><i className="fa fa-shopping-cart cart fa-2x cartBtn"></i><span>{totalGames}</span></a>
                </div>
                <div className="cart-areaC">
                    <NavLink to={ROUTES.CART} id="essenceCartBtn"><i className="fa fa-shopping-cart cart fa-2x cartBtn"></i><span>{totalGames}</span></NavLink>
                </div>
            </div>

        </div>
    </header>

    </>

  )
}

export default Nav2
