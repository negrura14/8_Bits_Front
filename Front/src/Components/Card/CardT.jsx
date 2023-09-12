import './CardT.css'
import {Link} from 'react-router-dom'
import React, { useEffect } from 'react'
import { ROUTES } from '../../Helpers/RoutesPath'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, cartUpdate } from '../../Redux/cartSlice';



function Card (props) {
const {game} = props;
const dispatch = useDispatch()
// const cart = useSelector((state) => state.cart.listCart)


const handleChangeOnClic = () => {
    // console.log("Esto es lo que muestra el GAME dentro de CARDT: ", game);
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.push(game);

    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch(addToCart(cart))
    
    dispatch(cartUpdate())

}

    return ( <>
    <div className="col-md-4 col-sm-6 mb-5 " key={game.id}>
        <div className="product-grid card-st">
        <span className="badge">{game.name}</span>
            <div className="product-image">
                <a href="#" className="image">
                    <img className="pic-1" src={game.image}/>
                </a>
                <ul className="product-links">
                    
                    <li> <Link to={ROUTES.DETAIL + "/" + game.id}><a href="" data-tip="Details"><i className="fa fa-search"></i></a></Link></li>
                    <li onClick={handleChangeOnClic}><a data-tip="Add to Cart"><i className="fa fa-shopping-bag"></i></a></li>
                </ul>
                <div className="price">{game.price}$</div>
            </div>
        </div>
    </div>
    </>
    )
}








export default Card;

