import React, {useEffect, useState} from "react";
import {useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // ver en la clase de Redux Toolkit los cambios
import { getGamesId } from "../../Redux/gameActions";
import { paymentByGameId } from "../../Redux/paymentsActions";
import { clearDetail } from '../../Redux/Reducers/gameSlice'
import { UpdateList, cartUpdate} from '../../Redux/Reducers/cartSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Loading from '../../Components/Loading/Loading';
import './Detail.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from "axios";



export default function Detail() {
    const {id} = useParams();
    const dispatch = useDispatch()
    const detail = useSelector(state => state.game.detail);
    const payment = useSelector(state=>state.payments.paymentByGame);
    const { user, auth } = useSelector((state) => state.user.userState);
    const userData = user;
    const navigate = useNavigate();

    const [rating, setRating] = useState(0);
    const [reviewsText, setReviewsText] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);


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
        dispatch(getGamesId(id));
        dispatch(paymentByGameId(id));
        
        
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
        MySwal.fire({
          title: <strong>WARNING</strong>,
          html: <i>You have to login to purchase a game</i>,
          icon: 'info',
          background : "#1d1d1d",
        });
      }
  };
 //-------------------------------Review---------------------------------
let userId 
const review = detail.Reviews;

const validateReview = review?.find(obj=> obj.userId === user.user.id)


user.length == 0 ? userId : userId = user.user.id 

const validatePayment = payment?.find(obj => obj.idUser === "50a1876d-8c39-4e80-a4a1-58e5a35668ef" ); 




 const handleRatingChange = (newRating) => {
  setRating(newRating);
  validateForm(newRating, reviewsText)
  
};

const handleCommentChange = (event) => {
  const newReviewsText= event.target.value
  setReviewsText(newReviewsText);
  validateForm(rating, newReviewsText)
};

const validateForm = (newRating, newReviewsText) => {
  setIsFormValid(newRating > 0 && newReviewsText.trim() !== '');
};

const handleSubmit = async (event) => {
  event.preventDefault();

  const data = {
    rating:rating,
    reviewsText: reviewsText,
    userId: user.user.id,
    gameId: detail.id
  };

  setRating(0);
  setReviewsText('');
  setIsFormValid(false);

 try{
  await axios.post("http://localhost:3001/reviews", data)
 }catch(error){
 console.log(JSON.stringify({error:error.message}))
 }

};
      
    
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
       
          <div>
          
            {detail.Reviews?.map((review, index)=>(
              
             <div key={index}>
              <div className="review">
                <img src={review.User.image} width={50} height={150} alt={review.User.name}></img>
              {review.User.name}<br/>
                
              {review.reviewsText}
              </div>     
              <div className="rating">  
              
              {Array.from({length:5},(_,starIndex)=>(
                <i
                key={starIndex}
                className={`fas fa-star star ${starIndex < review.rating ? 'marked' : ''}`}
              ></i>
              ))}
              
              </div>
              <br/>
             </div> 
))}
          </div>
          {validatePayment  && !validateReview?( 
            <div>
      <h2>Leave a Review</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="rating"></label>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={rating >= star ? 'marked' : 'star'}
              onClick={() => handleRatingChange(star)}
            >
              <FontAwesomeIcon icon={faStar} />
            </span>
          ))}
        </div>
        <div>
          <label htmlFor="reviewsText"></label>
          <textarea
            id="reviewsText"
            value={reviewsText}
            onChange={handleCommentChange}
            rows={4}
          />
        </div>
        <div>
          <button type="submit" disabled={!isFormValid}>Submit</button>
        </div>
      </form>
    </div>) : null}
         
        </div>
        
      </div>
      
    </section>
                :  (<Loading/>) 
            }
            
        </div>
        
    )

    
  
}
