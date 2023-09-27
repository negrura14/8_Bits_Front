import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import {getUserByIdAction} from '../../../Redux/userProfileActions'
import axios from "axios";

const Review = () => {


  const dispatch = useDispatch();
  const profile = useSelector((state) => state.userProfile.userById);
  const reviews = profile.Reviews;
  const {user} = useSelector((state)=>state.user.userState.user)
  const [selectedReviewIndex, setSelectedReviewIndex] = useState(-1);
  const [editedReview, setEditedReview] = useState({ rating: "", textReview: ""});
  const[idReview, setIdReview] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  console.log(profile, "profile" );

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
        const update = await axios.put(`http://localhost:3001/reviews/${idReview}`, updatedReview)
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

  return (
    <div>
      {reviews?.map((review, index) => (
        <div key={index}>
          <div className="review">
            <img src={review.Game.image} width={150} height={150} alt={review.Game.name} />
            {review.Game.name}
            <br />

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
                  <div>
                    <label htmlFor="textReview"></label>
                    <textarea
                      id="textReview"
                      name="textReview"
                      value={editedReview.textReview}
                      onChange={handleInputChange}
                      rows={4}
                    />
                  </div>
                </form>
              </div>
            ) : (
              <div>
                <div>
                  {review.reviewsText}
                  <br />
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
                </div>
              </div>
            )}
          {selectedReviewIndex === index ? (
            <div>
              <button onClick={handleSaveClick} disabled={!isFormValid}>Save</button>
              <button onClick={handleCancelClick}>Cancel</button>
            </div>
          ) : (
            <button onClick={() => handleEditClick(index)}>Edit</button>
          )}
          </div>
          <br />
          
        </div>
      ))}
    </div>
  );
};
  export default Review;


