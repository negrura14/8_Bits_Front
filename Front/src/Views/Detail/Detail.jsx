import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // ver en la clase de Redux Toolkit los cambios
import { getGamesId } from "../../Redux/gameActions";
import { paymentByGameId } from "../../Redux/paymentsActions";
import { clearDetail } from "../../Redux/Reducers/gameSlice";
import { UpdateList, cartUpdate } from "../../Redux/Reducers/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../Components/Loading/Loading";
import "./Detail.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.game.detail);
  const payment = useSelector((state) => state.payments.paymentByGame);
  const { user, auth } = useSelector((state) => state.user.userState);
  const userData = user;
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [reviewsText, setReviewsText] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  //--------------------sweet alert---------------------------//
  const MySwal = withReactContent(Swal);

  const Toast = MySwal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  //--------------------sweet alert---------------------------//

  useEffect(() => {
    dispatch(getGamesId(id));
    dispatch(paymentByGameId(id));

    return () => {
      dispatch(clearDetail()); // Llama a la acción para borrar el detalle
    };
  }, [dispatch, id]);

  const handleChangeOnClic = () => {
    if (auth === true) {
      const cart =
        JSON.parse(localStorage.getItem(`cart.${userData.user.id}`)) || [];

      cart.push(detail);

      localStorage.setItem(`cart.${userData.user.id}`, JSON.stringify(cart));
      dispatch(UpdateList());
      Toast.fire(
        {
          icon: "success",
          iconColor: "white",
          title: <strong>Game added to cart!</strong>,
          color: "#fff",
          background: "#333",
        },
        dispatch(cartUpdate())
      );
    } else {
      navigate("/login");
      MySwal.fire({
        title: <strong>WARNING</strong>,
        html: <i>You have to login to purchase a game</i>,
        icon: "info",
        background: "#1d1d1d",
      });
    }
  };
  //-------------------------------Review---------------------------------
  let userId;
  const review = detail.Reviews;

  // const prueba = review.find(obj=> obj.userId === user.user.id)
  // console.log(prueba, "pruebaaa");

  console.log(review, "rererer");

  user.length == 0 ? userId : (userId = user.user.id);
  console.log(userId);
  const validatePayment = payment.find((obj) => obj.idUser === userId);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    validateForm(newRating, reviewsText);
  };

  const handleCommentChange = (event) => {
    const newReviewsText = event.target.value;
    setReviewsText(newReviewsText);
    validateForm(rating, newReviewsText);
  };

  const validateForm = (newRating, newReviewsText) => {
    setIsFormValid(newRating > 0 && newReviewsText.trim() !== "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      rating: rating,
      reviewsText: reviewsText,
      userId: user.user.id,
      gameId: detail.id,
    };

    setRating(0);
    setReviewsText("");
    setIsFormValid(false);

    try {
      await axios.post("http://localhost:3001/reviews", data);
    } catch (error) {
      console.log(JSON.stringify({ error: error.message }));
    }

    // setRating(0);
    // setReviewsText('');
    // setIsFormValid(false);
  };

  return (
    <div>
      {Object.keys(detail).length > 0 ? (
        <>

          <section class="single_product_details_area d-flex align-items-center">
            <div class="single_product_thumb clearfix">
              <div class="product_thumbnail_slides owl-carousel">
                <img src={detail.image} alt="" />
              </div>
            </div>

            <div class="single_product_desc clearfix">
              <span>{detail.releaseDate}</span>
              
                <h2 className="text-white">{detail.name}</h2>
              
              <p class="product-price text-primary">{detail.price} $</p>
              <p class="product-desc">{detail.description}</p>
              <p className="d-flex text-info">{/* {detail.SupportedPlatforms.map((platform) => platform.name)} */}
              {detail.SupportedPlatforms.map((platform, index) => (
                  <p className="">
                    {platform.name}
                    {index < detail.SupportedPlatforms.length - 1 && " - "}
                  </p> 
                ))}</p>

              <div >

              <div className="d-flex justify-content-between">

              <p class=" d-flex">
                {/* {detail.releaseDate} <span className="bbar">|</span>{detail.Genres.join(" - ")} <span className="bbar">|</span>{detail.SupportedPlatforms.join(" - ")} */}
                
                {detail.Genres.map((genre, index) => (
                  <p>Genre:{" "}
                    {genre.name}
                    {index < detail.Genres.length - 1 && " -"}
                  </p>
                ))}{" "}
              </p>
              <p class=" text-warning">
                  Stock:{" "}
                  {detail.stock} Available
                </p>
              </div>
              </div>

              <div class="cart-fav-box d-flex align-items-center">
                <button
                  name="addtocart"
                  value="5"
                  class="btn essence-btn"
                  onClick={handleChangeOnClic}
                >
                  Add to cart
                </button>
              </div>
            </div>

           
          </section>

          
            <div className="row d-flex justify-content-center border-top">

            <h2 className="text-white p-5">Reviews <i class="fa-solid fa-comments"></i></h2>


              <div className="col-11 bgReview">
                {detail.Reviews.map((review, index) => (
                  <div key={index}>

                  <div class="cardTesti mt-2 p-4">
                <p class="post">
                    <span><i class="fa-solid fa-quote-left fa-2x quote-img text-primary me-3"></i></span>
                    <span class="post-txt">{review.reviewsText} </span>
                    <div className="rating mt-2">
                      {Array.from({ length: 5 }, (_, starIndex) => (
                        <i
                          key={starIndex}
                          className={`fas fa-star star ${
                            starIndex < review.rating ? "marked" : ""
                          }`}
                        ></i>
                      ))}
                    </div>
                </p>
            </div>
            <div class="arrow-down"></div>
            <div class="row d-flex justify-content-center mb-4">
                <div class="d-flex">
                    <img class="profile-pic fit-image" src={review.User.image} alt={review.User.name}/>
                <p class=" mx-2 profile-name">{review.User.name}</p>
                </div>
            </div>
                    
                  </div>
                ))}
              </div>
              {validatePayment ? (
                <div>
                  <h2>Leave a Review</h2>
                  <form onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="rating"></label>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={rating >= star ? "marked" : "star"}
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
                      <button type="submit" disabled={!isFormValid}>
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              ) : null}
            </div>
        </>

      ) : (
        <Loading />
      )}
    </div>
  );
}
