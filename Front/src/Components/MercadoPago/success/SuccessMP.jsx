
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGame } from '../../../Redux/gameActions';
import axios from 'axios';
import { UpdateList, cartUpdate } from "../../../Redux/Reducers/cartSlice";
import queryString from 'query-string';
import Logo from "../../../Img/Logo.png"



const SuccessMP = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { game } = useSelector(state => state.game);
  const queryParams = queryString.parse(location.search);
  const paymentId = queryParams.payment_id;
  const { user, auth } = useSelector((state) => state.user.userState);
  const userData = user;
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    dispatch(getGame());
  }, [dispatch]);

  let cart = JSON.parse(localStorage.getItem(`cart.${userData.user.id}`)) || [];

  
  const groupedCart = cart.reduce((acc, element) => {
    if (acc[element.id]) {
      acc[element.id].quantity += 1; 
    } else {
      acc[element.id] = { ...element, quantity: 1 };
    }
    return acc;
  }, {});
  

 
  const calculateTotalPrice = (gameId, quantity) => {
    const gameItem = game.find((s) => s.id === gameId);
    return gameItem ? gameItem.price * quantity : 0;
  };

  
  const calculateCartTotalPrice = () => {
    let total = 0;
  
    Object.values(groupedCart).forEach((element) => {
      total += calculateTotalPrice(element.id, element.quantity);
    });
  
    return total;
  };

  useEffect(() => {
    setSubtotal(calculateCartTotalPrice());
  }, [groupedCart]);


  const refreshStock = () => {
    if (auth === true){

      const gameStockCount = {}; // Objeto para contar las repeticiones de cada juego en cart

      // Contar cuántas veces aparece cada juego en cart
      for (const element of cart) {
        if (!gameStockCount[element.id]) {
          gameStockCount[element.id] = 1;
        } else {
          gameStockCount[element.id]++;
        }
      }

      // Actualizar el stock en gameStock
      for (const element of cart) {
        const gameStock = game.find((s) => s.id === element.id);

        if (gameStock && gameStock.stock > 0) {
          const stockToSubtract = gameStockCount[element.id]; // Obtener el contador
          const updatedGameStock = { ...gameStock, stock: gameStock.stock - stockToSubtract };

          // Realizar la actualización del stock
          axios.put(`/games/${updatedGameStock.id}`, updatedGameStock);

          // También puedes actualizar el estado de Redux si es necesario
          // dispatch(getGame());
        }
      }
    }
  }

  const deletedCart = () => {
    refreshStock();
    localStorage.setItem(`cart.${userData.user.id}`, JSON.stringify([]));
    dispatch(UpdateList(userData.user.id));
    dispatch(cartUpdate());
  };

  return (
    
  <div class="container mt-5">
  <div class="row d-flex justify-content-center">
    <div class="col-md-10 backgroundinvoice">
      
      <div class="row">
        <div class="col-sm-6">
            <img class="imgFS" src={Logo}/>
        </div>
        
  
        <div class="text-95 col-sm-6 align-self-start d-sm-flex justify-content-end">
            <hr class="d-sm-none" />
            <div class="text-white">
                <div class="mt-1 mb-2 text-600 ">
                    Invoice
                </div>
  
                <div class="my-2 "><i class="fa fa-circle text-secondary me-1"></i> <span class="text-600">Payment ID:</span>{paymentId}</div>
  
                <div class="my-2"><i class="fa fa-circle text-secondary me-1"></i> <span class="text-600">Status:</span> <span class="badge badge-success badge-pill px-25">Paid</span></div>
            </div>
        </div>
        
    </div>
  
    <div class="mt-4 ">
      <div class="invoice">
  
        <div class="row bg-secondary text-black py-25 ">
          <div class="d-none d-sm-block col-1">ID</div>
            <div class="col-9 col-sm-5 ">Game Name</div>
            <div class="d-none d-sm-block col-4 col-sm-2 ">Quantity</div>
            <div class="d-none d-sm-block col-sm-2 ">Unit Price</div>
            <div class="col-2 ">Amount</div>
        </div>
        
        {Object.values(groupedCart).map((element, index) => (
        <div key={index} class=" text-white">
            <div class="row mb-2 mb-sm-0 py-25">
              <div class="d-none d-sm-block col-1">{element.id}</div>
                <div class="col-9 col-sm-5">{element.name}</div>
                <div class="d-none d-sm-block col-2">{element.quantity}</div>
                <div class="d-none d-sm-block col-2 text-95"> ${element.price}</div>
                <div class="col-2 text-secondary-d2">${calculateTotalPrice(element.id, element.quantity)}</div>
            </div>          
        </div>
            ))}
      </div>
  
        <div class="row border-b-2 brc-default-l2"></div>
  
  
        <div class="row mt-3">
            <div class="col-12 col-sm-7 text-grey-d2 text-95 mt-2 mt-lg-0 text-white-50">
              Thanks for your purchase!
            </div>
  
            <div class="col-12 col-sm-5 text-grey text-90 order-first order-sm-last">
  
                <div class="row my-2 align-items-center bgc-primary-l3 p-2 text-white">
                    <div class="col-7 text-right">
                        Total Amount
                    </div>
                    <div class="col-5">
                        <span class="text-150 text-success-d3 opacity-2">${subtotal}</span>
                    </div>
                </div>
            </div>
        </div>
  
        <div class="border-top border-white pt-3 ">
           
            <a href="/" class="btn btn-outline-primary text-white bg-transparent px-4 float-right mt-3 mt-lg-0" onClick={deletedCart}>Go to Home</a>
        </div>
      

    </div>
  </div>
</div>
</div>

  );
};

export default SuccessMP;
