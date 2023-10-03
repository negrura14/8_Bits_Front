import React, { useEffect , useState} from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from "axios";
import resetImage from "../../Img/resetImage.jpeg"
import "./ResetPassword.css"


function ResetPassword(){

    const [email, setEmail] = useState('');
    const [emailConfirmed, setEmailConfirmed] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordChanged, setPasswordChanged] = useState(false );
  

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
  
    

  
    

    // Handle email submission and confirmation
    const handleEmailSubmit = async (e) => {
      try{
        await axios.post(`send-mail/resetPassword/${email}`);
        e.preventDefault();
      setEmailConfirmed(true);
      }catch(error){

      }
    };
  
    // Handle password change
    const handleSubmitNewPassword = async (e) => {
      e.preventDefault();
      if (newPassword !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
      } else {
        const data = {
          password : newPassword,
          password1: confirmPassword

        };

       const response =  await axios.post(`user/resetPassword/${token}`, data);
        console.log(response.data, "reeesponse data");
        setPasswordChanged(true);
      }
    };
  
    return (
      
      <div className="container">
      <div className="row justify-content-center my-5">

      <div className="col-10 login-box">
          <div className="row">
          <div className="col-md-6 pt-5 ">
            
            <img src={resetImage} alt="Image" className="img-fluid imgContact"/>

          </div>
              <div className="col-md-6 d-flex justify-content-center align-items-center mt-5">
              <div>

              <h2 className="text-center text-white">{passwordChanged ? 'Password Changed Successfully!' : 'Reset Password'}</h2>
          <p className="textContact text-white-50">Contact our team via email</p>
          
          {!token && !passwordChanged && (
          <form onSubmit={handleEmailSubmit}>
            <label className="form-label text-primary">
              Email:
            </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control bg-transparent text-white"
              />
            <br />
            <div className='d-flex justify-content-center mt-4'>

            <button type="submit">Confirm Email</button>
            </div>
          </form>
        )}
        {token && !passwordChanged  && (
          <form onSubmit={handleSubmitNewPassword}>
          <div>

            <label className="form-label text-primary">
              New Password:
            </label>
              <input
                type="password"
                value={newPassword}
                className="form-control bg-transparent text-white"
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
          </div>
            <br />
            <div>

            <label className="form-label text-primary">
              Confirm Password:
            </label>
              <input 
                type="password"
                className="form-control bg-transparent text-white"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <br />
            <div className='d-flex justify-content-center mt-4'>

            <button type="submit">Change Password</button>
            </div>

          </form>
        )}
              </div>

              </div>
                  
              </div>
          </div>
      </div>
      </div>
    );
  }
  
  export default ResetPassword;