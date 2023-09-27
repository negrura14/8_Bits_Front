
import React, { useEffect, useState } from "react";
import axios from 'axios'
import classnames from 'classnames'
import { Context } from "../ContextProvider";
import { useSelector, useDispatch } from "react-redux";
import './Checkout.css'
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




  return (
    <section className={shoppingCartClass}>
      <div className="container" id="container">
        <div className="block-heading">
          <h2>Shopping Cart</h2>
          <p>8 BITS</p>
        </div>
        <div className="">
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <div className="items">
                {localStorageCart.length > 0 ? (
                  localStorageCart.map((item, index) => (
                    <div className="product" key={index}>
                      <div className="">
                        <div className="product-details">
                          <div className="row justify-content-md-center">
                            <div className="col-md-3">
                              <img src={item.image} alt={item.image} />
                            </div>
                            <div className="col-md-4 product-detail">
                              <h5>Product</h5>
                              <div className="product-info">
                                <b>Description: </b>
                                <span id="product-description">{item.name}</span>
                                <br />
                                <b>Price:</b> $ {item.price}
                                <br />
                                <b>Quantity:</b> {item.cant}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No items in the cart</p>
                )}
              </div>
            </div>
            <div className="col-md-12 col-lg-4">
              <div className="summary">
                <h3>Cart</h3>
                <div className="summary-item">
                  <span className="text">USD</span>
                  <span className="price" id="cart-total">${subtotal.toFixed(2)}</span>
                </div>  
                
                {showPayButton && (
                  <button className="btn btn-success btn-lg btn-block"
                  onClick={handlePayClick}
                  id="pay-btn"
                  disabled={isLoading}
                  >
                  {isLoading ? 'Loading...' : 'Pay'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
