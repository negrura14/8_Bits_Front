import React, {useEffect} from "react";
import {useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // ver en la clase de Redux Toolkit los cambios
import { getGamesId } from "../../Redux/gameActions";
import { clearDetail } from '../../Redux/gameSlice'
import Loading from '../Loading/Loading'
import './Detail.css';


export default function Detail() {
    const {id} = useParams();
    const dispatch = useDispatch()
    const detail = useSelector(state => state.game.detail)
    
    useEffect(() =>{
        dispatch(getGamesId(id))

        return () => {
          dispatch(clearDetail()); // Llama a la acción para borrar el detalle
      }

    },[dispatch, id])
    
    
    
    return(
        <div>
            
            { Object.keys(detail).length > 0 ? 
                <section id="banner" class="clearfix">
      <div id="banner_content_wrapper">
        <div id="poster">
          <img
            class="featured_image"
            src={detail.image}
          />
        </div>
        <div class="contentD">
          <h2 class="titleD">{detail.name}</h2>
          <p class="infoD">
          {detail.review} <span className="bbar">|</span>  <span className="price">Price: {detail.price} $</span>
          </p>
          
          <p class="description">
          {detail.description}
          </p>
          <p class="infoD">
          {detail.releaseDate} <span className="bbar">|</span>{detail.genre} <span className="bbar">|</span>{detail.supportedPlatforms}
          </p>
          <p class="infoD">
           Stock: <span class="description">{detail.stock} Available</span> 
          </p>
        </div>
      </div>
    </section>
                :  (<Loading/>) 
            }
        </div>
    )

    
  
}
