import React from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGame } from '../../../Redux/gameActions';
import axios from "axios";
import { UpdateList, cartUpdate } from "../../../Redux/Reducers/cartSlice";


const SuccessMP = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(location.search);
  const { game } = useSelector(state => state.game);

  const { user, auth } = useSelector((state) => state.user.userState);
  const userData = user;
  const cart = JSON.parse(localStorage.getItem(`cart.${userData.user.id}`)) || [];


  useEffect(() => {
    dispatch(getGame());
  }, [dispatch]);


  if (auth === true){
    for (const element of cart) {
      // console.log("ESTE ES EL RESULTADO DE UPDATELIST EN SUCCESSMP: ", element);
      const gameStock = game.find((s) => s.id === element.id);
      
      if (gameStock && gameStock.stock > 0) {
        const updatedGameStock = { ...gameStock, stock: gameStock.stock - 1 };        
        console.log("Este es el nuevo stock: ", updatedGameStock);
        axios.put(`/games/${updatedGameStock.id}`, updatedGameStock)
      }
    }
  }
  const deletedCArt = () => {
    localStorage.setItem(`cart.${userData.user.id}`, JSON.stringify([]));
    dispatch(UpdateList(userData.user.id));
    dispatch(cartUpdate());
  }




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
              <a href="/" className="btn btn-primary" onClick={deletedCArt}>
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


