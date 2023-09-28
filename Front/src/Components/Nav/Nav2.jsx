import React, { useEffect, useState } from 'react'
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
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Dropdown from 'react-bootstrap/Dropdown';
import LoadingPage from '../Loading/Loading.jsx';
import { getUserByIdAction } from '../../Redux/userProfileActions.jsx';

function Nav2() {
  const location = useLocation();
  const detail = /^\/Detail\/\d+$/i.test(location.pathname);
  // const isCartOpen = useSelector(state => state.cart.isCartOpen);
  // const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const dispatch = useDispatch();
  const { user, auth } = useSelector((state) => state.user.userState)
  const isCartUpdated = useSelector(state => state.cart.cartUpdate)
  const { userById } = useSelector((state) => state.userProfile);
  const [loading, setLoading] = useState(true);
  
  
  console.log(userById, 'asd')

  useEffect(() => {
    if(Array.isArray(user) === false) {
      dispatch(getUserByIdAction(user.user.id))
      .then (() =>{
        setLoading(false);
      })
      .catch((error) => {
        alert('Error', error);
        setLoading(false);
      })
    } else {
      setLoading(false);
    } 
  }, [dispatch, user]);

  const userData = user;
  const navigate = useNavigate()
  const defaultPhoto = "https://res.cloudinary.com/bits8/image/upload/v1695360325/Avatar%20Images/ftme8psm1dbrgyjltb6w.jpg";
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
      MySwal.fire({
        title: <strong>WARNING</strong>,
        html: <i>You have to login to purchase a game</i>,
        icon: 'info',
        background : "#1d1d1d",
      });

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
  if(loading) {
    return(
      <div> 
          <LoadingPage/>
      </div>
    )
  } else {
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

              <Dropdown.Toggle className='avatarButton'  id="dropdown-basic">
              <div ><img  className='avatarI' src={userById.image ? userById.image : defaultPhoto}></img></div>
              </Dropdown.Toggle>

              <Dropdown.Menu>
              {auth === true && userById.admin === true && (<Dropdown.Item ><NavLink to={"/Dashboard"}>Dashboard</NavLink></Dropdown.Item>)}
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
}}

export default Nav2
