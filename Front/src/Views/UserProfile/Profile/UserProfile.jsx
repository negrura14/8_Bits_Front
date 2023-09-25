import "./UserProfile.css";
import "../../../Components/Card/Card.css";

import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { getUsersAct } from "../../../Redux/userActions";
import { getUserProfileAction } from "../../../Redux/userProfileActions";
import { ROUTES } from "../../../Helpers/RoutesPath";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import LoadingPage from "../../../Components/Loading/Loading";


export default function UserProfile() {
  // const {id} = useParams();
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user.userState.user);
  const { userProfile } = useSelector((state) => state.userProfile);
  // const [userData, setUserData] = useState(userProfile[0])
  const [loading, setLoading] = useState(true);
  
  const userData = userProfile;

  const defaultPhoto = "https://res.cloudinary.com/bits8/image/upload/v1695360325/Avatar%20Images/ftme8psm1dbrgyjltb6w.jpg";

  useEffect(() => {
      //console.log(user.email)
      dispatch(getUsersAct());
      dispatch(getUserProfileAction(user.email))
      .then (() =>{
        setLoading(false);
      })
      .catch((error) => {
        alert('Error', error);
        setLoading(false);
      })
    }, [dispatch, user.email]);
  

  const userGames = [
    {
      name: "The Legend of Zelda: Breath of the Wild",
      image:
        "https://res.cloudinary.com/bits8/image/upload/v1694010552/f6yhlgzc47sveuthyom7.jpg",
      description:
        "An open-world action-adventure game set in the fantasy realm of Hyrule.",
      releaseDate: "March 3, 2017",
      supportedPlatforms: ["Nintendo Switch", "Wii U"],
      genre: ["Action", "Adventure"],
      price: 35.9,
      review: "Metacritic Score - 97/100",
      stock: 27,
    },
    {
      name: "The Witcher 3: Wild Hunt",
      image:
        "https://res.cloudinary.com/bits8/image/upload/v1694108886/tew4ergptn4c1bf7mdyb.jpg",
      description:
        "A sprawling open-world RPG where you play as Geralt of Rivia, a monster hunter.",
      releaseDate: "May 19, 2015",
      supportedPlatforms: [
        "PC",
        "PlayStation 4",
        "Xbox One",
        "Nintendo Switch",
      ],
      genre: ["RPG"],
      price: 29.9,
      review: "Metacritic Score - 93/100",
      stock: 44,
    },
    {
      name: "Red Dead Redemption 2",
      image:
        "https://res.cloudinary.com/bits8/image/upload/v1694108970/rstfwrq9xp5cv5hkqcf7.jpg",
      description:
        "An epic tale of life in America's unforgiving heartland during the late 1800s.",
      releaseDate: "October 26, 2018",
      supportedPlatforms: ["PC", "PlayStation 4", "Xbox One"],
      genre: ["Action", "Adventure"],
      price: 29.9,
      review: "Metacritic Score - 97/100",
      stock: 29,
    },
  ];


  if(loading) {
    return(
      <div> 
          <LoadingPage/>
      </div>
    )
  } else {
    return (
    <>{/*
      <div className="basicStyles">
        <h1>{"Hello " + user.nickname + "!"}</h1>

        <img
          alt="profileImage"
          src={user.image}
          style={{ maxWidth: "300px", maxHeight: "300px" }}
        />
        <h2>{user.country}</h2>

        <h3>{user.description}</h3>

        <h2>Your games:</h2>
        <div className="containerF">
          {userGames &&
            userGames.map((elem, i) => {
              return (
                <div className="item" key={i}>
                  <Link
                    className="link_card"
                    to={`${ROUTES.DETAIL}/${elem.id}`}
                  >
                    <div className="cardF">
                      <div className="circle circle2"></div>
                      <div className="circle circle1"></div>
                      <img className="imgF" src={elem.image} />
                    </div>
                  </Link>

                  <div className="content">
                    <p>{elem.name}</p>
                  </div>
                  <span className="top"></span>
                  <span className="right"></span>
                  <span className="bottom"></span>
                  <span className="left"></span>
                </div>
              );
            })}
        </div>

        <button>MODIFY PROFILE</button>

        {/* <h2>Name: {user.name}</h2>
            <h2>Lastname: {user.lastname}</h2>
            <h2>Nickname: {user.nickname}</h2>
            <h2>Email: {user.email}</h2>
            <h2>Location: {user.country}</h2>
            <h2>Number: {user.number}</h2>
            <h2>Description: {user.description}</h2>
            <h2>Password: {user.password}</h2>
            <h2>Image: {user.image}</h2> 
      </div>*/}

      
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-lg-12 col-xl-10">
        <div class="cardUP">
          <div class="rounded-top text-white d-flex flex-row" >
            <div class="ms-4 mt-5 d-flex flex-column avatarU" >
              <img src={userData[0].image ? userData[0].image : defaultPhoto}
                alt="Generic placeholder image" class="img-fluid img-thumbnail thumbailU mt-4 mb-2"
               />
            </div>
            <div class="ms-3 textsUP" >
              <h5>{userData[0].nickName ? userData[0].nickName : userData[0].name}</h5>
              <p>{userData[0].country ? userData[0].country : "your location"}</p>
            </div>
          </div>
          <div class="p-4 text-white textU" >
            <div class="d-flex justify-content-end text-center py-1">
              <div>
                <p class="mb-1 h5">3</p>
                <p class="small text-white-50 mb-0">Games</p>
              </div>
            </div>
          </div>
          <div class="card-body p-4 text-white mt-5">
            <div class="mb-5">
              <p class="lead fw-normal mb-1">About</p>
              <div class="p-4 description UP">
                <p class="font-italic mb-1">{userData[0].description ? userData[0].description : "Write your description"}</p>
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-center mb-4">
              <p class="lead fw-normal mb-0">Games</p>
            </div>
            <div class="row g-2 d-flex justify-content-center">
               {userGames &&
            userGames.map((elem, i) => {
              return (
                <div className="item col-xs-12 m-3" key={i}>
                  <Link
                    className="link_card"
                    to={`${ROUTES.DETAIL}/${elem.id}`}
                  >
                    <div className="cardF">
                      <div className="circle circle2"></div>
                      <div className="circle circle1"></div>
                      <img className="imgF" src={elem.image} />
                    </div>
                  </Link>

                  <div className="content">
                    <p>{elem.name}</p>
                  </div>
                  <span className="top"></span>
                  <span className="right"></span>
                  <span className="bottom"></span>
                  <span className="left"></span>
                </div>
              );
            })}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    </>
  );
}}
