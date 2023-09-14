import "./Login.css"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";
import { validateLogin } from "../validateLogin";
import { useNavigate, Link } from "react-router-dom";
import { userLoginAct, googleLoginAct } from '../../Redux/userActions';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";






export default function Login() {
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

  return (
    <div className="row justify-content-center">
      <div className="text-primary px-4 m-5 login-box col-md-4 col-sm-10">
        <h2>Login</h2>
        <Form onSubmit={submitHandler}>
        <div className="row justify-content-center">
        <Form.Group className="mb-3 col-md-10 col-sm-12" controlId="formBasicEmail">
            <Form.Label className="" >Email address</Form.Label>
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
            <Form.Label>Password</Form.Label>
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
        
      </div>
    </div>
  );
}
