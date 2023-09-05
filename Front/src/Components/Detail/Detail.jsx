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
            
            { detail.length > 0 ? 
                <section id="banner" class="clearfix">
      <div id="banner_content_wrapper">
        <div id="poster">
          <img
            class="featured_image"
            src={detail[0].image}
          />
        </div>
        <div class="contentD">
          <h2 class="titleD">{detail[0].name}</h2>
          <p class="infoD">
          {detail[0].review} <span className="bbar">|</span>  <span className="price">Price: {detail[0].price} $</span>
          </p>
          
          <p class="description">
          {detail[0].description}
          </p>
          <p class="infoD">
          {detail[0].releaseDate} <span className="bbar">|</span>{detail[0].genre} <span className="bbar">|</span>{detail[0].supportedPlatforms}
          </p>
        </div>
      </div>
    </section>
                :  (<Loading/>) 
            }
        </div>
    )

    
  
}
