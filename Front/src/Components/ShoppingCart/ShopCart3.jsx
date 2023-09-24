import React, { useEffect, useState } from "react";
import "./ShopCart.css";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleCart,
  UpdateList,
  cartUpdate,
} from "../../Redux/Reducers/cartSlice";
import { ROUTES } from "../../Helpers/RoutesPath";
import { setItems } from "../../Redux/Reducers/checkoutSlice";
import { NavLink, useNavigate } from "react-router-dom";

export const ShopCart = () => {
  const checkoutUrl = ROUTES.CHECKOUT;
  const dispatch = useDispatch();
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);
  const cartOpen = isCartOpen ? "shop show" : "shop";
  const cartRedux = useSelector((state) => state.cart.listCart);
  const { user, auth } = useSelector((state) => state.user.userState);
  const userData = user;
  const navigate = useNavigate()
  //console.log("ESTO ES LO QUE LLEGA POR CARTREDUX: ", cartRedux);
  const [orderData, setOrderData] = useState({
    items: [],
    amount: 0,
    description: "Cart Items",
  });


  function buyCart() {
    const items = cartRedux.map((element) => ({
      id: element.id,
      title: element.name,
      picture_url: element.image,
      unit_price: parseFloat(element.price),
      quantity: element.cant,
    }));

    const amount = items.reduce(
      (total, item) => total + item.unit_price * item.quantity,
      0
    );

    setOrderData({
      items,
      amount: amount.toFixed(2),
      description: "Cart Items",
    });
     
      dispatch(setItems(items));
      window.open(checkoutUrl, '_blank');
    
  }

 

  const removeFromCart = (itemId) => {
    const updatedCart = cartRedux.filter((item) => item.id !== itemId);

    localStorage.setItem(
      `cart.${userData.user.id}`,
      JSON.stringify(updatedCart)
    );
    dispatch(UpdateList(userData.user.id));
    dispatch(cartUpdate());
  };

  const AddOrSubClick = (itemId, addSub) => {
    const cart =
      JSON.parse(localStorage.getItem(`cart.${userData.user.id}`)) || [];

    if (addSub === "add") {
      for (const element of cartRedux) {
        if (element.id === itemId) {
          cart.push(element);
          localStorage.setItem(
            `cart.${userData.user.id}`,
            JSON.stringify(cart)
          );
          dispatch(UpdateList(userData.user.id));
          break;
        }
      }
    } else if (addSub === "sub") {
      for (let i = cartRedux.length - 1; i > -1; i--) {
        if (cartRedux[i].id === itemId) {
          cart.splice(i, 1);
          localStorage.setItem(
            `cart.${userData.user.id}`,
            JSON.stringify(cart)
          );
          dispatch(UpdateList(userData.user.id));
          dispatch(cartUpdate());
          break;
        }
      }
    }
  };

  const onClickClearCart = () => {
    localStorage.setItem(`cart.${userData.user.id}`, JSON.stringify(totalGames));
    dispatch(UpdateList(userData.user.id));
    dispatch(cartUpdate());
  };

  const totalGames = [];
  const uniqueIds = {};
  let totalPrice = 0;
  if (auth === true) {
    for (const element of cartRedux) {
      totalPrice = totalPrice + Number(element.price);
      if (!uniqueIds[element.id]) {
        uniqueIds[element.id] = true;
        totalGames.push({
          id: element.id,
          name: element.name,
          image: element.image,
          price: element.price,
          cant: 1,
        });
      } else {
        const existingIndex = totalGames.findIndex(
          (item) => item.id === element.id
        );
        if (existingIndex !== -1) {
          // Incrementa la cantidad del juego existente
          totalGames[existingIndex].cant++;
          console.log(totalGames[existingIndex].cant);
        }
      }
    }
    
  }

  const handleCloseCart = () => {
    dispatch(toggleCart());
  };

  return (
    <div className={cartOpen}>
      <div className="subCont right-side-cart-area">
        <div className="cart-content d-flex">
          <div className="cart-list ">
            {totalGames.map((element, index) => (
              <>
                <div key={index} className="single-cart-item">
                  <div className="product-image">
                    <img src={element.image} className="cart-thumb" alt="" />

                    <div className="cart-item-desc">
                      <a
                        onClick={() => removeFromCart(element.id)}
                        className="product-remove"
                      >
                        <i
                          className="fa fa-close  closeItem"
                          aria-hidden="true"
                        ></i>
                      </a>

                      <a className="nameCart" href={"/Detail/" + element.id}>
                        <h6 >{element.name}</h6>
                      </a>
                      <p className="price">${element.price}</p>
                      <span
                        className="pqt-minus"
                        onClick={() => AddOrSubClick(element.id, "sub")}
                      >
                        -
                      </span>
                      <span className="pqt">{element.cant}</span>
                      <span
                        className="pqt-plus"
                        onClick={() => AddOrSubClick(element.id, "add")}
                      >
                        +
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>

          <div className="cart-amount-summary  ">
            <span className="close-btn closeCart" onClick={handleCloseCart}>
              <i className="fa-solid fa-xmark"></i>
            </span>
            <NavLink onClick={handleCloseCart}  className="nameCart" to={ROUTES.CART}>

            <h2>Summary</h2>
            </NavLink>
            <ul className="summary-table">
              {totalGames.map((element, index) => (
                <>
                  <li className="priceC">
                    <span>{element.name}:</span>{" "}
                    <span>${(element.price * element.cant).toFixed(1)}</span>
                  </li>
                </>
              ))}

              <li>
                <span>total:</span> <span>${totalPrice.toFixed(1)}</span>
              </li>
            </ul>
            {totalGames.length > 0 ? (
              <>
                <div className="checkout-btn mt-100 d-flex justify-content-between">
                  <button
                    className="btn essence-btn mx-1"
                    onClick={() => buyCart()}
                  >
                    Pay
                    <i className="fa-regular fa-credit-card"></i>
                  </button>
                  <button
                    onClick={onClickClearCart}
                    className="btn essence-btn mx-1"
                  >
                    Clear Cart <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};