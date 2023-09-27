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

  console.log(user.id, "userId" );

useEffect(()=>{
dispatch(getUserByIdAction(user.id))
}, [dispatch, profile.Review])

  const handleEditClick = (id) => {
    setSelectedReviewIndex(id);
    const selectedReview = reviews[id];
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
        setSelectedReviewIndex(-1);
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
    <div className="row d-flex justify-content-center">

            <h2 className="text-white p-5">Reviews <i className="fa-solid fa-comments"></i></h2>

    <div className="col-11 bgReview">
      {reviews?.map((review, index) => (
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
      ))}
    </div>
    </div>
  );
};
  export default Review;




// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar } from '@fortawesome/free-solid-svg-icons';


// const Review = () => {

//     const profile = useSelector((state)=>state.userProfile.userById)

//     const review = profile.Reviews

//   const [selectedReviewIndex, setSelectedReviewIndex] = useState(-1);
//   const [editedReview, setEditedReview] = useState({ rating: "", textReview: "" });

//   const handleEditClick = (index) => {
//     setSelectedReviewIndex(index);
//     const selectedReview = review[index];
//     console.log(selectedReview, "select");
//     setEditedReview({
//       rating: selectedReview.rating,
//       textReview: selectedReview.textReview,
//     });
//   };

//   const handleSaveClick = () => {
//     // Update the selected review with edited data
//     const updatedReview = { ...reviews[selectedReviewIndex], ...editedReview };
//     // Call an appropriate update function to save the edited review (e.g., dispatch an action in Redux)
//     // For example, dispatch(updateReview(updatedReview));
//     // After saving, clear the selected review
//     setSelectedReviewIndex(-1);
//   };

//   const handleCancelClick = () => {
//     // Clear the selected review without saving changes
//     setSelectedReviewIndex(-1);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     setEditedReview({
//       ...editedReview,
//       [name]: value,
//     });
//   };

//   return (
//     <div>
//       {review.map((review, index) => (
//         <div key={index}>
//           <div className="review">
//           <img src={review.Game.image} width={150} height={150} alt={review.Game.name} />
//               {review.Game.name}
//               <br />
            
//             {/* Review content */}
//             {selectedReviewIndex === index ? (
//               <div>
//                 <form>
//         <div>
//           <label htmlFor="rating"></label>
//           {[1, 2, 3, 4, 5].map((star) => (
//             <span
//               key={star}
//               className={review.rating >= star ? 'marked' : 'star'}
//               onClick={() => handleRatingChange(star)}
//             >
//               <FontAwesomeIcon icon={faStar} />
//             </span>
//           ))}
//         </div>
//         <div>
//           <label htmlFor="reviewsText"></label>
//           <textarea
//             id="reviewsText"
//             value={review.reviewsText}
//             onChange={handleInputChange}
//             rows={4}
//           />
//         </div>
//         <div>
//           {/* <button type="submit">Submit</button> */}
//         </div>
//       </form>
//                 {/* Edit form with star rating and textReview */}
//                 {/* ... */}
//               </div>
//             ) : (
//               <div>
//                 <div>
//                   {review.textReview}
//                   <br />
//                   <div className="rating">
//                     {Array.from({ length: 5 }, (_, starIndex) => (
//                       <i
//                         key={starIndex}
//                         className={`fas fa-star star ${
//                           starIndex < review.rating ? 'marked' : ''
//                         }`}
//                       ></i>
//                     ))}
//                   </div>
//                 </div>
//                 {/* Display review details */}
                
//                 {/* ... */}
//               </div>
//             )}
//           </div>
//           <br />
//           {selectedReviewIndex === index ? (
//             <div>
//               <button onClick={handleSaveClick}>Save</button>
//               <button onClick={handleCancelClick}>Cancel</button>
//             </div>
//           ) : (
//             <button onClick={() => handleEditClick(index)}>Edit</button>
//           )}
//         </div>
//       ))}
//     </div>
//   );
  
    
//   };
  
//   export default Review;


