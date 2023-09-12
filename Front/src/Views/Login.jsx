import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { LoginSocialGoogle } from 'reactjs-social-login';
import { validateLogin } from './validateLogin';
import { useNavigate, Link } from 'react-router-dom';
import { userLoginAct, swAuth } from '../Redux/userActions';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


export default function Login() {
    const clientID = '133571718056-qbem0tdcv46v6pk03e7v7qgmdpsvtg8p.apps.googleusercontent.com';
    const [provider, setProvider] = useState([])
    const [dataLog, setDataLog] = useState([])
    const [showPassword, setShowPassword] = useState(false)
    const [focusedField, setFocusedField] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const { auth } = useSelector((state) => state.user);


    //--------------------sweet alert---------------------------//
    const MySwal = withReactContent(Swal);
    
    const Toast = MySwal.mixin({  
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    //--------------------sweet alert---------------------------//
    
    const [form, setForm] = useState({
        email:'',
        password:''
    });
    
    const [errors, setErrors] = useState({
        email:'',
        password:''
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

        setErrors(validateLogin({...form,[name]:value}));
        setForm({...form,[name]:value});
    }

    function submitHandler(event) {
      event.preventDefault();

      const noErrors = Object.values(errors).every((error) => error === "");

      if (!noErrors){
        MySwal.fire({
          title: <strong>ERROR</strong>,
          html: <i>There is some error in the fields, please try again</i>,
          icon: 'error',
          background : "#1d1d1d",
          customClass:{
            container: 'custom-alert-container',
          }
        });
        return;
      } else if (form.email === "" || form.password === "") {
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
      
      dispatch(userLoginAct(form));
      // dispatch(swAuth(!auth));

      Toast.fire({
        icon: 'success',
        iconColor: "white",
        title: <strong>Login successfully!</strong>,
        html: <i>You are being redirected to the store</i>,
        color: "#fff",
        background : "#333",
      })

          setForm({
            email:'',
            password:''
        });

        navigate('/store');

        

    }

  

    return (
        <div>
            <div className="text-primary px-4 m-5 login-box">
            <h2>Login</h2>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control  className=" bg-transparent text-white" type="email" placeholder="Enter email" value={form.email} onChange={changeHandler} name='email' onBlur={handleBlur} onFocus={handleFocus}/>
                      <Form.Text className="text-white-50 ">
                        We'll never share your email with anyone else.
                        {focusedField === 'email' && errors.email && <p>{errors.email}</p>}
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control className=" bg-transparent text-white" type={showPassword ? "text" : "password"} placeholder="Password" value={form.password} onChange={changeHandler} name='password' onBlur={handleBlur} onFocus={handleFocus}/>
                      <Form.Text className="text-muted"> 
                        {focusedField === 'password' && errors.password && <p>{errors.password}</p>}
                      </Form.Text>    
                      <Button type='button' onClick={() => setShowPassword(!showPassword)}>
                       {showPassword ? "Hide" : "Show"}
                      </Button>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                </Form>
                <p>You do not have an account? create it <Link to={'/createuser'}>here</Link></p>
                <p>-----or-----</p>

                <LoginSocialGoogle
                    isOnlyGetToken
                    client_id={clientID}
                    scope="openid profile email"
                    // discoveryDocs="claims_supported"
                    // access_type="offline"
                    onResolve={async({ provider, data }) => {
                      setProvider(provider);
                      setDataLog(data.access_token);
                      console.log(dataLog)
                      dispatch(swAuth(!auth));
                      navigate('/store');
                    }}
                    onReject={(err) => {
                      console.log(err);
                    }}
                >
                    <GoogleLoginButton />
                </LoginSocialGoogle>
            </div>
        </div>
    )
}


// https://www.googleapis.com/oauth2/v3/userinfo
// let response = await axios.get(`${URL_API}/api/users/me`, {
//           headers: {
//             Authorization: `Bearer ${responseJwt}`,
//           },
//         });