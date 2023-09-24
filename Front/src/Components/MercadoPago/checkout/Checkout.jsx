
import React, { useEffect, useState } from "react";
import classnames from 'classnames'
import { Context } from "../ContextProvider";
import { useSelector, useDispatch } from "react-redux";
import './Checkout.css'
import { setPayment, clearPayment, setOrder, setItems } from "../../../Redux/Reducers/checkoutSlice";


const Checkout = ({ onClick }) => {
  const [isVisible, setIsVisible] = React.useState(true);
  const { preferenceId, isLoading: disabled, orderData, setOrderData } = React.useContext(Context);
  const { user, auth } = useSelector((state) => state.user.userState);
  const userData = user;
  const [subtotal, setSubtotal] = useState(0);
  const [localStorageCart, setLocalStorageCart] = useState([]);
  const shoppingCartClass = classnames('shopping-cart dark', {
    'shopping-cart--hidden': !isVisible,
  });
  
  const mpID = useSelector((state) => state.checkout.mpID);
  const order = useSelector((state) => state.checkout.order);
  const items = useSelector((state) => state.checkout.items);
  const dispatch = useDispatch();

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem(`cart.${userData.user.id}`)) || [];
    setLocalStorageCart(cartData);
  }, [userData.user.id]);

  useEffect(() => {
    if (preferenceId) setIsVisible(false);
  }, [preferenceId]);

  const handleCheckoutClick = () => {
    window.location.href = 'https://sandbox.mercadopago.com.co/checkout/v1/redirect?pref_id=1476672193-aaefb57f-259b-4074-af04-567c227c3dd4';
    // dispatch(setPayment({ mpID: 'tuNuevoValor' }));
  }

  
  
  useEffect(() => {
    const newSubtotal = localStorageCart.reduce((total, item) => {
      const price = parseFloat(item.price);
      const cant = 1; 
    
      if (!isNaN(price) && !isNaN(cant)) {
        return total + price * cant;
      } else {
        console.log(`Valor no válido - Precio: ${item.price}, Cantidad: ${item.cant}`);
        return total;
      }
    }, 0);
  
    setSubtotal(newSubtotal); 
    
  }, [localStorageCart]);
  
  


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
                <button
                  className="btn btn-primary btn-lg btn-block"
                  onClick={handleCheckoutClick}
                  id="checkout-btn"
                  disabled={disabled}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;



// import React, { useEffect, useState } from "react";
// import classnames from 'classnames'
// import { Context } from "../ContextProvider";
// import { useDispatch, useSelector } from "react-redux";
// import './CheckOut.css'

// const Checkout = ({ onClick }) => {
//   const [isVisible, setIsVisible] = React.useState(true);
//   const { preferenceId, isLoading: disabled, orderData, setOrderData } = React.useContext(Context);
//   const [cartItems, setCartItems] = useState([]);
//   const { user, auth } = useSelector((state) => state.user.userState);
//   const userData = user;
//   const [localStorageCart, setLocalStorageCart] = useState([])
//   const shoppingCartClass = classnames('shopping-cart dark', {
//     'shopping-cart--hidden': !isVisible,
//   // const { preferenceId, isLoading: disabled, orderData } = React.useContext(Context);
//   // const shoppingCartClass = classnames('shopping-cart dark', {
//   //   'shopping-cart--hidden': !isVisible,
    
//   })
//   useEffect(() => {
//     const cartData = JSON.parse(localStorage.getItem(`cart.${userData.user.id}`)) || [];
//     setLocalStorageCart(cartData);
//   }, [userData.user.id]);

  

//   useEffect(() => {
//     if (preferenceId) setIsVisible(false);
//   }, [preferenceId])


//   const updatePrice = (event) => {
//     const quantity = event.target.value;
//     const amount = parseInt(orderData.price) * parseInt(quantity);
//     setOrderData({ ...orderData, quantity, amount });
//   }
  
//   const handleCheckoutClick = () => {
//     window.location.href = 'https://sandbox.mercadopago.com.co/checkout/v1/redirect?pref_id=1476672193-eab2c8c1-864c-47ee-b31d-7d90aad0ac77';

//   }
  
