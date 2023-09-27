
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from 'axios'
import classnames from 'classnames'
import { Context } from "../ContextProvider";
import { useSelector, useDispatch } from "react-redux";
import './Checkout.css'
import cartImg from "../../../Img/cartImg.jpeg"
import { useNavigate } from "react-router";
import {ROUTES} from '../../../Helpers/RoutesPath'



const Checkout = ({ onClick }) => {
  const navigate = useNavigate
  const [isVisible, setIsVisible] = React.useState(true);
  const [showPayButton, setShowPayButton] = useState(true);
  const { preferenceId, isLoading: disabled, orderData, setOrderData } = React.useContext(Context);
  const { user, auth } = useSelector((state) => state.user.userState);
  const userData = user;
  const [isLoading, setIsLoading] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [localStorageCart, setLocalStorageCart] = useState([]);
  const shoppingCartClass = classnames('shopping-cart dark', {
    'shopping-cart--hidden': !isVisible,
  });
  
  const groupItemsById = (items) => {
    const groupedItems = {};
    items.forEach((item) => {
      if (!groupedItems[item.id]) {
        groupedItems[item.id] = { ...item };
        groupedItems[item.id].cant = 0;
      }
      groupedItems[item.id].cant += 1;
    });
    return Object.values(groupedItems);
  };

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem(`cart.${userData.user.id}`)) || [];
    const groupedCartData = groupItemsById(cartData);
    setLocalStorageCart(groupedCartData);
  }, [userData.user.id]);




  useEffect(() => {
    if (preferenceId) setIsVisible(false);
  }, [preferenceId]);

  
  
  
  useEffect(() => {
    const newSubtotal = localStorageCart.reduce((total, item) => {
      const price = parseFloat(item.price);
      const cant = item.cant; 
    
      if (!isNaN(price) && !isNaN(cant)) {
        return total + price * cant;
      } else {
        console.log(`Valor no válido - Precio: ${item.price}, Cantidad: ${item.cant}`);
        return total;
      }
    }, 0);
  
    setSubtotal(newSubtotal); 
    
  }, [localStorageCart]);
  


const handleCheckoutClick = async () => {
  try {
    // Obtén la cantidad total de productos en el carrito
    const totalQuantity = localStorageCart.reduce((total, item) => total + item.cant, 0);

    const userId = user.user.id;

    const cartForServer = localStorageCart.map((item)=>({
      idGame: item.id,
      unit_price: item.price,
      title: item.name,

      
    }))
    

    // Realiza una solicitud POST al servidor para crear la orden de compra
    const response = await axios.post('/mercadopago', {
      quantity: totalQuantity,
      idUser: userId,
      cart: cartForServer,
      currency_id: 'USD',
    });
     

    return response.data.id;
  } catch (error) {
    console.error('Error al crear la orden de compra:', error);
  }
};



const handlePayClick = async () => {
  try {
    setIsLoading(true);
    
   const idShop = await handleCheckoutClick()
    const response = await axios.post(`/mercadopago/${idShop}`, {});


    if (response) {
      window.location.href = response.data.data.body.sandbox_init_point;

    

    
    } else {
      console.error('El init_point no está definido.');
      
    }
  } catch (error) {
    console.error('Error al obtener el init_point:', error);
    // Aquí puedes manejar el error si la solicitud fetch falla.
  } finally{
    setIsLoading(false);

  }
};




  return (<>

  <div className="cardCart mt-5">
            <div className="row">
                <div className="col-md-8 cartP">
                    <div className="titleCP">
                        <div className="row">
                            <div className="col"><h4><b>Shopping Cart</b></h4></div>
                            <div className="col align-self-center text-right ">{localStorageCart.length} items</div>
                        </div>
                    </div>    
                    <div className="cartProductsDiv">

                    {localStorageCart.length > 0 ? (
                  localStorageCart.map((item, index) => (
                    <>
              <div key={index} className="row border-top border-bottom">
                        <div className="row mainCP align-items-center">
                        
                            <div className="col-3"><img className="img-fluid imgCP" src={item.image} alt={item.image}/></div>
                            
                            <div className="col">
                                <div className="row text-ligth-50">Game</div>
                                <div className="row"><a href={"/Detail/" + item.id} className="nameCart">{item.name}</a></div>
                            </div>
                            <div className="col">
                            <span >{item.cant}</span>
                            </div>
                            <div className="col">$ {item.price}</div>
                        </div>
                    </div>
                    </>
                  ))
                ) : (
                  <p>No items in the cart</p>
                )}

                    </div>
                    
                    <div className="mt-2" ><NavLink className="btn essence-btn" to={ROUTES.CART}>

                    <i className="fa-solid fa-arrow-left"></i> Back to cart
</NavLink></div>
                </div>
                <div className="col-md-4 summary bg-transparent">
                    <div><h5><b>Summary</b></h5></div>
                    <hr className="hrCP"/>
                    <div className="d-flex justify-content-center my-2" >
                        <img className="cartImg" src={cartImg}></img>
                    </div>
                    
                    <div className="row">
                        <div className="col itemsC ms-3" >Items </div>
                        <div className="col text-right">${subtotal.toFixed(2)}</div>
                    </div>
                    <div className="row priceCP" >
                        <div className="col">Total price</div>
                        <div className="col text-right"> ${subtotal.toFixed(2)}</div>
                    </div>
                    {localStorageCart.length > 0 ? (
              <>
                <div className="row priceCP d-flex justify-content-between ">
                <div className="col-5">

                {showPayButton && (
                  <button className="btnCP bg-primary text-white"
                    onClick={handlePayClick}
                  id="pay-btn"
                  disabled={isLoading}
                  >
                  {isLoading ? 'Loading...' : 'Pay'}<i className="fa-regular fa-credit-card"></i>
                  </button>
                )}
                </div>
                </div>
              </>
            ) : (
              ""
            )}
                </div>
            </div>
            
        </div>
  </>
  );
};

export default Checkout;
