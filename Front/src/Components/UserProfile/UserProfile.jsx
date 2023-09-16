import "./UserProfile.css";
import "../Card/Card.css";

import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate,useParams } from "react-router-dom";
import {Link} from 'react-router-dom'


import { getUsersAct } from "../../Redux/userActions";
import { ROUTES } from '../../Helpers/RoutesPath'


import UploadWidget from "../../Helpers/UploadWidget";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function UserProfile() {
    // const {id} = useParams();
    // const dispatch = useDispatch()
    const { users }  = useSelector((state) => state.user);


    // useEffect(() => {
    //     dispatch(getUsersAct());
    //   }, [dispatch]);

    const userTest = {
		"name": "Agus",
		"lastname": "Camuzzi",
        "nickname": "CAMU",
		"description": "Programmer and passionate for the videogames and martial arts",
		"email": "email@email.com",
		"password": "Asdf1234",
		"image": "https://res.cloudinary.com/bits8/image/upload/v1694117023/like-to-ash-of-pokemon-removebg-preview_xnqier.png",
		"country": "San Luis, San Luis, Argentina",
        "number": "2664953687",
		"disable": false,
		"admin": false
    }

    const userGames = [
        {
            "name": "The Legend of Zelda: Breath of the Wild",
            "image": "https://res.cloudinary.com/bits8/image/upload/v1694010552/f6yhlgzc47sveuthyom7.jpg",
            "description": "An open-world action-adventure game set in the fantasy realm of Hyrule.",
            "releaseDate": "March 3, 2017",
            "supportedPlatforms": ["Nintendo Switch", "Wii U"],
            "genre": ["Action", "Adventure"],
            "price": 35.90,
            "review": "Metacritic Score - 97/100",
            "stock": 27,
          },
          {
            "name": "The Witcher 3: Wild Hunt",
            "image": "https://res.cloudinary.com/bits8/image/upload/v1694108886/tew4ergptn4c1bf7mdyb.jpg",
            "description": "A sprawling open-world RPG where you play as Geralt of Rivia, a monster hunter.",
            "releaseDate": "May 19, 2015",
            "supportedPlatforms": ["PC", "PlayStation 4", "Xbox One", "Nintendo Switch"],
            "genre": ["RPG"],
            "price": 29.90,
            "review": "Metacritic Score - 93/100",
            "stock": 44,
          },
          {
            "name": "Red Dead Redemption 2",
            "image": "https://res.cloudinary.com/bits8/image/upload/v1694108970/rstfwrq9xp5cv5hkqcf7.jpg",
            "description": "An epic tale of life in America's unforgiving heartland during the late 1800s.",
            "releaseDate": "October 26, 2018",
            "supportedPlatforms": ["PC", "PlayStation 4", "Xbox One"],
            "genre": ["Action", "Adventure"],
            "price": 29.90,
            "review": "Metacritic Score - 97/100",
            "stock": 29,
          }
    ]

    return (
        <div className="basicStyles">

            <h1>{"Hello " + userTest.nickname + "!"}</h1>

            <img 
                alt="profileImage" 
                src={userTest.image}
                style={{maxWidth: "300px", maxHeight: "300px"}}
            />
            <h2>{userTest.country}</h2>

            <h3>{userTest.description}</h3>
            
            <h2>Your games:</h2>
            <div className='containerF'>
                    {userGames&&userGames.map((elem, i)=>{
                        return(
                            <div className="item" key={i}>
                            
                    <Link className='link_card' to={`${ROUTES.DETAIL}/${elem.id}`}>
                <div className="cardF" >
                    <div className="circle circle2"></div>
                    <div className="circle circle1"></div>
                    <img  className="imgF" src={elem.image} />
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
                        )
                    })}
                
            </div>

            <button>MODIFY PROFILE</button>

            {/* <h2>Name: {userTest.name}</h2>
            <h2>Lastname: {userTest.lastname}</h2>
            <h2>Nickname: {userTest.nickname}</h2>
            <h2>Email: {userTest.email}</h2>
            <h2>Location: {userTest.country}</h2>
            <h2>Number: {userTest.number}</h2>
            <h2>Description: {userTest.description}</h2>
            <h2>Password: {userTest.password}</h2>
            <h2>Image: {userTest.image}</h2> */}

        </div>
    )
}