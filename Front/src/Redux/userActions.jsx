import axios from 'axios';
import {userLogin, getUsers, switchAut, updateFromCookie, userLogout,getUserProfile,getUserGames} from './Reducers/userSlice';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';




export const userLoginAct = (user) => async (dispatch) =>{
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
      
    try{
        const response = await axios.post('user/login', user, {
            withCredentials: true
        });

        const userData = response.data;

        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + 3600 * 1000);
        const userDataJSON = JSON.stringify({...userData, auth: true});

        document.cookie = `miCookie=${encodeURIComponent(userDataJSON)}; expires=${expirationDate.toUTCString()}; path=/`;

        dispatch(userLogin(userData));

        dispatch(updateFromCookie(userData));

        Toast.fire({
            icon: "success",
            iconColor: "white",
            title: <strong>Login successfully!</strong>,
            html: <i>You are being redirected to the home</i>,
            color: "#fff",
            background: "#333",
          });

    } catch (error) {
        MySwal.fire({
            title: <strong>Error</strong>,
            html: <i>Login Failed!</i>,
            icon: 'error',
            background : "#1d1d1d",
          });
    }
};

export const  getUsersAct = () => async (dispatch) =>{
    try{
        const response = await axios('user/');
        return dispatch(getUsers(response.data));
    } catch (error) {
        window.alert("Request failed:", error);
    }
};

export const userLogoutAct = () => async (dispatch) => {
    try {
        await axios('user/logout');
        dispatch(userLogout())
    } catch (error) {
        window.alert("Request failed:", error);
    }
}


export const swAuth = (sw) => (dispatch) =>{
    return dispatch(switchAut(sw));
};

export const googleLoginAct = (token) => async (dispatch) => {
    const tokenObj = {
        token: token
    };
    
    try{
        const response = await axios.post('google/auth', tokenObj);
        return dispatch(userLogin(response.data));
    } catch (error) {
        window.alert("Request failed:", error);
    }
}

export const getUserProfileAction = (mail) => async (dispatch) => {

    try {
        const response = await axios.get(`/user/filter?searchTerm=${mail}`);
        return dispatch(getUserProfile(response.data))
    } catch (error) {
        window.alert("Request failed:", error);
    }
}

export const getUserGamesAction = (id) => async (dispatch) => {

    try {
        const response = await axios.get(`/payment/user/${id}`);
        return dispatch(getUserGames(response.data))
    } catch (error) {
        window.alert("Request failed:", error);
    }
}