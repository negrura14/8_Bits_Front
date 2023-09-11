import "./CreateUser.css";

import axios from "axios";
import { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import bcrypt from "bcryptjs-react";

import validateUser from "./validateUser";

export default function CreateUser() {
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    // const { user } = useSelector((state) => state.user);


    //useEffect de los usuarios

    const usersPrueba = [
        {
            "name": "Sujeto 1",
            "lastname": "-",
            "email": "prueba@gmail.com",
            "password": "1234"
        }
    ]

    //---------------------------//

    const [input,setInput] = useState({
        name: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        admin: false   
    });

    const [errors,setErrors] = useState({
        name: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        admin: false
    });

    const [focusedField, setFocusedField] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    function handleBlur(e) {
        setFocusedField(null);
        // Resto de la lógica de onBlur
      }

      function handleFocus(e) {
        setFocusedField(e.target.name);
      }

    function handleChange(e) {
        e.preventDefault();

        setInput({
            ...input,
            [e.target.name] : e.target.value,
        });

        setErrors(
            validateUser({
                ...input,
                [e.target.name]: e.target.value,
            },
            usersPrueba
            )
        );
    }

    function sumbitHandler(e) {
        e.preventDefault();

        const noErrors = Object.values(errors).every((error) => error === "");

        if (input.password !== input.confirmPassword){
            alert("Passwords do not match, try again")
            return;
        } else if (!noErrors){
            alert("There is some error in the fields, please try again")
            return;
        } else if (input.name === "" || input.lastname === "" || input.email === "" || input.password === "") {
            alert("You have to complete all fields")
            return;
        }

        //Generación del hash para la contraseña
        bcrypt.hash(input.password, 10, (err, hashedPassword) => {
            if (err){
                alert("Error hashing password",err);
            } else {
                //aqui va toda lo demás para para hacer el post
                console.log("Hashed Password:",hashedPassword);
            }
        })

    }


    return(
        <div className="basicStyle">
            <h2>Create User</h2>

            <form onSubmit={(event) => sumbitHandler(event)}>

                <div>
                    <label>Name</label>
                    <input 
                        placeholder="Enter your name"
                        type="text"
                        name="name"
                        value={input.name}
                        onChange={(event) => handleChange(event)}
                        onBlur={(event) => handleBlur(event)}
                        onFocus={(event) => handleFocus(event)}
                    />
                    {focusedField === 'name' && errors.name && <p>{errors.name}</p>}
                </div>

                <div>
                    <label>Lastname</label>
                    <input 
                        placeholder="Enter your lastname"
                        type="text"
                        name="lastname"
                        value={input.lastname}
                        onChange={(event) => handleChange(event)}
                        onBlur={(event) => handleBlur(event)}
                        onFocus={(event) => handleFocus(event)}
                    />
                    {focusedField === 'lastname' && errors.lastname && <p>{errors.lastname}</p>}
                </div>

                <div>
                    <label>Email</label>
                    <input 
                        placeholder="Enter your email"
                        type="text"
                        name="email"
                        value={input.email}
                        onChange={(event) => handleChange(event)}
                        onBlur={(event) => handleBlur(event)}
                        onFocus={(event) => handleFocus(event)}
                    />
                    {focusedField === 'email' && errors.email && <p>{errors.email}</p>}
                </div>

                <div>
                    <label>Password</label>
                    <input 
                        placeholder="Enter your password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={input.password}
                        onChange={(event) => handleChange(event)}
                        onBlur={(event) => handleBlur(event)}
                        onFocus={(event) => handleFocus(event)}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                    {focusedField === 'password' && errors.password && <p>{errors.password}</p>}
                </div>

                <div>
                    <label>Confirm password</label>
                    <input 
                        placeholder="Reenter your password"
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={input.confirmPassword}
                        onChange={(event) => handleChange(event)}
                        onBlur={(event) => handleBlur(event)}
                        onFocus={(event) => handleFocus(event)}
                    />
                    {focusedField === 'confirmPassword' && errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                </div>

                <button type="sumbit">
                    UPLOAD
                </button>
                

            </form>

        </div>
    )

}