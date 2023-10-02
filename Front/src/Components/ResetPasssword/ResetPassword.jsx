import React, { useEffect , useState} from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from "axios";


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
      <div>
        <h2>{passwordChanged ? 'Password Changed Successfully!' : 'Reset Password'}</h2>
        {!token && !passwordChanged && (
          <form onSubmit={handleEmailSubmit}>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <br />
            <button type="submit">Confirm Email</button>
          </form>
        )}
        {token && !passwordChanged  && (
          <form onSubmit={handleSubmitNewPassword}>
            <label>
              New Password:
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Confirm Password:
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
            <br />
            <button type="submit">Change Password</button>
          </form>
        )}
      </div>
    );
  }
  
  export default ResetPassword;