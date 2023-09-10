import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Helpers/RoutesPath";
import {clearSearch } from "../../Redux/gameSlice/";
import "./Search.css"
import gameOver from "../../Img/gameOver.gif"




function Search() {
  const dispatch = useDispatch();
  const dataByName = useSelector((state) => state.game.search);
  
   useEffect(()=>{
    
    return()=>{
      dispatch(clearSearch())
    }
   }, []);
   const [isTableVisible, setTableVisibility] = useState(false);
  const productClasses =  isTableVisible ? 'products products-table' : 'products';

  const toggleTable = () => {
    setTableVisibility(!isTableVisible);
  }
  if (typeof dataByName === "string") {
    return (
      <div className="dont">
        <div className="dontMatch" key="dontMatch">
          <h4 className="letras">{dataByName}</h4>
          <img  className="imgDont" src={gameOver} alt="imgDont" />
        </div>
        
      </div>
    );
  } else {
    return (
      <div>
        
        <div class="tools">
        
            <h2 className="searchTitle">All items</h2>
          <div class="settings">
            <button className="buttonView" id="view" onClick={toggleTable}><span>Switch View</span></button>
          </div>
        </div>
        <div className={productClasses}>
        {dataByName &&
          dataByName.map((elem, i) => {
            return (
              <div class="product">
                <div class="product-img">
                  <img src={elem.image} />
                </div>
                <div class="product-content">
                  <Link to={`${ROUTES.DETAIL}/${elem.id}`}>
                    <h3>
                      {elem.name}
                    </h3>
                  </Link>
                      <small>{elem.releaseDate}</small>

                  <p class="product-text price">{elem.price}$</p>
                  <p class="product-text genre">{elem.genre}</p>
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
