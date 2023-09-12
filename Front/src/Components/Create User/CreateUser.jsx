import "./CreateUser.css";

import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import bcrypt from "bcryptjs-react";

import validateUser from "./validateUser";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function CreateUser() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { user } = useSelector((state) => state.user);
  

  //useEffect de los usuarios

  const usersPrueba = [
    {
      name: "Sujeto 1",
      lastname: "-",
      email: "prueba@gmail.com",
      password: "1234",
    },
  ];

  //---------------------------//

  const MySwal = withReactContent(Swal);

  const Toast = MySwal.mixin({  
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  const [input, setInput] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    // admin: false
  });

  const [errors, setErrors] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    // admin: false
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
      [e.target.name]: e.target.value,
    });

    setErrors(
      validateUser(
        {
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

    if (input.password !== input.confirmPassword) {
      MySwal.fire({
        title: <strong>ERROR</strong>,
        html: <i>Passwords do not match, try again</i>,
        icon: 'error',
        background : "#1d1d1d",
      });
      return;
    } else if (!noErrors) {
      MySwal.fire({
        title: <strong>ERROR</strong>,
        html: <i>There is some error in {
            errors.name ? "name" : errors.lastname ? "lastname" : "email" 
          }</i>,
        icon: 'error',
        background : "#1d1d1d",
      });
      return;
    } else if (
      input.name === "" ||
      input.lastname === "" ||
      input.email === "" ||
      input.password === ""
    ) {
      MySwal.fire({
        title: <strong>WARNING</strong>,
        html: <i>You have to complete all fields</i>,
        icon: 'warning',     
        background : "#1d1d1d",
        customClass:{
          container: 'custom-alert-container',
        }
      });
      return;
    }

    //Generación del hash para la contraseña
    bcrypt.hash(input.password, 10, (err, hashedPassword) => {
      if (err) {
        alert("Error hashing password", err);
      } else {
        //aqui va toda lo demás para para hacer el post
        console.log("Hashed Password:", hashedPassword);
        const formatInput = {
          name: input.name,
          lastname: input.lastname,
          email: input.email,
          password: hashedPassword,
        };

        axios
          .post("/user/signup", formatInput)
          .then((res) => res, 
          Toast.fire({
            icon: 'success',
            iconColor: "white",
            title: <strong>Signed in successfully</strong>,
            html: <i>Now you have to login!</i>,
            color: "#fff",
            background : "#333",
          })
          )
          .catch((err) => alert(err));

        setInput({
          name: "",
          lastname: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        navigate("/login");
      }
    });
  }

  return (
    <div className="row justify-content-center">

    <div className="text-primary px-4 m-5 login-box  col-md-6 col-sm-10">
      <h2>Create User</h2>

      <form onSubmit={(event) => sumbitHandler(event)}>
        <div className="mb-3 ">
          <label className="form-label">Name</label>
          <input
            placeholder="Enter your name"
            type="text"
            name="name"
            value={input.name}
            onChange={(event) => handleChange(event)}
            onBlur={(event) => handleBlur(event)}
            onFocus={(event) => handleFocus(event)}
            className="form-control bg-transparent text-white"
          />
          {focusedField === "name" && errors.name && <p className="text-danger">{errors.name}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label">Lastname</label>
          <input
            placeholder="Enter your lastname"
            type="text"
            name="lastname"
            value={input.lastname}
            onChange={(event) => handleChange(event)}
            onBlur={(event) => handleBlur(event)}
            onFocus={(event) => handleFocus(event)}
            className="form-control bg-transparent text-white"
          />
          {focusedField === "lastname" && errors.lastname && (
            <p className="text-danger">{errors.lastname}</p>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            placeholder="Enter your email"
            type="text"
            name="email"
            value={input.email}
            onChange={(event) => handleChange(event)}
            onBlur={(event) => handleBlur(event)}
            onFocus={(event) => handleFocus(event)}
            className="form-control bg-transparent text-white"
          />
          {focusedField === "email" && errors.email && <p className="text-danger">{errors.email}</p>}
        </div>

        <div className="row mb-3">
          <label className="form-label">Password</label>
          <div className=" col-9">
            <input
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={input.password}
              onChange={(event) => handleChange(event)}
              onBlur={(event) => handleBlur(event)}
              onFocus={(event) => handleFocus(event)}
              className="form-control bg-transparent text-white"
            />
          </div>
          <div className="mb-3 col-3 p-1">
            <a
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <i className="fa-regular fa-eye-slash text-secondary"></i>
              ) : (
                <i className="fa-regular fa-eye "></i>
              )}
            </a>
          </div>
          {focusedField === "password" && errors.password && (
              <p className="text-danger">{errors.password}</p>
            )}
        </div>

        <div className="mb-3">
          <label className="form-label">Confirm password</label>
          <input
            placeholder="Reenter your password"
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={(event) => handleChange(event)}
            onBlur={(event) => handleBlur(event)}
            onFocus={(event) => handleFocus(event)}
            className="form-control bg-transparent text-white"
          />
          {focusedField === "confirmPassword" && errors.confirmPassword && (
            <p className="text-danger">{errors.confirmPassword}</p>
          )}
        </div>

        <button type="sumbit">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          UPLOAD
        </button>
      </form>
    </div>
    </div>
  );
}
