import React, {useEffect} from "react";
import {useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // ver en la clase de Redux Toolkit los cambios
import {ROUTES} from '../../Helpers/RoutesPath';
import { getGamesById } from "../../Redux/gameActions";
import './Detail.css';


export default function Detail() {
    const dispatch = useDispatch()
    const {detail} = useSelector(state => state.game)

    useEffect(() =>{
        dispatch(getGamesById())
        // return(function cleanUp(){
        //     dispatch(getGameById('clear'))
        // })
    },[])


    return(
        <div>
            { 
             Object.keys(detail).length>0&&<span>{detail.name}</span>
            }
        </div>
    )
}
