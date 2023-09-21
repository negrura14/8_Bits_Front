import React, { useEffect } from "react";
import classnames from 'classnames'
import { Context } from "./ContextProvider";
import './CheckOut.css'

const Checkout = ({ onClick }) => {
  const [isVisible, setIsVisible] = React.useState(true);
  // const { preferenceId, isLoading: disabled, orderData, setOrderData } = React.useContext(Context);
  // const shoppingCartClass = classnames('shopping-cart dark', {
  //   'shopping-cart--hidden': !isVisible,
  const { preferenceId, isLoading: disabled, orderData } = React.useContext(Context);
  const shoppingCartClass = classnames('shopping-cart dark', {
    'shopping-cart--hidden': !isVisible,
    
  })

  useEffect(() => {
    if (preferenceId) setIsVisible(false);
  }, [preferenceId])


  const updatePrice = (event) => {
    const quantity = event.target.value;
    const amount = parseInt(orderData.price) * parseInt(quantity);
    setOrderData({ ...orderData, quantity, amount });
  }
  

  return (
    <section className={shoppingCartClass}>
      <div className="container" id="container">
        <div className="block-heading">
          <h2>Shopping Cart</h2>
          <p>8 BITS</p>
        </div>
        <div className="content">
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <div className="items">
                {orderData && orderData.items ? (
                  orderData.items.map((item, index) => (
                    <div className="product" key={index}>
                      <div className="info">
                        <div className="product-details">
                          <div className="row justify-content-md-center">
                            <div className="col-md-3">
                              {/* Aquí puedes colocar la imagen del producto o cualquier otro detalle */}
                            </div>
                            <div className="col-md-4 product-detail">
                              <h5>Product</h5>
                              <div className="product-info">
                                <b>Description: </b>
                                <span id="product-description">{item.title}</span>
                                <br />
                                {/* Agrega otros detalles del artículo según sea necesario */}
                                <b>Price:</b> $ {item.unit_price}
                                <br />
                                {/* Agrega cualquier otro detalle específico del artículo */}
                              </div>
                            </div>
                            <div className="col-md-3 product-detail">
                              <label htmlFor="quantity">
                                <b>Quantity</b>
                              </label>
                              <input
                                onChange={updatePrice}
                                type="number"
                                id="quantity"
                                value={orderData.quantity}
                                min="1"
                                className="form-control"
                              />
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
                  <span className="text">Subtotal</span>
                  <span className="price" id="cart-total">${orderData.amount}</span>
                </div>
                <button
                  className="btn btn-primary btn-lg btn-block"
                  onClick={onClick}
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