//   return (
//     <section className={shoppingCartClass}>
//       <div className="container" id="container">
//         <div className="block-heading">
//           <h2>Shopping Cart</h2>
//           <p>8 BITS</p>
//         </div>
//         <div className="content">
//           <div className="row">
//             <div className="col-md-12 col-lg-8">
//               <div className="items">
//                 {cartItems.length > 0 ? (
//                   cartItems.map((item, index) => (
//                     <div className="product" key={index}>
//                       <div className="info">
//                         <div className="product-details">
//                           <div className="row justify-content-md-center">
//                             <div className="col-md-3">
//                               {/* Puedes colocar la imagen del producto aquí */}
//                               <img src={item.picture_url} alt={item.title} />
//                             </div>
//                             <div className="col-md-4 product-detail">
//                               <h5>Product</h5>
//                               <div className="product-info">
//                                 <b>Description: </b>
//                                 <span id="product-description">{item.title}</span>
//                                 <br />
//                                 <b>Price:</b> $ {item.unit_price}
//                                 <br />
//                                 {/* Agrega cualquier otro detalle específico del artículo */}
//                               </div>
//                             </div>
//                             <div className="col-md-3 product-detail">
//                               <label htmlFor="quantity">
//                                 <b>Quantity</b>
//                               </label>
//                               {/* Puedes mostrar la cantidad del producto aquí */}
//                               <span>{item.quantity}</span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p>No items in the cart</p>
//                 )}
//               </div>
//             </div>
//             <div className="col-md-12 col-lg-4">
//               <div className="summary">
//                 <h3>Cart</h3>
//                 <div className="summary-item">
//                   <span className="text">Subtotal</span>
//                   {/* Puedes mostrar el subtotal aquí */}
//                   <span className="price" id="cart-total">${orderData}</span>
//                 </div>
//                 <button
//                   className="btn btn-primary btn-lg btn-block"
//                   onClick={handleCheckoutClick}
//                   id="checkout-btn"
//                   disabled={disabled}
//                 >
//                   Checkout
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );

  

//  };

// export default Checkout;





// return (
  //   <section className={shoppingCartClass}>
  //     <div className="container" id="container">
  //       <div className="block-heading">
  //         <h2>Shopping Cart</h2>
  //         <p>8 BITS</p>
  //       </div>
  //       <div className="content">
  //         <div className="row">
  //           <div className="col-md-12 col-lg-8">
  //             <div className="items">
  //               {cartItems.length > 0 ? (
  //                 cartItems.map((item, index) => (
  //                   <div className="product" key={index}>
  //                     {/* Renderiza los elementos del carrito aquí */}
  //                   </div>
  //                 ))
  //               ) : (
  //                 <p>No items in the cart</p>
  //               )}
  //             </div>
  //           </div>
  //           <div className="col-md-12 col-lg-4">
  //             <div className="summary">
  //               <h3>Cart</h3>
  //               <div className="summary-item">
  //                 <span className="text">Subtotal</span>
  //                 <span className="price" id="cart-total">${orderData}</span>
  //               </div>
  //               <button
  //                 className="btn btn-primary btn-lg btn-block"
  //                 onClick={handleCheckoutClick}
  //                 id="checkout-btn"
  //                 disabled={disabled}
  //               >
  //                 Checkout
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </section>
  // );

  // return (
  //   <section className={shoppingCartClass}>
  //     <div className="container" id="container">
  //       <div className="block-heading">
  //         <h2>Shopping Cart</h2>
  //         <p>8 BITS</p>
  //       </div>
  //       <div className="content">
  //         <div className="row">
  //           <div className="col-md-12 col-lg-8">
  //             <div className="items">
  //               {orderData && orderData.items ? (
  //                 orderData.items.map((item, index) => (
  //                   <div className="product" key={index}>
  //                     <div className="info">
  //                       <div className="product-details">
  //                         <div className="row justify-content-md-center">
  //                           <div className="col-md-3">
  //                             {/* Aquí puedes colocar la imagen del producto o cualquier otro detalle */}
  //                           </div>
  //                           <div className="col-md-4 product-detail">
  //                             <h5>Product</h5>
  //                             <div className="product-info">
  //                               <b>Description: </b>
  //                               <span id="product-description">{item.title}</span>
  //                               <br />
  //                               {/* Agrega otros detalles del artículo según sea necesario */}
  //                               <b>Price:</b> $ {item.unit_price}
  //                               <br />
  //                               {/* Agrega cualquier otro detalle específico del artículo */}
  //                             </div>
  //                           </div>
  //                           <div className="col-md-3 product-detail">
  //                             <label htmlFor="quantity">
  //                               <b>Quantity</b>
  //                             </label>
  //                             <input
  //                               onChange={updatePrice}
  //                               type="number"
  //                               id="quantity"
  //                               value={orderData.quantity}
  //                               min="1"
  //                               className="form-control"
  //                             />
  //                           </div>
  //                         </div>
  //                       </div>
  //                     </div>
  //                   </div>
  //                 ))
  //               ) : (
  //                 <p>No items in the cart</p>
  //               )}
  //             </div>
  //           </div>
  //           <div className="col-md-12 col-lg-4">
  //             <div className="summary">
  //               <h3>Cart</h3>
  //               <div className="summary-item">
  //                 <span className="text">Subtotal</span>
  //                 <span className="price" id="cart-total">${orderData}</span>
  //               </div>
  //               <button
  //                 className="btn btn-primary btn-lg btn-block"
  //                 onClick={handleCheckoutClick}
  //                 id="checkout-btn"
  //                 disabled={disabled}
  //               >
  //                 Checkout
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </section>
  // );