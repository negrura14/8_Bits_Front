import './CardT.css'
import {Link} from 'react-router-dom'
import React, { useEffect } from 'react'
import { ROUTES } from '../../Helpers/RoutesPath'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, cartUpdate } from '../../Redux/Reducers/cartSlice';
import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function Card (props) {
const {game} = props;
const dispatch = useDispatch()
// const cart = useSelector((state) => state.cart.listCart)
const { user, auth } = useSelector((state) => state.user.userState)
const userData = user;
const navigate = useNavigate();


//--------------------sweet alert---------------------------//
const MySwal = withReactContent(Swal);
    
const Toast = MySwal.mixin({  
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

//--------------------sweet alert---------------------------//


const handleChangeOnClic = () => {
    // console.log("Esto es lo que muestra el GAME dentro de CARDT: ", game);
    if(auth === true) {
        const cart = JSON.parse(localStorage.getItem(`cart.${userData.user.id}`)) || [];

        cart.push(game);

        localStorage.setItem(`cart.${userData.user.id}`, JSON.stringify(cart));
        dispatch(addToCart(cart))
        
        dispatch(cartUpdate())
        Toast.fire({
            icon: 'success',
            iconColor: "white",
            title: <strong>Game added to cart!</strong>,
            color: "#fff",
            background : "#333",
        })
    } else {
        navigate('/login');
        MySwal.fire({
            title: <strong>WARNING</strong>,
            html: <i>You have to login to purchase a game</i>,
            icon: 'info',
            background : "#1d1d1d",
          });
    }

}

    return ( <>
    <div className="col-auto cardDivT mb-5 col-md-4 " key={game.id}>
        <div className="product-grid card-st">
        <span className="badge">{game.name}</span>
            <div className="product-image">
                <a href="#" className="image">
                <Link to={ROUTES.DETAIL + "/" + game.id}>
                <img className="pic-1" src={game.image}/>
                </Link>
                    
                </a>
                <ul className="product-links">
                    
                    <li> </li>
                    <li onClick={handleChangeOnClic}><a data-tip="Add to Cart"><i className="fa fa-shopping-bag sb"></i></a></li>
                </ul>
                <div className="price">{game.price}$</div>
            </div>
        </div>
    </div>
    </>
    )
}








export default Card;

