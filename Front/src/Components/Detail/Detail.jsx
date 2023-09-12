import React, {useEffect, useState} from "react";
import {useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // ver en la clase de Redux Toolkit los cambios
import { getGamesId } from "../../Redux/gameActions";
import { clearDetail } from '../../Redux/gameSlice'
import { UpdateList } from '../../Redux/cartSlice';
import Loading from '../Loading/Loading';
import './Detail.css';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


export default function Detail() {
    const {id} = useParams();
    const dispatch = useDispatch()
    const detail = useSelector(state => state.game.detail)

    //--------------------sweet alert---------------------------//
    const MySwal = withReactContent(Swal);
        
    const Toast = MySwal.mixin({  
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    //--------------------sweet alert---------------------------//
    
    useEffect(() =>{
        dispatch(getGamesId(id))
        
        return () => {
          dispatch(clearDetail()); // Llama a la acción para borrar el detalle
      }

    },[dispatch, id])
    
    const handleChangeOnClic = () => {
      // console.log("Esto es lo que muestra el GAME dentro de CARDT: ", game);
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
      cart.push(detail);
  
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch(UpdateList())  
      Toast.fire({
        icon: 'success',
        iconColor: "white",
        title: <strong>Game added to cart!</strong>,
        color: "#fff",
        background : "#333",
      })
  }
    
    
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
          {detail.releaseDate} <span className="bbar">|</span>{detail.genre.join(" - ")} <span className="bbar">|</span>{detail.supportedPlatforms.join(" - ")}
          </p>
          <div className="buttonCart">
            <p class="infoD">
            Stock: <span class="description">{detail.stock} Available</span> 
            </p>
            <button className="buttonFlex" onClick={handleChangeOnClic}>Add to Cart</button>
          </div>
        </div>
      </div>
    </section>
                :  (<Loading/>) 
            }
        </div>
    )

    
  
}
