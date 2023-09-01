import React, {useEffect} from "react";
import {useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // ver en la clase de Redux Toolkit los cambios
import './Detail.css';
import {ROUTES} from '../../Helpers/RoutesPath';


export default function Detail() {



    return(
        <div>

            <Link to={ROUTES.HOME}><button className='btn_detail'>Back to Home</button></Link>
        </div>
    )
}
