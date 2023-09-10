import "./CreateUser.css";

import axios from "axios";
import { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import UploadWidget from "../../Helpers/UploadWidget";

export default function CreateUser() {
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    // const { user } = useSelector((state) => state.user);


    //useEffect de los usuarios


    const [input,setInput] = useState({
        name: "",
        lastname: "",
        email: "",
        password: "",
        admin: false   
    });

    const [errors,setErrors] = useState({
        name: "",
        lastname: "",
        email: "",
        password: "",
        admin: false
    })


    return(
        <div>
            <h2>Create User</h2>

            <form>

                <div>
                    <label>Name</label>
                    <input 
                        placeholder="Enter your name"
                        type="text"
                        name="name"
                        value={input.name}
                        //onChange
                    />
                    {errors.name && <p>{errors.name}</p>}
                </div>

                <div>
                    <label>Lastname</label>
                    <input 
                        placeholder="Enter your lastname"
                        type="text"
                        name="lastname"
                        value={input.lastname}
                        //onChange
                    />
                    {errors.lastname && <p>{errors.lastname}</p>}
                </div>

                <div>
                    <label>Email</label>
                    <input 
                        placeholder="Enter your email"
                        type="text"
                        name="email"
                        value={input.email}
                        //onChange
                    />
                    {errors.email && <p>{errors.email}</p>}
                </div>

                <div>
                    <label>Password</label>
                    <input 
                        placeholder="Enter your password"
                        type="text"
                        name="password"
                        value={input.password}
                        //onChange
                    />
                    {errors.password && <p>{errors.password}</p>}
                </div>

                <button>
                    UPLOAD
                </button>

                

            </form>

        </div>
    )

}