import React, {useEffect} from "react";
import {useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // ver en la clase de Redux Toolkit los cambios
import {ROUTES} from '../../Helpers/RoutesPath';
import { getGamesById } from "../../Redux/gameActions";
import Loading from '../Loading/Loading'
import './Detail.css';


export default function Detail({id}) {
    const dispatch = useDispatch()
    const {game} = useSelector(state => state.game)

    useEffect(() =>{
        dispatch(getGamesById(id))
        // return(function cleanUp(){
        //     dispatch(getGamesById('clear'))
        // })
    },[dispatch, id])

    return(
        <div>
            
            { game ? 
                <section id="banner" class="clearfix">
      <div id="banner_content_wrapper">
        <div id="poster">
          <img
            class="featured_image"
            src={game[0].image}
          />
        </div>
        <div class="contentD">
          <h2 class="titleD">{game[0].name}</h2>
          <p class="infoD">
          {game[0].review} <span className="bbar">|</span>  <span className="price">Price: {game[0].price} $</span>
          </p>
          
          <p class="description">
          {game[0].description}
          </p>
          <p class="infoD">
          {game[0].releaseDate} <span className="bbar">|</span>{game[0].genre} <span className="bbar">|</span>{game[0].supportedPlatforms}
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
