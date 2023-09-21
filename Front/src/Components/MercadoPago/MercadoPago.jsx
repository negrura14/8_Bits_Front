// MercadoPago.js
import React, { createContext, useState, useEffect } from "react";
import { initMercadoPago } from "@mercadopago/sdk-react";
import axios from 'axios'
import InternalProvider from "./ContextProvider";
import Checkout from "./CheckOut";
import Payment from "./Payment";

import {useNavigate} from 'react-router-dom';
import {CREDENTIALS} from './Credentials/Credentials'
import { SpinnerCircular } from 'spinners-react'



// Inicializamos MercadoPago
initMercadoPago(CREDENTIALS.PUBLIC_KEY); // Reemplaza "TU_PUBLIC_KEY" con tu clave pública de MercadoPago

const MercadoPago = () => {
  const [preferenceId, setPreferenceId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState({ quantity: "1", price: "10", amount: 10, description: "Some book" });

  const handleClick = () => {
    setIsLoading(true);
    fetch("http://localhost:3001/MercadoPago", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => {
        return response.json();
      })
      .then((preference) => {
        setPreferenceId(preference.id);
      })
      .catch((error) => {
        console.error(error);
      }).finally(() => {
        setIsLoading(false);
      })
  };

  const renderSpinner = () => {
     if (isLoading) {
      return (
        <div className="spinner-wrapper">
          <SpinnerCircular сolor='#009EE3' />
        </div>
      )
     }
  }

  return (
    <InternalProvider context={{ preferenceId, isLoading, orderData, setOrderData }}>
      <main>
        {renderSpinner()}
        <Checkout onClick={handleClick} description/>
        <Payment />
      </main>
      
    </InternalProvider>
  );
};

export default MercadoPago;

//https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js