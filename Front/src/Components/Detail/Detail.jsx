import React, {useEffect} from "react";
import {useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // ver en la clase de Redux Toolkit los cambios
import { getGamesId } from "../../Redux/gameActions";
import Loading from '../Loading/Loading'
import './Detail.css';


export default function Detail() {
    const{id} = useParams();
    const dispatch = useDispatch()
    const detail = useSelector(state => state.game.detail)
    
    

    useEffect(() =>{
        dispatch(getGamesId(id))
        // return(function cleanUp(){
        //     dispatch(getGamesById('clear'))
        // })
    },[dispatch, id])
    
    console.log(detail, "detaiiil");
    return(
        <div>
            
            { detail ? 
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
        </div>
      </div>
    </section>
                :  (<Loading/>) 
            }
        </div>
    )

    
    // if (Object.keys(detail).length === 0) {
    //     return <div>Loading...</div>;
    // }

    // // Desestructura los datos del juego que necesitas
    // const { name, image } = detail;
    // return (
    //     <div>
    //         <h2>{name}</h2>
    //         <img src={image} alt={name} />

    //         <Link to={ROUTES.HOME}>Back to Home</Link>
    //     </div>
    // )


    // return(
    //     <div>
    //         { 
    //          Object.keys(detail).length>0&&<span>{detail.id}</span>
    //         }
    //         <div>
    //         <h2>{name}</h2>
    //         <img src={image} alt={name} />

    //         <Link to={ROUTES.HOME}>Back to Home</Link>
        
    //         </div>
    //     </div>
    // )
}
