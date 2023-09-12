import './CardT.css'
import {Link} from 'react-router-dom'
import React, { useEffect } from 'react'
import { ROUTES } from '../../Helpers/RoutesPath'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, cartUpdate } from '../../Redux/cartSlice';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function Card (props) {
const {game} = props;
const dispatch = useDispatch()
// const cart = useSelector((state) => state.cart.listCart)

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
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.push(game);

    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch(addToCart(cart))
    
    dispatch(cartUpdate())
    Toast.fire({
        icon: 'success',
        iconColor: "white",
        title: <strong>Game added to cart!</strong>,
        color: "#fff",
        background : "#333",
      })

}

    return ( <>
    <div className="col-md-4 col-sm-6 mb-5 " key={game.id}>
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

