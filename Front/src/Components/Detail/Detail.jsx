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
                <div className="container">
                    <div className="details_container">
                        <div className="header">
                            <img className="img "src={game[0].image} alt='img'></img>
                            <h2 className="title">{game[0].name}</h2>
                        </div>


                        <div className="description">
                            <h3>{game[0].description}</h3>
                            <h3>{game[0].releaseDate}</h3>
                            <h3>{game[0].supportedPlatforms}</h3>
                            <h3>{game[0].genre}</h3>
                            <h3>{game[0].price}</h3>
                            <h3>{game[0].review}</h3>
                            <Link to={ROUTES.HOME}><button className="button_home">Back to Home</button></Link>
                        </div>
                    </div>
                </div>
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
