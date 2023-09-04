import React, {useEffect} from "react";
import {useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // ver en la clase de Redux Toolkit los cambios
import {ROUTES} from '../../Helpers/RoutesPath';
import { getGamesById } from "../../Redux/gameActions";
import './Detail.css';


export default function Detail() {
    const dispatch = useDispatch()
    const detail = useSelector(state => state.game)

    useEffect(() =>{
        dispatch(getGamesById(id))
        return(function cleanUp(){
            dispatch(getGamesById('clear'))
        })
    },[dispatch, id])

    
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


    return(
        <div>
            { 
             Object.keys(detail).length>0&&<span>{detail.id}</span>
            }
            <div>
            <h2>{name}</h2>
            <img src={image} alt={name} />

            <Link to={ROUTES.HOME}>Back to Home</Link>
        
            </div>
        </div>
    )
}
