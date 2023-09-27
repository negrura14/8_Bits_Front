import React, { useEffect, useState } from "react";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  toggleCart,
  UpdateList,
  cartUpdate,
} from "../../Redux/Reducers/cartSlice";
import { ROUTES } from "../../Helpers/RoutesPath";
import cartImg from "../../Img/cartImg.jpeg"

export const Cart = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);
  const cartOpen = isCartOpen ? "shop show" : "shop";
  const cartRedux = useSelector((state) => state.cart.listCart);
  const { user, auth } = useSelector((state) => state.user.userState);
  const userData = user;
  //console.log("ESTO ES LO QUE LLEGA POR CARTREDUX: ", cartRedux);
  const [orderData, setOrderData] = useState({
    items: [],
    amount: 0,
    description: "Cart Items",
  });

  // useEffect(() => {
  //     if(auth === true) {
  //         console.log("ENTRO A ESTE USEEFECT?");
  //         dispatch(UpdateList(userData.user.id))
  //     }
  // }, [dispatch])

  const handleCheckoutClick = () => {
    const mercadoPagoUrl = ROUTES.MERCADO;

    // Construye el objeto orderData con los detalles necesarios
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

    // Abre la ventana de pago de MercadoPago
    window.open(mercadoPagoUrl, "_blank");
  };

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
    localStorage.setItem(`cart.${userData.user.id}`, JSON.stringify([]));
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
        }
      }
    }
  }

  const handleCloseCart = () => {
    dispatch(toggleCart());
  };

  useEffect(() => {
         
         
             dispatch(UpdateList(userData.user.id))
        
     }, [dispatch])



  return (<>

<div className="cardCart mt-5">
            <div className="row">
                <div className="col-md-8 cartP">
                    <div className="titleCP">
                        <div className="row">
                            <div className="col"><h4><b>Shopping Cart</b></h4></div>
                            <div className="col align-self-center text-right ">{totalGames.length} items</div>
                        </div>
                    </div>    
                    <div className="cartProductsDiv">

                    {totalGames.map((element, index) => (
              <>
              <div key={index} className="row border-top border-bottom">
                        <div className="row mainCP align-items-center">
                        
                            <div className="col-3"><img className="img-fluid imgCP" src={element.image}/></div>
                            
                            <div className="col">
                                <div className="row text-ligth-50">Game</div>
                                <div className="row"><a href={"/Detail/" + element.id} className="nameCart">{element.name}</a></div>
                            </div>
                            <div className="col">
                            <span
                        className="pqt-minus"
                        onClick={() => AddOrSubClick(element.id, "sub")}
                      >
                        -
                      </span><span >{element.cant}</span><span
                        className="pqt-plus"
                        onClick={() => AddOrSubClick(element.id, "add")}
                      >
                        +
                      </span>
                            </div>
                            <div className="col">$ {element.price} <span className="product-remove text-white close"  onClick={() => removeFromCart(element.id)}
                        ><i
                          className="fa fa-close fa-2x  closeItem"
                          aria-hidden="true"
                        ></i></span></div>
                        </div>
                    </div>
              </>
            ))}
                    </div>
                    <div className="mt-2" ><NavLink className="btn essence-btn" to={ROUTES.STORE}>

                    <i className="fa-solid fa-arrow-left"></i> Back to shop
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
                        <div className="col text-right">$ {totalPrice.toFixed(1)}</div>
                    </div>
                    <div className="row priceCP" >
                        <div className="col">Total price</div>
                        <div className="col text-right"> $ {totalPrice.toFixed(1)}</div>
                    </div>
                    {totalGames.length > 0 ? (
              <>
                <div className="row priceCP d-flex justify-content-between ">
                <div className="col-5">

                  <button
                    className="btnCP bg-primary"
                    onClick={handleCheckoutClick}
                  >
                    Pay
                    <i className="fa-regular fa-credit-card"></i>
                  </button>
                </div>
                <div className="col-5">

                  <button
                    onClick={onClickClearCart}
                    className="btnCP bg-danger"
                  >
                    Clear Cart <i className="fa-solid fa-trash"></i>
                  </button>
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
