import "./UserProfile.css";
import "../../../Components/Card/Card.css";

import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { getUsersAct,getUserGamesAction } from "../../../Redux/userActions";
import { getUserProfileAction } from "../../../Redux/userProfileActions";
import { ROUTES } from "../../../Helpers/RoutesPath";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import LoadingPage from "../../../Components/Loading/Loading";
import ProgressBar from 'react-bootstrap/ProgressBar';


export default function UserProfile() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user.userState.user);
  const {userGamesPay} = useSelector((state) => state.user.userState)
  const { userProfile } = useSelector((state) => state.userProfile);
  const [loading, setLoading] = useState(true);
  
  const MySwal = withReactContent(Swal);
  const userData = userProfile;


  useEffect(() => {
      console.log(user.email,"user email")
      dispatch(getUsersAct());
      dispatch(getUserGamesAction(user.id))
      dispatch(getUserProfileAction(user.email))
      .then (() =>{
        setLoading(false);
      })
      .catch((error) => {
        alert('Error', error);
        setLoading(false);
      })
    }, [dispatch, user.email]);
  
  
  //-------------BARRA DE PROGRESO---------------------------------------------------------------------------//
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Aquí calculamos el progreso basado en los datos de userData[0]
    if (userData && userData.length > 0) {
      const user = userData[0];
      const fieldsToIgnore = ["id", "disable", "admin"];

      // Filtrar los campos que no deben ser ignorados y no son nulos
      const validFields = Object.keys(user).filter(
        (key) => !fieldsToIgnore.includes(key) && user[key] !== null
      );

      // Calcular el progreso como un porcentaje de campos válidos en comparación con todos los campos posibles
      const calculatedProgress = (validFields.length / (Object.keys(user).length - fieldsToIgnore.length)) * 100;
      
      setProgress(calculatedProgress);
    }
  }, [userData]);
  //-------------BARRA DE PROGRESO---------------------------------------------------------------------------//



  //-------funcionalidad para mostrar toda la data del usuario------------//

  const showUserData = () => {
    const formattedUserData = `
    <b>Name:</b> ${userData[0].name}<br>
    <b>Nickname:</b> ${userData[0].nickName}<br>
    <b>Lastname:</b> ${userData[0].lastname}<br>
    <b>Email:</b> ${userData[0].email}<br>
    <b>Description:</b> ${userData[0].description}<br>
    <b>Country:</b> ${userData[0].country}<br>
    <b>Phone:</b> ${userData[0].phone}
  `;
  
    MySwal.fire({
      title: 'User Data',
      html: formattedUserData,
      icon: 'info',
      confirmButtonText: 'Close',
      background : "#1d1d1d",
      color: "white",
    });
  };
  //-------fin funcionalidad para mostrar toda la data del usuario------------//
console.log(userGamesPay);
  if(loading) {
    return(
      <div> 
          <LoadingPage/>
      </div>
    )
  } else {
    return (
    <>   
  <div class="container py-5 h-100">
  
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-lg-12 col-xl-10">
        <div class="cardUP">
          <div class="rounded-top text-white d-flex flex-row" >
            <div class="ms-4 mt-5 d-flex flex-column avatarU" >
              <img src={userData[0].image}
                alt="Generic placeholder image" class="img-fluid img-thumbnail thumbailU mt-4 mb-2"
               />

               <button className="btn btn-secondary bg-transparent showDetail" onClick={showUserData}>
                Show Detail
              </button>
            </div>
            <div class="ms-3 textsUP" >
              <h5>{userData[0].nickName ? userData[0].nickName : userData[0].name}</h5>
              <p>{userData[0].country ? userData[0].country : "your location"}</p>
            </div>
          </div>
          <div class="p-4 text-white textU" >
            <div class="d-flex justify-content-end text-center py-1">
              <div>
                <p class="mb-1 h5">{userGamesPay.length}</p>
                <p class="small text-white-50 mb-0">Games</p>
              </div>
            </div>
          </div>
          <div class="card-body p-4 text-white mt-3">
          <div className="mb-4 progressData">

          <p class="lead fw-normal my-1">Percentage of data completed</p>
          <ProgressBar now={progress} label={`${progress.toFixed(2)}%`} />
          </div>
            <div class="mb-5">
              <p class="lead fw-normal my-1">About</p>
              <div class="p-4 description UP">
                <p class="font-italic mb-1">{userData[0].description ? userData[0].description : "Write your description"}</p>
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-center mb-4">
              <p class="lead fw-normal mb-0">Games</p>
            </div>
            <div class="row g-2 d-flex justify-content-center">
               {userGamesPay.length !== 0 ?
            userGamesPay.map((elem, i) => {
              return (
                <div className="item col-xs-12 m-3" key={i}>
                  <Link
                    className="link_card"
                    to={`${ROUTES.DETAIL}/${elem.game.id}`}
                  >
                    <div className="cardF">
                      <div className="circle circle2"></div>
                      <div className="circle circle1"></div>
                      <img className="imgF" src={elem.game.image} />
                    </div>
                  </Link>

                  <div className="content">
                    <p>{elem.game.name}</p>
                  </div>
                  <span className="top"></span>
                  <span className="right"></span>
                  <span className="bottom"></span>
                  <span className="left"></span>
                </div>
              );
            }): 
              <div>
                <h1>You have no games!</h1>
                <h3>Purchase one here 👇</h3>
                <Link to={ROUTES.STORE}>STORE</Link>
              </div>
            }
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    </>
  );
}}
