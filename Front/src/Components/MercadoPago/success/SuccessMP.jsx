import React from "react";
import { useLocation } from "react-router-dom";

const SuccessMP = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const games = {};

  for (let i = 0; i < queryParams.get("shoppingQuantity"); i++) {
    const gameId = queryParams.get(`idGame${i}`);
    const gameName = queryParams.get(`gameName${i}`);
    const unitPrice = queryParams.get(`unitPrice${i}`);

    if (!games[gameId]) {
      
      games[gameId] = {
        gameId,
        gameName,
        unitPrice,
        quantity: 1, 
      };
    } else {
      
      games[gameId].quantity += 1;
    }
  }

  const gamesArray = Object.values(games); 

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Successful Payment</h2>
              <p className="card-text">Thanks for your purchase!</p>
              <h3 className="card-subtitle mb-3">Games Purchased:</h3>
              {gamesArray.map((game, index) => (
                <div key={index}>
                  <p className="card-text">Game ID: {game.gameId}</p>
                  <p className="card-text">Game Name: {game.gameName}</p>
                  <p className="card-text">Unit Price: ${game.unitPrice}</p>
                  <p className="card-text">Quantity: {game.quantity}</p>
                </div>
              ))}
              <a href="/" className="btn btn-primary">
                Go to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessMP;


