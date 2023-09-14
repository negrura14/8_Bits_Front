import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Helpers/RoutesPath";
import "./LandingPage.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";
import { validateLogin } from "../validateLogin";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";
import { userLoginAct, googleLoginAct } from '../../Redux/userActions';
import logo from "../../Img/Logo.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Landing = () => {
  const handleBtnClick = () => {
    const formSignin = document.querySelector(".form-signin");
    const formSignup = document.querySelector(".form-signup");
    const frame = document.querySelector(".frame");
    const signupInactive = document.querySelector(".signup-inactive");
    const signinActive = document.querySelector(".signin-active");
    
    formSignin.classList.toggle("form-signin-left");
    formSignup.classList.toggle("form-signup-left");
    frame.classList.toggle("frame-long");
    signupInactive.classList.toggle("signup-active");
    signinActive.classList.toggle("signin-inactive");

    // Toggle the "active" class on the clicked button
    const btn = event.target;
    btn.classList.remove("idle");
    btn.classList.add("active");
  };

  const clientID ="133571718056-qbem0tdcv46v6pk03e7v7qgmdpsvtg8p.apps.googleusercontent.com";
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  //--------------------sweet alert---------------------------//
  const MySwal = withReactContent(Swal);

  const Toast = MySwal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  //--------------------sweet alert---------------------------//

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  function handleBlur(event) {
    setFocusedField(null);
    // Resto de la lógica de onBlur
  }

  function handleFocus(event) {
    setFocusedField(event.target.name);
  }

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name, value);

    setErrors(validateLogin({ ...form, [name]: value }));
    setForm({ ...form, [name]: value });
  };

  function submitHandler(event) {
    event.preventDefault();

    const noErrors = Object.values(errors).every((error) => error === "");

    if (!noErrors) {
      MySwal.fire({
        title: <strong>ERROR</strong>,
        html: <i>There is some error in the fields, please try again</i>,
        icon: "error",
        background: "#1d1d1d",
        customClass: {
          container: "custom-alert-container",
        },
      });
      return;
    } else if (form.email === "" || form.password === "") {
      MySwal.fire({
        title: <strong>WARNING</strong>,
        html: <i>You have to complete all fields</i>,
        icon: "warning",
        background: "#1d1d1d",
        customClass: {
          container: "custom-alert-container",
        },
      });
      return;

    }

    dispatch(userLoginAct(form));
    // dispatch(swAuth(!auth));

    Toast.fire({
      icon: "success",
      iconColor: "white",
      title: <strong>Login successfully!</strong>,
      html: <i>You are being redirected to the home</i>,
      color: "#fff",
      background: "#333",
    });

    setForm({
      email: "",
      password: "",
    });

    navigate("/home");
  }


  /////////////////////

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


  const ToastR = MySwal.mixin({  
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

  const [errorsR, setErrorsR] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    // admin: false
  });

  const [focusedFieldR, setFocusedFieldR] = useState(null);
  const [showPasswordR, setShowPasswordR] = useState(false);

  function handleBlurR(e) {
    setFocusedFieldR(null);
    // Resto de la lógica de onBlur
  }

  function handleFocusR(e) {
    setFocusedFieldR(e.target.name);
  }

  function handleChangeR(e) {
    e.preventDefault();

    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrorsR(
      validateUser(
        {
          ...input,
          [e.target.name]: e.target.value,
        },
        usersPrueba
      )
    );
  }

  function sumbitHandlerR(e) {
    e.preventDefault();

    const noErrors = Object.values(errorsR).every((error) => error === "");

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
            errorsR.name ? "name" : errorsR.lastname ? "lastname" : "email" 
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
          ToastR.fire({
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
    <div className="m-0 row vh-100 justify-content-center align-items-center bgL">
        <div class="col-6 m-5">
          <img className='logo rounded mx-auto d-block' src={logo}></img>
        </div>
        <div class="container row">
        
        <div class="frame col-xl-5 col-md-5 col-sm-2 mb-5">
          <div class="">
            <ul class="nav">
              <li class="nav-item signin-active">
                <a class="nav-link" onClick={handleBtnClick}>
                  Existing User
                </a>
              </li>
              <li class="nav-item signup-inactive">
                <a class="nav-link " onClick={handleBtnClick}>
                  New User
                </a>
              </li>
            </ul>
          </div>
        <div ng-app ng-init="checked = false" className="row">
        
        <Form className="form-signin col-12" onSubmit={submitHandler}>
        <div className="row justify-content-center">
        <Form.Group className="mb-3 col-md-10 col-sm-12" controlId="formBasicEmail">
            <Form.Label className="text-primary" >Email address</Form.Label>
            <Form.Control
              className=" bg-transparent text-white"
              type="email"
              placeholder="Enter email"
              value={form.email}
              onChange={changeHandler}
              name="email"
              onBlur={handleBlur}
              onFocus={handleFocus}
            />
            <Form.Text className="text-warning ">
              We'll never share your email with anyone else.
              {focusedField === "email" && errors.email && (
                <p className="text-danger">{errors.email}</p>
              )}
            </Form.Text>
          </Form.Group>
        </div>
          
        <div className="row justify-content-center ">
        <Form.Group className="mb-3 col-md-10 col-sm-12" controlId="formBasicPassword">
            <Form.Label className="text-primary">Password</Form.Label>
            <div className="row justify-content-center">
            <div className="col-10">
              <Form.Control
                className=" bg-transparent text-white mb-2"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={changeHandler}
                name="password"
                onBlur={handleBlur}
                onFocus={handleFocus}
              />
            </div>
            <a
              type="button"
              className=" p-2 col-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <i className="fa-regular fa-eye-slash text-secondary"></i>
              ) : (
                <i className="fa-regular fa-eye "></i>
              )}
            </a>
            <Form.Text className="text-danger">
              {focusedField === "password" && errors.password && (
                <p>{errors.password}</p>
              )}
            </Form.Text>
            </div>
            
          </Form.Group>
        </div>

        <div className="row justify-content-center centered">
        <Button className="mb-3 col-md-4 col-sm-6" variant="primary" type="submit">
            Submit
          </Button>
          
        <div class="separator">
    <hr class="line"/>
    <span>Or</span>
    <hr class="line"/>
  </div>
  <div className="social-icons">
  <LoginSocialGoogle
          isOnlyGetToken
          client_id={clientID}
          scope="openid profile email"
          // discoveryDocs="claims_supported"
          // access_type="offline"
          onResolve={async ({ provider, data }) => {
            dispatch(googleLoginAct(data.access_token)),
            Toast.fire({
              icon: "success",
              iconColor: "white",
              title: <strong>Login successfully!</strong>,
              html: <i>You are being redirected to the home</i>,
              color: "#fff",
              background: "#333",
            });
            navigate("/home");
          }}
          onReject={(err) => {
            console.log(err);
          }}
        >
          <a type="button" className="icon"><i className="fa-brands fa-google p-3 "></i></a>
        </LoginSocialGoogle>
      </div>
  <p className="signup">
          You do not have an account? create it{" "}
          <Link to={"/createuser"}>here</Link>
        </p>
        </div>
          
        </Form>
        <form className="form-signup col-12" onSubmit={(event) => sumbitHandlerR(event)}>
        <div class="row">

        <div className="mb-3 col-6">
          <label className="form-label text-primary">Name</label>
          <input
            placeholder="Enter your name"
            type="text"
            name="name"
            value={input.name}
            onChange={(event) => handleChangeR(event)}
            onBlur={(event) => handleBlurR(event)}
            onFocus={(event) => handleFocusR(event)}
            className="form-control bg-transparent text-white"
          />
          {focusedFieldR === "name" && errorsR.name && <p className="text-danger">{errorsR.name}</p>}
        </div>

        <div className="mb-3 col-6">
          <label className="form-label text-primary ">Lastname</label>
          <input
            placeholder="Enter your lastname"
            type="text"
            name="lastname"
            value={input.lastname}
            onChange={(event) => handleChangeR(event)}
            onBlur={(event) => handleBlurR(event)}
            onFocus={(event) => handleFocusR(event)}
            className="form-control bg-transparent text-white"
          />
          {focusedFieldR === "lastname" && errorsR.lastname && (
            <p className="text-danger">{errorsR.lastname}</p>
          )}
        </div>
        </div>

        <div className="mb-3">
          <label className="form-label text-primary">Email</label>
          <input
            placeholder="Enter your email"
            type="text"
            name="email"
            value={input.email}
            onChange={(event) => handleChangeR(event)}
            onBlur={(event) => handleBlurR(event)}
            onFocus={(event) => handleFocusR(event)}
            className="form-control bg-transparent text-white"
          />
          {focusedFieldR === "email" && errorsR.email && <p className="text-danger">{errorsR.email}</p>}
        </div>
        <div className="row mb-3">
          <label className="form-label text-primary">Password</label>
          <div className=" col-9">
            <input
              placeholder="Enter your password"
              type={showPasswordR ? "text" : "password"}
              name="password"
              value={input.password}
              onChange={(event) => handleChangeR(event)}
              onBlur={(event) => handleBlurR(event)}
              onFocus={(event) => handleFocusR(event)}
              className="form-control bg-transparent text-white"
            />
          </div>
          <div className="mb-3 col-3 p-1">
            <a
              type="button"
              onClick={() => setShowPasswordR(!showPasswordR)}
            >
              {showPasswordR ? (
                <i className="fa-regular fa-eye-slash text-secondary"></i>
              ) : (
                <i className="fa-regular fa-eye "></i>
              )}
            </a>
          </div>
          {focusedFieldR === "password" && errorsR.password && (
              <p className="text-danger">{errorsR.password}</p>
            )}
        </div>

        <div className="mb-3">
          <label className="form-label text-primary">Confirm password</label>
          <input
            placeholder="Reenter your password"
            type={showPasswordR ? "text" : "password"}
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={(event) => handleChangeR(event)}
            onBlur={(event) => handleBlurR(event)}
            onFocus={(event) => handleFocusR(event)}
            className="form-control bg-transparent text-white"
          />
          {focusedFieldR === "confirmPassword" && errorsR.confirmPassword && (
            <p className="text-danger">{errorsR.confirmPassword}</p>
          )}
        </div>

        <Button type="sumbit">
          Register
        </Button>
      </form>

          </div>

        </div>
      </div>
      
    </div>
  );
};

export default Landing;


