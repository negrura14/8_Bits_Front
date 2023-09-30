
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGame } from '../../../Redux/gameActions';
import axios from 'axios';
import { UpdateList, cartUpdate } from "../../../Redux/Reducers/cartSlice";
import queryString from 'query-string';
import Logo from "../../../Img/Logo.png"
import "./SuccesMP.css"



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
          console.log("DENTRO DEL BENDITO IF: ", gameStockCount);
        } else {
          gameStockCount[element.id]++;
          console.log("DENTRO DEL BENDITO ELSE: ", gameStockCount);
        }
      }
      console.log("ESTO ES LO QUE CUENTA: ", typeof(gameStockCount), gameStockCount, typeof(gameStockCount[0]));

      // Actualizar el stock en gameStock
      for (const element of cart) {
        const gameStock = game.find((s) => s.id === element.id);

        if (gameStock && gameStock.stock > 0) {
          console.log("EL VALOR DE GAMESTOCK.STOCK ES: ", gameStock.stock);
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
    
  <div className="container mt-5">
  <div className="row d-flex justify-content-center">
    <div className="col-md-10 backgroundinvoice">
      
      <div className="row">
        <div className="col-sm-6">
            <img className="imgFS" src={Logo}/>
        </div>
        
  
        <div className="text-95 col-sm-6 align-self-start d-sm-flex justify-content-end">
            <hr className="d-sm-none" />
            <div className="text-white">
                <div className="mt-1 mb-2 text-600 ">
                    Invoice
                </div>
  
                <div className="my-2 "><i className="fa fa-circle text-secondary me-1"></i> <span className="text-600">Payment ID:</span>{paymentId}</div>
  
                <div className="my-2"><i className="fa fa-circle text-secondary me-1"></i> <span className="text-600">Status:</span> <span className="text-success">Paid</span></div>
            </div>
        </div>
        
    </div>
  
    <div className="mt-4 ">
      <div className="invoice">
  
        <div className="row bg-secondary text-white py-25 ">
          <div className="d-none d-sm-block col-1">ID</div>
            <div className="col-9 col-sm-5 ">Game Name</div>
            <div className="d-none d-sm-block col-4 col-sm-2 ">Quantity</div>
            <div className="d-none d-sm-block col-sm-2 ">Unit Price</div>
            <div className="col-2 ">Amount</div>
        </div>
        
        {Object.values(groupedCart).map((element, index) => (
        <div key={index} className=" text-white">
            <div className="row mb-2 mb-sm-0 py-25">
              <div className="d-none d-sm-block col-1">{element.id}</div>
                <div className="col-9 col-sm-5">{element.name}</div>
                <div className="d-none d-sm-block col-2">{element.quantity}</div>
                <div className="d-none d-sm-block col-2 text-95"> ${element.price}</div>
                <div className="col-2 text-secondary-d2">${calculateTotalPrice(element.id, element.quantity)}</div>
            </div>          
        </div>
            ))}
      </div>
  
        <div className="row border-b-2 brc-default-l2"></div>
  
  
        <div className="row mt-3">
            <div className="col-12 col-sm-7 text-grey-d2 text-95 mt-2 mt-lg-0 text-white-50">
              Thanks for your purchase!
            </div>
  
            <div className="col-12 col-sm-5 text-grey text-90 order-first order-sm-last">
  
                <div className="row my-2 align-items-center bgc-primary-l3 p-2 text-white">
                    <div className="col-7 text-right">
                        Total Amount
                    </div>
                    <div className="col-5">
                        <span className="text-150 text-success-d3 opacity-2">${subtotal}</span>
                    </div>
                </div>
            </div>
        </div>
  
        <div className="border-top border-white pt-3 ">
           
            <button className="btn btn-outline-primary text-white bg-transparent px-4 float-right mt-3 mt-lg-0" onClick={deletedCart}>Go to Home</button>
        </div>
      

    </div>
  </div>
</div>
</div>

  );
};

export default SuccessMP;
