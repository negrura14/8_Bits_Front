import React from "react";
import { useLocation } from "react-router-dom";

const SuccessMP = () => {
  // Obtiene los parámetros de la URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Obtiene los datos del juego de los parámetros de la URL
  const gameId = queryParams.get("idGame");
  const gameName = queryParams.get("gameName");
  const unitPrice = queryParams.get("unitPrice");
  const quantity = queryParams.get("shoppingQuantity");

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Successful Payment</h2>
              <p className="card-text">Thanks for your purchase!</p>
              <p className="card-text">Game ID: {gameId}</p>
              <p className="card-text">Game Name: {gameName}</p>
              <p className="card-text">Unit Price: ${unitPrice}</p>
              <p className="card-text">Quantity: {quantity}</p>
              <a href="/" className="btn btn-primary">Go to Home</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessMP;