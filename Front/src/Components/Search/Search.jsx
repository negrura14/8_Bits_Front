import { useSelector, useDispatch } from "react-redux";
import React ,{ useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Helpers/RoutesPath";
import {clearSearch } from "../../Redux/gameSlice/";
import CardT from "../Card/CardT";
import { getGame } from '../../Redux/gameActions';
import "./Search.css"
import gameOver from "../../Img/gameOver.gif"




function Search() {
  const dispatch = useDispatch();
  const dataByName = useSelector((state) => state.game.search);
  const { game } = useSelector(state => state.game);

  useEffect(() => {
    dispatch(getGame());
  }, [dispatch]);
  
    const getLowestPricedGames = (count) => {
      if (game.length === 0) {
        return [];
      }
  
      // Ordena los juegos por precio de mayor a menor
      const sortedGames = [...game].sort((a, b) => b.price - a.price);
      return sortedGames.slice(0, count); 
    };
  
    const lowestPricedGames = getLowestPricedGames(3);
  
    console.log(lowestPricedGames)
   useEffect(()=>{
    
    return()=>{
      dispatch(clearSearch())
    }
   }, []);
   const [isTableVisible, setTableVisibility] = useState(false);
  const productClasses =  isTableVisible ? 'products' : 'products products-table';

  const toggleTable = () => {
    setTableVisibility(!isTableVisible);
  }
  if (typeof dataByName === "string") {
    return (<div>

    
      <h2 className="p-2 mx-3 text-primary">{dataByName}</h2>
      <div className="not-loading row m-3">
  <div className="col-sm-6 col-md-3">
    <div className="game--isloading">
      <div className="loading-image"></div>
      <div className="loading-content">
        <div className="loading-text-container">
          <div className="loading-main-text"></div>
          <div className="loading-sub-text"></div>
        </div>
        <div className="loading-btn"></div>
      </div>
    </div>
  </div>
</div>
      <div className="container-fluid mt-4">
      <h2 className="p-2 text-secondary">Higher collection</h2>
            <div className=' cardFLex row'>
                {lowestPricedGames.map((game) => {
                    return <CardT 
                    key={game.id}
                    game={game}
                    />
                })}
            </div>
      </div>
      
    </div>
      
    );
  } else {
    return (
      <div>
        
        <div className="tools">
        
            <h2 className="searchTitle">All items</h2>
          <div className="settings">
            <button className="buttonView" id="view" onClick={toggleTable}><span>Switch View</span></button>
          </div>
        </div>
        <div className={productClasses}>
        {dataByName &&
          dataByName.map((elem, i) => {
            return (
              <div className="product">
                <div className="product-img">
                  <img src={elem.image} />
                </div>
                <div className="product-content">
                  <Link to={`${ROUTES.DETAIL}/${elem.id}`}>
                    <h3>
                      {elem.name}
                    </h3>
                  </Link>
                      <small>{elem.releaseDate}</small>

                  <p className="product-text price">{elem.price}$</p>
                  <p className="product-text genre">{elem.genre}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Search;
