import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Checkout from "./checkout/Checkout";

const FORM_ID = "payment-form";

export default function MercadoPago({ items, setLoading, userID }) {
  const [preferenceId, setPreferenceId] = useState(null);
  const history = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    axios
      .post("/mercadopago/1", {
        items,
        base_url: 'http://localhost:3001/',
        ID: userID,
      })
      .then((order) => {
        setPreferenceId(order.data.preferenceId);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        }).then(() => {
          history("/");
        });
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (preferenceId) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
      script.setAttribute("data-preference-id", preferenceId);
      const form = document.getElementById(FORM_ID);
      form.appendChild(script);
      setTimeout(() => {
        const button = document.querySelector(".mercadopago-button");
        button.innerHTML = "PAY (Mercado Pago)";
      }, 1000);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preferenceId]);

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
    
      <main>
      <form id={FORM_ID} method="GET" />;
        {renderSpinner()}
        <Checkout description/>
        
      </main>
      
    
  )
}
