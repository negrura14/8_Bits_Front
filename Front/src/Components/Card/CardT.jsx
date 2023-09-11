import './CardT.css'
import {Link} from 'react-router-dom'
import React, { useEffect } from 'react'
import { ROUTES } from '../../Helpers/RoutesPath'
import { useDispatch } from 'react-redux';
import { addToCart, cartUpdate} from '../../Redux/cartSlice';



function Card (props) {
const {game} = props;
const dispatch = useDispatch()


const handleChangeOnClic = () => {
    // console.log("Esto es lo que muestra el GAME dentro de CARDT: ", game);
    dispatch(addToCart(game))

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.push(game);

    localStorage.setItem("cart", JSON.stringify(cart));
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






// function Card(props) {
//    const{id, nombre, imagen, types}= props; //Estoy haciendo un distroctoring al props
//     return (
//         <div className='cardPoke'>
//             <Link className='namePoke' to={`/detail/${id}`}>
//                 <h2 className='text'>{nombre}</h2>
//             </Link>
//             <img className='img' src={imagen} alt='' />
//             <div className='{style.ss}'> 
//                 <h2 className='typeText'>
                    
//                     {types && types.map((type, index) => (
//                         <span key={index} className='type'>
//                             {type.name}
//                             {index !== types.length - 1 && 
//                             <span className='typeSeparator'>{" "}-{" "}</span>}
//                         </span>
//                     ))}
//                 </h2>
//             </div>
//         </div>
//     );
// };
export default Card;
