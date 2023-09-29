import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import {getUserByIdAction} from '../../../Redux/userProfileActions';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import notReviewsP from "../../../Img/notReviewsP.jpeg"
import { Link } from "react-router-dom";
import { ROUTES } from "../../../Helpers/RoutesPath";
import "./profileReviews.css"

import axios from "axios";

const Review = () => {

  const MySwal = withReactContent(Swal);
  const swalWithBootstrapButtons = MySwal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.userProfile.userById);
  const reviews = profile.Reviews;
  const {user} = useSelector((state)=>state.user.userState.user)
  const [selectedReviewIndex, setSelectedReviewIndex] = useState(-1);
  const [editedReview, setEditedReview] = useState({ rating: "", textReview: ""});
  const[idReview, setIdReview] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

 // console.log(profile, "profile" );


useEffect(()=>{
dispatch(getUserByIdAction(user.id))
}, [dispatch])
  
  const handleEditClick = (index) => {
    setSelectedReviewIndex(index);
    const selectedReview = reviews[index];
    setIdReview(selectedReview.id)
    setEditedReview({
      rating: editedReview.rating,
      textReview: editedReview.textReview,
    });
};
 
  const handleSaveClick = async () => { 
    try{
        const updatedReview = { ...reviews[selectedReviewIndex], ...editedReview };

        
        const update = await axios.put(`/reviews/${idReview}`, updatedReview)
        dispatch(getUserByIdAction(user.id))
        setSelectedReviewIndex(-1);
        setEditedReview({ rating: "", textReview: ""});
        
        
       }catch(error){
       console.log(JSON.stringify({error:error.message}))
       }
  };
  const handleCancelClick = () => {
    setSelectedReviewIndex(-1);
  };


  const handleInputChange = (e) => {
    
    const { name, value } = e.target;
    const updatedReview = { ...editedReview };
    updatedReview[name] = value;
    setEditedReview(updatedReview);
    validateForm(updatedReview.rating, value)
  };

  
const handleRatingChange = (star) => {
    console.log(star, "star");
    const updatedReview = { ...editedReview };
    updatedReview.rating = star;
    setEditedReview(updatedReview);
    validateForm(star, updatedReview.textReview) 
  };

  
  const validateForm = (star, value) => {
    setIsFormValid(star > 0 && value.trim() !== '');
  };

  const deletedReview = async ()=>{
    try {

      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You are going to delete review!",
        icon: 'warning',
        background: "#1d1d1d",
        showCancelButton: true,
        confirmButtonText: "Yes, I'm sure",
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then (async (result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Success!',
            'Deleted review',
            'success'
          )
           await axios.delete(`/reviews/${idReview}`)
          dispatch(getUserByIdAction(user.id))
          setSelectedReviewIndex(-1);
  
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            '',
            'error'
          )
        }
      })
      
    } catch (error) {
      console.log(JSON.stringify({error:error.message}))
    }

  }
  
  return (
    <div className="row d-flex justify-content-center">

            <h2 className="text-white p-5">Reviews <i className="fa-solid fa-comments"></i></h2>

    <div className="col-11 bgReview">
      {reviews?.length !== 0 ? reviews?.map((review, index) => (
        <div key={index}>
          <div className="cardTesti divRe mt-2 pt-4 pb-3 d-flex justify-content-center row">
          <div className="col-md-3 col-xl-3 col-auto">
            
          <div className="row">
          <div className="dataReview">
          <img src={review.Game.image} className="imageReview" alt={review.Game.name} />
          <h3 className="h5" >{review.Game.name}</h3>
          </div>
          
          
          </div>
           
            
            <br />

          </div>
          <div className="col">

            {selectedReviewIndex === index ? (
              <div>
                <form>
                  <div>
                    <label htmlFor="rating"></label>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={editedReview.rating >= star ? 'marked' : 'star'}
                        onClick={() => handleRatingChange(star)}
                      >
                        <FontAwesomeIcon icon={faStar} />
                      </span>
                    ))}
                  </div>
                  <div className="post">
                    <label htmlFor="textReview"></label>
                    <textarea
                      id="textReview"
                      name="textReview"
                      className="post-txt bg-transparent text-white border-primary"
                      value={editedReview.textReview}
                      onChange={handleInputChange}
                      rows={4}
                      maxLength={200}
                    />
                  </div>
                </form>
              </div>
            ) : (
              <div>
                <div>
                  
                  <div className="rating">
                    {Array.from({ length: 5 }, (_, starIndex) => (
                      <i
                        key={starIndex}
                        className={`fas fa-star star ${
                          starIndex < review.rating ? 'marked' : ''
                        }`}
                      ></i>
                    ))}
                  </div>
                  <br />
                <span className="post-txt fs-6">

                  {review.reviewsText}
                </span>
                </div>
              </div>
            )}
          {selectedReviewIndex === index ? (
            <div>
              <button className="btn btn-outline-secondary me-1" onClick={handleSaveClick} disabled={!isFormValid}>Save</button>
              <button className="btn btn-outline-danger ms-1" onClick={handleCancelClick}>Cancel</button>
              <button className="btn btn-outline-danger ms-1" onClick={()=>deletedReview(index)}>Delete</button>
            </div>
          ) : (
            <div className="my-4 py-3">
            <button className="btn btn-outline-primary" onClick={() => handleEditClick(index)}>Edit</button>
            </div>
          )}
          </div>
          <br />
          </div>

          
        </div>
      )): 
          <div className="row d-flex justify-content-center text-white login-box">
          <div className=" col-6 filter--text pLinkG mt-5">
          <div><h2 className="fs-3 mb-5">You have no reviews, to do one you have to purchase a game!</h2></div>
          <div><h6 className="mb-5 fs-4">Purchase one here 👇</h6></div>
            
            
            <Link  className="essence-btn aC" to={ROUTES.STORE}><p>STORE</p></Link>
          </div>
          <img src={notReviewsP} className="notReviewImg col-6"/>
        </div>
      }
    </div>
    </div>
  );
};
  export default Review;


