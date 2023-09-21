import React, {useEffect, useState} from "react";
import {useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // ver en la clase de Redux Toolkit los cambios
import { getGamesId } from "../../Redux/gameActions";
import { clearDetail } from '../../Redux/Reducers/gameSlice'
import { UpdateList, cartUpdate} from '../../Redux/Reducers/cartSlice';
import Loading from '../../Components/Loading/Loading';
import './Detail.css';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


export default function Detail() {
    const {id} = useParams();
    const dispatch = useDispatch()
    const detail = useSelector(state => state.game.detail)
    const { user, auth } = useSelector((state) => state.user.userState)
    const userData = user;
    const navigate = useNavigate();


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
      if(auth === true){ 
        const cart = JSON.parse(localStorage.getItem(`cart.${userData.user.id}`)) || [];
    
        cart.push(detail);
    
        localStorage.setItem(`cart.${userData.user.id}`, JSON.stringify(cart));
        dispatch(UpdateList())  
        Toast.fire({
          icon: 'success',
          iconColor: "white",
          title: <strong>Game added to cart!</strong>,
          color: "#fff",
          background : "#333",
        }, dispatch(cartUpdate()))
      } else {
        navigate('/login');
      }
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
          {/* {detail.releaseDate} <span className="bbar">|</span>{detail.Genres.join(" - ")} <span className="bbar">|</span>{detail.SupportedPlatforms.join(" - ")} */}
          {detail.releaseDate} <span className="bbar">|</span>
          {detail.Genres.map((genre,index) => (
            <span>
              {genre.name}
              {index < detail.Genres.length -1 && " -"}
            </span>
          ))} <span className="bbar">|</span>
          {/* {detail.SupportedPlatforms.map((platform) => platform.name)} */}
          {detail.SupportedPlatforms.map((platform,index) => (
            <span>
              {platform.name}
              {index < detail.SupportedPlatforms.length -1 && " -"}
            </span>
          ))}
          </p>
          <div className="buttonCart">
            <p class="infoD">
            Stock: <span class="description">{detail.stock} Available</span> 
            </p>
            <button class="bookmarkBtn" onClick={handleChangeOnClic}>
  <span class="IconContainerDB"> 
  <i className="fa fa-shopping-cart"></i>
  </span>
  <p class="textDB">Add</p>
</button>
            
          </div>
        </div>
      </div>
    </section>
                :  (<Loading/>) 
            }
        </div>
    )

    
  
}
